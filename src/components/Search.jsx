import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { fetchArchives, fetchNotes, fetchTrash } from "../services";
import { ImSearch } from "../utils/icons";
import { toCamelCase, searchQueryNotes } from "./helpers";
import { FormInput } from ".";
import NoteCard from "./NoteCard";

function Search() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("LABEL");
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

  const notesQuery = searchQueryNotes(notes, search, searchType);
  const archivesQuery = searchQueryNotes(archives, search, searchType);
  const trashQuery = searchQueryNotes(trash, search, searchType);

  const NoteResults = () =>
    notesQuery.length !== 0 && (
      <>
        <h3 className="text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Notes
        </h3>
        {notesQuery.map((note) => (
          <NoteCard key={note._id} type="HOME" note={note} />
        ))}
      </>
    );
  const ArchiveResults = () =>
    archivesQuery.length !== 0 && (
      <>
        <h3 className="text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Archives
        </h3>
        {archivesQuery.map((note) => (
          <NoteCard key={note._id} type="ARCHIVE" note={note} />
        ))}
      </>
    );
  const TrashResults = () =>
    trashQuery.length !== 0 && (
      <>
        <h3 className=" text-xl pl-2 font-bold font-caveat sm:pl-6 sm:text-2xl md:pl-10">
          In Trash
        </h3>
        {trashQuery.map((note) => (
          <NoteCard key={note._id} type="TRASH" note={note} />
        ))}
      </>
    );

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start flex items-center gap-1 text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Search <ImSearch className="rotate-90" />
      </h1>
      <span className="flex items-center flex-wrap self-start text-base md:text-xl ml-2 sm:ml-10 gap-1 md:gap-2">
        Searching:
        <label className="p-1.5 w-20 sm:w-24 rounded-md text-white bg-rose-500 shadow-sm shadow-black hover:bg-rose-600 hover:cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name="queryType"
            checked={searchType === "LABEL"}
            onChange={() => setSearchType("LABEL")}
          />{" "}
          Labels
        </label>
        <label className="p-1.5 w-20 sm:w-24 rounded-md text-white  bg-rose-500 shadow-sm shadow-black hover:bg-rose-600 hover:cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name="queryType"
            checked={searchType === "TITLE"}
            onChange={() => setSearchType("TITLE")}
          />{" "}
          Title
        </label>
        <label className="p-1.5 w-20 sm:w-24 rounded-md text-white bg-rose-500 shadow-sm shadow-black hover:bg-rose-600 hover:cursor-pointer text-sm sm:text-base">
          <input
            type="radio"
            name="queryType"
            checked={searchType === "TEXT"}
            onChange={() => setSearchType("TEXT")}
          />{" "}
          Text
        </label>
      </span>

      <FormInput
        reference={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`🔍 Search for ${toCamelCase(searchType)}...`}
        styles="self-center max-w-full bg-slate-900 text-white p-2 relative md:text-lg"
        maxLength="12"
      />
      {search.length !== 0 &&
        notesQuery.length + archivesQuery.length + trashQuery.length === 0 && (
          <h3 className="font-caveat text-xl sm:text-2xl  md:text-3xl font-normal mt-4">
            No notes with {searchType.toLowerCase()}
            <span className="text-cyan-700 mx-1.5">'{search}'</span>were found
            :/
          </h3>
        )}
      <NoteResults />
      <ArchiveResults />
      <TrashResults />
    </section>
  );
}

export default Search;
