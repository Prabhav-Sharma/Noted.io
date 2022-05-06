import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db.
 * send GET Request at /api/notes
 * */

export const getAllNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { notes: user.notes });
};

/**
 * This handler fetches a single note with the provided id in the db.
 * send GET Request at /api/note/:type/:noteId
 * */

export const getNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not registered. Not found error"] }
      );
    }
    const { noteId, type } = request.params;
    let note;
    switch (type) {
      case "HOME":
        note = user.notes.filter((note) => note._id === noteId)[0];
        break;
      case "ARCHIVE":
        note = user.archives.filter((note) => note._id === noteId)[0];
        break;
      case "TRASH":
        note = user.trash.filter((note) => note._id === noteId)[0];
        break;
    }
    if (note !== undefined) return new Response(201, {}, { note: note });
    else throw error;
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

/**
 * This handler handles creating a new note
 * send POST Request at /api/notes
 * body contains {note}
 * */

export const createNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    if (!note.tags) {
      user.notes.push({ ...note, _id: uuid(), tags: [] });
    } else {
      user.notes.push({ ...note, _id: uuid() });
    }
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const updateNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;
    const noteIndex = user.notes.findIndex((note) => note._id === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

export const archiveNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const archivedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.archives.push({ ...archivedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes }
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
};
