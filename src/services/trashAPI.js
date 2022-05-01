import axios from "axios";

const fetchTrash = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/trash",
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_TRASH",
      payload: { trash: response.data.trash },
    });
  } catch (e) {
    console.log(e);
  }
};

const addToTrash = async (id, requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/trash/${id}`,
      headers: { authorization: token },
      data: requestBody,
    });
    const { notes, archives, trash } = response.data;
    dispatcher({ type: "ADD_TO_TRASH", payload: { notes, archives, trash } });
  } catch (e) {
    console.log(e);
  }
};

const removeFromTrash = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/trash/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_TRASH",
      payload: { trash: response.data.trash },
    });
  } catch (e) {
    console.log(e);
  }
};

const restoreFromTrash = async (id, requestBody, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/trash/recover/${id}`,
      headers: { authorization: token },
      data: requestBody,
    });
    dispatcher({
      type: "RECOVER_FROM_TRASH",
      payload: { trash: response.data.trash, notes: response.data.notes },
    });
  } catch (e) {
    console.log(e);
  }
};

export { fetchTrash, restoreFromTrash, addToTrash, removeFromTrash };
