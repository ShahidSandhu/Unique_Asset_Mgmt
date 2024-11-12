// src/components/UserList.js
import React, { useEffect, useState } from "react";
import { getUserById } from "./UserService";
import { useAuth } from "../context/AuthContext";

const UserList = () => {
  const { isAuthenticated, userId } = useAuth(); // Assuming userId is provided in context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(userId);
          setUser(data);
          setLoading(false);
        } catch (error) {
          setError("Error fetching user data");
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
