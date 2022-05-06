import React, { useEffect } from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { GiPlagueDoctorProfile } from "../icons";
import { fetchUserDetails } from "../services/authAPI";
import { LogoutButton } from ".";

function Profile() {
  const {
    authState: { user, token },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    fetchUserDetails(token, authDispatch);
  }, []);

  const calcTotalCharacters = () => {
    if (!user.notes || !user.archives || !user.trash) return 0;
    const allNotes = user.notes.concat(user.archives).concat(user.trash);
    return allNotes.reduce((acc, curr) => acc + curr.text.length, 0);
  };
  return (
    <section className="flex-grow flex flex-col gap-4 items-center m-0">
      <h1 className="self-start flex items-center gap-1.5 text-2xl pl-2 font-bold font-caveat sm:pl-6 sm:text-3xl md:pl-10">
        Profile <GiPlagueDoctorProfile />
      </h1>
      <div className="w-11/12 flex flex-col text-white font-caveat text-base sm:text-xl md:text-2xl gap-3 p-5 bg-slate-800 border-4 border-solid border-emerald-200 rounded-2xl">
        <h2 className="self-start flex gap-2 items-center text-xl underline decoration-emerald-500 font-bold font-caveat sm:text-2xl">
          Information
        </h2>
        <div className="flex gap-3 justify-around">
          <h2>
            Name: <span className="font-medium"> {user.fullName}</span>
          </h2>
          <h2>
            Email: <span className="font-medium"> {user.email}</span>
          </h2>
        </div>
        <h2 className="self-center">
          Account Created On:
          <span className="font-medium ml-1">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </h2>
      </div>
      <div className="w-11/12 flex flex-col font-caveat text-base text-white sm:text-xl md:text-2xl gap-3 p-5 bg-slate-800 border-4 border-solid border-cyan-300 rounded-2xl">
        <h2 className="self-start flex gap-2 items-center text-xl underline decoration-cyan-500 font-bold font-caveat sm:text-2xl">
          Note Statistics
        </h2>
        <div className="flex gap-3 justify-evenly -translate-x-4">
          <h2>
            In Notes:
            <span className="font-medium"> {user.notes?.length}</span>
          </h2>
          <h2>
            In Archives:
            <span className="font-medium"> {user.archives?.length}</span>
          </h2>
        </div>
        <div className="flex gap-3 justify-evenly">
          <h2>
            In Trash:
            <span className="font-medium"> {user.trash?.length}</span>
          </h2>
          <h2>
            Total Characters:
            <span className="font-medium "> {calcTotalCharacters()}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Profile;
