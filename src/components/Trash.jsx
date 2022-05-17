import React, { useEffect } from "react";
import { NoteCard } from ".";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { IoMdTrash } from "../utils/icons";
import { fetchTrash } from "../services";

function Trash() {
  const {
    authState: { token },
  } = useAuth();

  const {
    userDataState: { trash },
    userDataDispatch,
  } = useUserData();

  useEffect(() => {
    fetchTrash(token, userDataDispatch);
  });

  const trashNotes =
    trash.length === 0 ? (
      <div className="h-full flex flex-col justify-start mt-8 items-center gap-8">
        <h3 className="text-base font-bold sm:text-xl md:text-2xl font-caveat">
          You can trash talk with me ^_^
        </h3>
        <h3 className="flex text-base sm:text-xl md:text-2xl font-bold font-caveat items-center">
          Click on the
          <IoMdTrash className="ml-1.5 mr-1 animate-spin" />
          icon to delete notes
        </h3>
      </div>
    ) : (
      trash
        .reverse()
        .map((note) => <NoteCard key={note._id} note={note} type="TRASH" />)
    );

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start flex items-center gap-1 text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Trash
        <IoMdTrash />
      </h1>
      {trashNotes}
    </section>
  );
}

export default Trash;
