import { Server, Model, RestSerializer } from "miragejs";
import {
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
  updateArchiveNoteHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
  getUserHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
  getNoteHandler,
} from "./backend/controllers/NotesController";
import {
  getAllTrashHandler,
  addToTrashHandler,
  deleteTrashHandler,
  recoverTrashHandler,
} from "./backend/controllers/TrashController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
          trash: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));
      this.get("/auth/user", getUserHandler.bind(this));

      // notes routes (private)
      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));
      this.get("/note/:type/:noteId", getNoteHandler.bind(this));

      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.post("/archives/:noteId", updateArchiveNoteHandler.bind(this));

      //trash routes (private)
      this.get("/trash", getAllTrashHandler.bind(this));
      this.post("/trash/:noteId", addToTrashHandler.bind(this));
      this.delete("/trash/:noteId", deleteTrashHandler.bind(this));
      this.post("/trash/recover/:noteId", recoverTrashHandler.bind(this));
    },
  });
  return server;
}
