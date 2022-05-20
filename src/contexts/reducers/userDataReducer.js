import {
  UPDATE_NOTES_ACTION,
  UPDATE_ARCHIVES_ACTION,
  ADD_TO_TRASH_ACTION,
  ADD_TO_ARCHIVES_ACTION,
  RECOVER_FROM_ARCHIVES_ACTION,
  RECOVER_FROM_TRASH_ACTION,
  UPDATE_TRASH_ACTION,
  RESET_ACTION,
} from "../../utils/constants";

const userDataReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NOTES_ACTION:
      return { ...state, notes: action.payload.notes };
    case UPDATE_ARCHIVES_ACTION:
      return { ...state, archives: action.payload.archives };

    case ADD_TO_ARCHIVES_ACTION:
    case RECOVER_FROM_ARCHIVES_ACTION:
      return {
        ...state,
        archives: action.payload.archives,
        notes: action.payload.notes,
      };

    case ADD_TO_TRASH_ACTION:
      return {
        ...state,
        archives: action.payload.archives,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };

    case RECOVER_FROM_TRASH_ACTION:
      return {
        ...state,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };

    case UPDATE_TRASH_ACTION:
      return { ...state, trash: action.payload.trash };

    case RESET_ACTION:
      return { notes: [], archives: [], trash: [] };

    default:
      return state;
  }
};

export default userDataReducer;
