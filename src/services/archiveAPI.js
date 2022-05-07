import axios from "axios";
import { toast } from "react-toastify";
//Archive calls
const fetchArchives = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/archives",
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_ARCHIVES",
      payload: { archives: response.data.archives },
    });
  } catch (e) {
    console.log(e);
    toast.error("I smell fire from the server room!");
  }
};

const addToArchives = async (id, requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/notes/archives/${id}`,
      headers: { authorization: token },
      data: requestBody,
    });
    dispatcher({
      type: "ADD_TO_ARCHIVES",
      payload: { archives: response.data.archives, notes: response.data.notes },
    });
    toast.success(`${requestBody.note.title} Added to archives!`);
  } catch (e) {
    console.log(e);
    toast.error("Our server is feeling down right now");
  }
};

const restoreFromArchives = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/archives/restore/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: "RECOVER_FROM_ARCHIVES",
      payload: { archives: response.data.archives, notes: response.data.notes },
    });
    toast.success("Back to home, it goes!");
  } catch (e) {
    console.log(e);
    toast.error("This note seems to really like it here!");
  }
};

const updateArchiveNote = async (id, requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/archives/${id}`,
      headers: { authorization: token },
      data: requestBody,
    });
    dispatcher({
      type: "UPDATE_ARCHIVES",
      payload: { archives: response.data.archives },
    });
    toast.success("Changes saved!");
    return "SUCCESS";
  } catch (e) {
    console.log(e);
    toast.error("It is the damn server again!?");
    return "FAILURE";
  }
};

export { fetchArchives, addToArchives, restoreFromArchives, updateArchiveNote };
