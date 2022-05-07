import { login, signup } from "./authAPI";
import { fetchNotes, addToNotes, updateNote } from "./notesAPI";
import {
  fetchArchives,
  addToArchives,
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
  fetchArchives,
  addToArchives,
  restoreFromArchives,
  updateArchiveNote,
  fetchTrash,
  restoreFromTrash,
  addToTrash,
  removeFromTrash,
};
