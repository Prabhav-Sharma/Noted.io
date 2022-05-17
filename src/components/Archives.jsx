import React, { useEffect } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useUserData } from "../contexts/providers/userDataProvider";
import { fetchArchives } from "../services";
import { MdArchive } from "../utils/icons";
import NoteCard from "./NoteCard";

function Archives() {
  const {
    userDataState: { archives },
    userDataDispatch,
  } = useUserData();

  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    fetchArchives(token, userDataDispatch);
  }, []);

  const archiveNotes =
    archives.length !== 0 ? (
      archives
        .reverse()
        .map((note) => <NoteCard key={note._id} note={note} type="ARCHIVE" />)
    ) : (
      <div className="h-full flex flex-col justify-start mt-8 items-center gap-8">
        <h3 className="text-base font-bold sm:text-xl md:text-2xl font-caveat">
          Your notes will be safe here, between you & me!
        </h3>
        <h3 className="flex text-base sm:text-xl md:text-2xl font-bold font-caveat items-center">
          Click on the
          <MdArchive className="ml-1.5 mr-1 animate-bounce" />
          icon to archive notes
        </h3>
      </div>
    );

  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start flex items-center gap-2 text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Archives <MdArchive />
      </h1>
      {archiveNotes}
    </section>
  );
}

export default Archives;
