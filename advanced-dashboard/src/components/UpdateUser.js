// src/components/UpdateUser.js
import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "./UserService";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UpdateUser = () => {
  const { isAuthenticated, userId } = useAuth(); // Get userId from auth context
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(userId);
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
        } catch (error) {
          setError("Error fetching user data");
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = { username, email, password };

    try {
      await updateUser(userId, updatedUser);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError("Failed to update user.");
      setSuccess(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Your Profile</h2>
      {success && <p>User updated successfully!</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUser;
