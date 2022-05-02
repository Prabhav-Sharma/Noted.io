import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { fetchArchives, fetchNotes, fetchTrash } from "../services";
import { notesWithSearchLabels } from "./helpers";
import { FormInput } from ".";
import NoteCard from "./NoteCard";

function Labels() {
  const [search, setSearch] = useState("");
  const inputRef = useRef();
  const {
    authState: { token },
  } = useAuth();
  const {
    userDataState: { notes, archives, trash },
    userDataDispatch,
  } = useUserData();

  useEffect(() => {
    fetchNotes(token, userDataDispatch);
    fetchArchives(token, userDataDispatch);
    fetchTrash(token, userDataDispatch);
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const notesWithLabels = notesWithSearchLabels(notes, search);
  const archivesWithLabels = notesWithSearchLabels(archives, search);
  const trashWithLabels = notesWithSearchLabels(trash, search);

  const NoteResults = () =>
    notesWithLabels.length !== 0 && (
      <>
        <h3 className="text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Notes
        </h3>
        {notesWithLabels.map((note) => (
          <NoteCard key={note._id} type="HOME" note={note} />
        ))}
      </>
    );
  const ArchiveResults = () =>
    archivesWithLabels.length !== 0 && (
      <>
        <h3 className="text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Archives
        </h3>
        {archivesWithLabels.map((note) => (
          <NoteCard key={note._id} type="ARCHIVE" note={note} />
        ))}
      </>
    );
  const TrashResults = () =>
    trashWithLabels.length !== 0 && (
      <>
        <h3 className=" text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Trash
        </h3>
        {trashWithLabels.map((note) => (
          <NoteCard key={note._id} type="TRASH" note={note} />
        ))}
      </>
    );

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start flex items-center gap-1 text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Labels
      </h1>
      <FormInput
        reference={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search label name..."
        styles="self-center max-w-3xl bg-slate-900 text-white p-2 sm:p-2 md:text-lg font-notoSans"
        maxLength="9"
      />
      {search.length !== 0 &&
        notesWithLabels.length +
          archivesWithLabels.length +
          trashWithLabels.length ===
          0 && (
          <h3 className="font-caveat text-xl sm:text-2xl md:text-3xl font-normal mt-4">
            No notes with label{" "}
            <span className="text-cyan-700">'{search}'</span> were found :/
          </h3>
        )}
      <NoteResults />
      <ArchiveResults />
      <TrashResults />
    </section>
  );
}

export default Labels;
