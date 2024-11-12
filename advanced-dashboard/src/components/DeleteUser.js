// src/components/DeleteUser.js
import React, { useState } from "react";
import { deleteUser } from "./UserService";

const DeleteUser = ({ userId }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      setSuccess(true);
    } catch (error) {
      setError("Failed to delete user.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete User</button>
      {success && <p>User deleted successfully!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteUser;
