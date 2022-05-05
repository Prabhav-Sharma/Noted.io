import React, { useEffect } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { BsPinFill, GiNotebook } from "../icons";
import { addToNotes, fetchNotes } from "../services";
import { NoteCard } from "./index";

function Notes() {
  const {
    userDataState: { notes },
    userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    (async () => {
      await fetchNotes(token, authDispatch);
      if (notes.length === 0) {
        addToNotes(
          {
            note: {
              title: "New note",
              text: "<p>Start writing...</p>",
              color: "#BDC4DB",
              pinned: false,
              labels: [],
            },
          },
          token,
          userDataDispatch
        );
      }
    })();
  }, []);

  const allNotes = [...notes].filter((note) => !note.pinned).reverse();

  const pinnedNotes = [...notes].filter((note) => note.pinned).reverse();

  const pinnedSection = pinnedNotes.length !== 0 && (
    <>
      <h2 className=" self-start flex gap-1 items-center text-xl ml-4 font-bold font-caveat sm:ml-6 sm:text-2xl lg:ml-24">
        <BsPinFill /> Pinned Notes
      </h2>
      {pinnedNotes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </>
  );

  const allSection = allNotes.length !== 0 && (
    <>
      <h2 className="self-start flex gap-2 items-center text-xl ml-4 font-bold font-caveat sm:ml-10 sm:text-2xl md:ml-16 lg:ml-24">
        <GiNotebook /> All Notes
      </h2>
      {allNotes.map((note) => (
        <NoteCard key={note._id} note={note} type="HOME" />
      ))}
    </>
  );

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Notes
      </h1>
      {pinnedSection}
      {allSection}
    </section>
  );
}

export default Notes;
