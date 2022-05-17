import axios from "axios";
import { toast } from "react-toastify";
import {
  UPDATE_TRASH_ACTION,
  ADD_TO_TRASH_ACTION,
  RECOVER_FROM_TRASH_ACTION,
} from "../utils/constants";
const fetchTrash = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/trash",
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_TRASH_ACTION,
      payload: { trash: response.data.trash },
    });
  } catch (e) {
    console.log(e);
    toast.error("Who stole my trash!?");
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
    dispatcher({
      type: ADD_TO_TRASH_ACTION,
      payload: { notes, archives, trash },
    });
    toast.success("Trash note? Trash note!");
  } catch (e) {
    console.log(e);
    toast.error("This one isn't really good at goodbyes!");
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
      type: UPDATE_TRASH_ACTION,
      payload: { trash: response.data.trash },
    });
    toast.success("Huh, what note?");
  } catch (e) {
    console.log(e);
    toast.error("This one isn't really good at goodbyes!");
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
      type: RECOVER_FROM_TRASH_ACTION,
      payload: { trash: response.data.trash, notes: response.data.notes },
    });
    toast.success("This one can stay, I guess!");
  } catch (e) {
    console.log(e);
    toast.error("Like me, this note belong here, retry!");
  }
};

export { fetchTrash, restoreFromTrash, addToTrash, removeFromTrash };
