import axios from "axios";
//fetch notes
const fetchNotes = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/notes",
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
  }
};

const fetchNote = async (noteId, type, token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/note/${type}/${noteId}`,
      headers: { authorization: token },
    });
    dispatcher({ type: "NOTE", payload: { note: response.data.note } });
  } catch (e) {
    console.log(e);
  }
};

//add Note
const addToNotes = async (requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/notes",
      headers: { authorization: token },
      data: requestBody,
    });
    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
  }
};

//Update note
const updateNote = async (id, requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/notes/${id}`,
      headers: { authorization: token },
      data: requestBody,
    });
    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    return "FAILED";
  }
};
//deleteNote
const deleteNote = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/notes/${id}`,
      headers: { authorization: token },
    });

    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
  }
};

export { fetchNotes, addToNotes, updateNote, deleteNote, fetchNote };
