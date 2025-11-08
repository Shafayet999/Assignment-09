import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";

const MyProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || "");
    const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-success"></span>
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                displayName: newName,
                photoURL: newPhoto,
            });

            
            setUser({
                ...user,
                displayName: newName,
                photoURL: newPhoto,
            });

            setMessage("✅ Profile updated successfully!");
            setEditing(false);
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 px-5">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
                {/* Profile Image */}
                <img
                    src={
                        user.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                    }
                    alt="profile"
                    className="w-60 h-52 mx-auto rounded-md object-cover"
                />

                {/* Name + Email */}
                <h2 className="text-3xl font-bold mt-4 capitalize">
                    {user.displayName || "Unnamed User"}
                </h2>
                <p className="text-gray-600 mt-1 text-md font-semibold">{user.email}</p>

                <div className="divider"></div>

                
                <div className="text-left space-y-2 text-sm">
                    <p>
                        <span className="font-semibold text-gray-800">Email Verified:</span>{" "}
                        <span
                            className={`font-medium ${user.emailVerified ? "text-green-600" : "text-red-500"}`}
                        >
                            {user.emailVerified ? "Yes" : "No"}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold text-gray-800">Created:</span>{" "}
                        {new Date(user.metadata.creationTime).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-800">Last Login:</span>{" "}
                        {new Date(user.metadata.lastSignInTime).toLocaleString()}
                    </p>
                </div>

               
                {message && (
                    <p className="mt-3 text-sm font-semibold text-green-600">{message}</p>
                )}

               
                {!editing ? (
                    <button
                        className="btn w-full mt-6"
                        onClick={() => setEditing(true)}
                    >
                        Update Profile
                    </button>
                ) : (
                    <form onSubmit={handleUpdate} className="mt-5 space-y-3">
                        <input
                            type="text"
                            placeholder="New Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="New Photo URL"
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                type="submit"
                                className={`btn btn-success flex-1 ${loading && "loading"}`}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="btn flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
