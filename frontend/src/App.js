import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* =========================
   MAIN APP
========================= */

export default function App() {
  const [role, setRole] = useState(null);

  return role ? (
    <MainDashboard role={role} setRole={setRole} />
  ) : (
    <Login setRole={setRole} />
  );
}

/* =========================
   LOGIN PAGE
========================= */

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username === "admin" && password === "admin123") {
      setRole("Admin");
    } else if (username === "operator" && password === "operator123") {
      setRole("Operator");
    } else {
      alert("Invalid Login Credentials");
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
      <Card sx={{ width: 380, p: 3, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Water Quality
        </Typography>

        <Typography variant="subtitle1" textAlign="center" sx={{ mb: 3 }}>
          Management System Login
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
          size="large"
          sx={{ mt: 2, borderRadius: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}

/* =========================
   MAIN DASHBOARD
========================= */

function MainDashboard({ role, setRole }) {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [alertMsg, setAlertMsg] = useState("Loading Alerts...");

  // Admin user management
  const [usersList, setUsersList] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");

  // Page Navigation (Dashboard / Admin)
  const [page, setPage] = useState("dashboard");

  /* Fetch Live Data */
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://water-quality-management.onrender.com/api/water/latest")
        .then((res) => res.json())
        .then((result) => {
          setData(result);

          setHistory((prev) => {
            const updated = [
              ...prev,
              {
                time: new Date().toLocaleTimeString(),
                ph: result.ph,
              },
            ];
            return updated.slice(-10);
          });
        });

      fetch("http://localhost:8000/api/water/alerts")
        .then((res) => res.json())
        .then((msg) => setAlertMsg(msg.alert));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* Load Users for Admin */
  function loadUsers() {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then(setUsersList);
  }

  useEffect(() => {
    if (role === "Admin") {
      loadUsers();
    }
  }, [role]);

  /* Add User */
  function addUser() {
    fetch("http://localhost:8000/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser,
        password: newPass,
        role: "Operator",
      }),
    }).then(() => {
      alert("User Added Successfully!");
      setNewUser("");
      setNewPass("");
      loadUsers();
    });
  }

  /* Delete User */
  function deleteUser(username) {
    fetch("http://localhost:8000/api/users/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    }).then(() => {
      alert("User Deleted Successfully!");
      loadUsers();
    });
  }

  if (!data) return <Typography>Loading Dashboard...</Typography>;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Dashboard Button */}
            <ListItem button onClick={() => setPage("dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Admin Button */}
            {role === "Admin" && (
              <ListItem button onClick={() => setPage("admin")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
              </ListItem>
            )}

            <Divider />

            {/* Report */}
            <ListItem
              button
              component="a"
              href="http://localhost:8000/api/report/full"
              target="_blank"
            >
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText primary="Download Report" />
            </ListItem>

            {/* Logout */}
            <ListItem button onClick={() => setRole(null)}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Water Quality Dashboard ({role})
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          {/* Alerts */}
          <Alert severity="info" sx={{ mb: 3 }}>
            {alertMsg}
          </Alert>

          {/* ================= DASHBOARD PAGE ================= */}
          {page === "dashboard" && (
            <>
              {/* KPI Cards */}
              <Grid container spacing={3}>
                <KpiCard title="pH Level" value={data.ph} />
                <KpiCard title="Turbidity" value={data.turbidity} />
                <KpiCard title="TDS (ppm)" value={data.tds} />
                <KpiCard title="Temperature" value={data.temperature} />
              </Grid>

              {/* Chart */}
              <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Live pH Trend
              </Typography>

              <Card sx={{ p: 2, borderRadius: 4 }}>
                <LineChart width={750} height={280} data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ph" strokeWidth={3} />
                </LineChart>
              </Card>
            </>
          )}

          {/* ================= ADMIN PAGE ================= */}
          {page === "admin" && role === "Admin" && (
            <Card sx={{ mt: 3, p: 3, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Admin User Management
              </Typography>

              {/* Add User Form */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  label="New Username"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                />

                <TextField
                  label="Password"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addUser}
                >
                  Add User
                </Button>
              </Box>

              {/* User List */}
              {usersList.map((u, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Typography>
                    {u.username} ({u.role})
                  </Typography>

                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUser(u.username)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* =========================
   KPI CARD COMPONENT
========================= */

function KpiCard({ title, value }) {
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
