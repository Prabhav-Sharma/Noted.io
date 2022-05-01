import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all the trash in the db.
 * send GET Request at /api/trash
 * */

export function getAllTrashHandler(schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      { errors: ["The email you entered is not registered. Not found error"] }
    );
  }
  return new Response(200, {}, { trash: user.trash });
}

/**
 * This handler handles add note to trash in the db.
 * send POST Request at /api/trash/:noteId
 * */

export function addToTrashHandler(scheme, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not registered. Not found error"] }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;
    user.archives = user.archives.filter((archive) => archive._id !== noteId);
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.trash.push({ ...note });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes, trash: user.trash }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}

/**
 * This handler deletes note from trash in the db.
 * send DELETE Request at /api/trash/:noteId
 * */

export function deleteTrashHandler(schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not registered. Not found error"],
        }
      );
    }
    const { noteId } = request.params;
    user.trash = user.trash.filter((note) => note._id !== noteId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { trash: user.trash });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}

/**
 * This handler recovers note from trash in the db.
 * send POST Request at /api/trash/restore/:noteId
 * */

export function recoverTrashHandler(schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not registered. Not found error"] }
      );
    }

    const { noteId } = request.params;
    const { note } = JSON.parse(request.requestBody);
    user.trash = user.trash.filter((note) => note._id !== noteId);
    user.notes.push({ ...note });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes, trash: user.trash });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}
