//Archive calls
import axios from "axios";
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
    //Note for future self:Add toast here, remove this comment on adding toast
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
      type: "UPDATE_ARCHIVES",
      payload: { archives: response.data.archives },
    });

    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
    //Note for future self:Add toast here, remove this comment on adding toast
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
      type: "UPDATE_ARCHIVES",
      payload: { archives: response.data.archives },
    });
    dispatcher({
      type: "UPDATE_NOTES",
      payload: { notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
    //Note for future self:Add toast here, remove this comment on adding toast
  }
};

const deleteFromArchives = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/archives/delete/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_ARCHIVES",
      payload: { archives: response.data.archives },
    });
  } catch (e) {
    console.log(e);
    //Note for future self:Add toast here, remove this comment on adding toast
  }
};

export {
  fetchArchives,
  addToArchives,
  deleteFromArchives,
  restoreFromArchives,
};
