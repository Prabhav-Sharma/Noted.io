const userDataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NOTES":
      return { ...state, notes: action.payload.notes };
    case "UPDATE_ARCHIVES":
      return { ...state, archive: action.payload.archives };
    default:
      console.log("Remove from userDataReducer");
      return state;
  }
};

export default userDataReducer;
