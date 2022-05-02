import { login, signup } from "./authAPI";
import { fetchNotes, addToNotes, updateNote, deleteNote } from "./notesAPI";
import {
  fetchArchives,
  addToArchives,
  deleteFromArchives,
  restoreFromArchives,
  updateArchiveNote,
} from "./archiveAPI";

import {
  fetchTrash,
  restoreFromTrash,
  addToTrash,
  removeFromTrash,
} from "./trashAPI";

export {
  login,
  signup,
  fetchNotes,
  addToNotes,
  updateNote,
  deleteNote,
  fetchArchives,
  addToArchives,
  deleteFromArchives,
  restoreFromArchives,
  updateArchiveNote,
  fetchTrash,
  restoreFromTrash,
  addToTrash,
  removeFromTrash,
};
