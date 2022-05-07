import axios from "axios";
import { toast } from "react-toastify";
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
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    toast.error("Hold up, can't find the notes!");
    return "FAILURE";
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
    toast.error("This is weird, I can't access it!");
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
    toast.success("New note created!");
  } catch (e) {
    toast.error("Jonathan, stop playing the server!");
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
    toast.success("Changes Saved!");
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    toast.error("This is embarassing");
    return "FAILED";
  }
};

export { fetchNotes, addToNotes, updateNote, fetchNote };
