import React, { useEffect } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { BsPinFill, GiNotebook, BiSort } from "../utils/icons";
import { addToNotes, fetchNotes } from "../services";
import { getRandomColor, sortNotes } from "../utils/helpers";
import { NoteCard } from "../components";
import { useToggle, useDocumentTitle } from "../Hooks";

function Home() {
  const {
    userDataState: { notes },
    userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  useDocumentTitle("Home");

  const { toggle: sortByLatest, setToggle: setSortByLatest } = useToggle(true);

  useEffect(() => {
    (async () => {
      const notes = await fetchNotes(token, userDataDispatch);
      if (notes && notes.length === 0) {
        addToNotes(
          {
            note: {
              title: "",
              text: "<p><br></p>",
              color: getRandomColor(),
              pinned: false,
              labels: [],
              updatedAt: new Date(),
            },
          },
          token,
          userDataDispatch
        );
      }
    })();
  }, []);

  const PinnedSection = () => {
    const pinnedNotes = sortNotes(
      notes.filter((note) => note.pinned),
      sortByLatest
    );
    return (
      pinnedNotes.length !== 0 && (
        <>
          <h2 className=" self-start flex gap-1 items-center text-xl ml-4 font-bold font-caveat sm:ml-6 sm:text-2xl lg:ml-24">
            <BsPinFill /> Pinned Notes
          </h2>
          {pinnedNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </>
      )
    );
  };

  const AllSection = () => {
    const allNotes = sortNotes(
      notes.filter((note) => !note.pinned),
      sortByLatest
    );
    return (
      allNotes.length !== 0 && (
        <>
          <h2 className="self-start flex gap-2 items-center text-xl ml-4 font-bold font-caveat sm:ml-10 sm:text-2xl md:ml-16 lg:ml-24">
            <GiNotebook /> All Notes
          </h2>
          {allNotes.map((note) => (
            <NoteCard key={note._id} note={note} type="HOME" />
          ))}
        </>
      )
    );
  };

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <span className="flex justify-between w-11/12 items-center">
        <h1 className="text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
          Notes
        </h1>
        <button
          onClick={() => setSortByLatest((c) => !c)}
          className="text-sm sm:text-base -translate-x-6 lg:-translate-x-14 flex items-center translate-y-5 p-1.5 w-28 justify-center text-white rounded-md bg-rose-500 shadow shadow-black hover:bg-rose-600"
        >
          Sort <BiSort />: {sortByLatest === true ? "Latest" : "Oldest"}
        </button>
      </span>
      <PinnedSection />
      <AllSection />
      {notes.length === 0 && (
        <h3 className="text-base mt-10 font-bold sm:text-xl md:text-2xl font-caveat">
          Create a note to get started ^_^
        </h3>
      )}
    </section>
  );
}

export default Home;
