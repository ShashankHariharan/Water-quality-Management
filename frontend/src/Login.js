import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button, Typography, Box } from "@mui/material";

export default function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (username === "admin" && password === "admin123") {
      setRole("Admin");
      navigate("/dashboard");
    } else if (username === "operator" && password === "operator123") {
      setRole("Operator");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #2563eb, #111827)",
      }}
    >
      <Card sx={{ width: 380, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Water Quality Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, borderRadius: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}
