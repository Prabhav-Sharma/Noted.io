const userDataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NOTES":
      return { ...state, notes: action.payload.notes };
    case "UPDATE_ARCHIVES":
      return { ...state, archives: action.payload.archives };

    case "ADD_TO_TRASH":
      return {
        ...state,
        archives: action.payload.archives,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };

    case "RECOVER_FROM_TRASH":
      return {
        ...state,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };

    case "UPDATE_TRASH":
      return { ...state, trash: action.payload.trash };

    case "RESET":
      return { notes: [], archives: [], trash: [] };

    default:
      console.log("Remove from userDataReducer");
      return state;
  }
};

export default userDataReducer;
