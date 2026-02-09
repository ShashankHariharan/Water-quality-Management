import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";

export default function AdminPanel({ role }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");

  function loadUsers() {
    fetch("https://water-quality-management.onrender.com")
      .then((res) => res.json())
      .then(setUsers);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function addUser() {
    fetch("https://water-quality-management.onrender.com/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser,
        password: newPass,
        role: "Operator",
      }),
    }).then(() => {
      alert("User Added");
      loadUsers();
    });
  }

  function deleteUser(username) {
    fetch("https://water-quality-management.onrender.com/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    }).then(() => {
      alert("User Deleted");
      loadUsers();
    });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role={role} />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">Admin Panel</Typography>

        {/* Add User Form */}
        <Card sx={{ p: 3, mt: 3, borderRadius: 3 }}>
          <Typography variant="h6">Add New User</Typography>

          <TextField
            label="Username"
            fullWidth
            sx={{ mt: 2 }}
            onChange={(e) => setNewUser(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <Button variant="contained" sx={{ mt: 2 }} onClick={addUser}>
            Add User
          </Button>
        </Card>

        {/* User List */}
        <Card sx={{ p: 3, mt: 3, borderRadius: 3 }}>
          <Typography variant="h6">Registered Users</Typography>

          {users.map((u, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <span>
                {u.username} ({u.role})
              </span>

              <Button
                color="error"
                variant="outlined"
                onClick={() => deleteUser(u.username)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
}
