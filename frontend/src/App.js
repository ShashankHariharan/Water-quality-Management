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
  Switch,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";

/* Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import InsightsIcon from "@mui/icons-material/Insights";
import HistoryIcon from "@mui/icons-material/History";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

/* Charts */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const API_BASE = "http://127.0.0.1:8000";

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
    if (username === "admin" && password === "admin123") setRole("Admin");
    else if (username === "operator" && password === "operator123")
      setRole("Operator");
    else alert("Invalid Login Credentials");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        background: "radial-gradient(circle, #2563eb, #111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card sx={{ width: 420, p: 4, borderRadius: 4 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            Water Quality Monitoring
          </Typography>

          <Typography textAlign="center" sx={{ mb: 3, color: "gray" }}>
            Secure Management Login
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
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>
      </motion.div>
    </Box>
  );
}

/* =========================
   MAIN DASHBOARD
========================= */
function MainDashboard({ role, setRole }) {
  const [page, setPage] = useState("dashboard");

  /* Dark Mode */
  const [darkMode, setDarkMode] = useState(false);

  /* Sensor Data */
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [alertMsg, setAlertMsg] = useState("Loading alerts...");

  /* Admin Users */
  const [usersList, setUsersList] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");

  /* Fetch Sensor Data */
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_BASE}/api/water/latest`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);

          setHistory((prev) =>
            [...prev, { time: new Date().toLocaleTimeString(), ph: result.ph }]
              .slice(-10)
          );
        });

      fetch(`${API_BASE}/api/water/alerts`)
        .then((res) => res.json())
        .then((msg) => setAlertMsg(msg.alert));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* Load Users */
  function loadUsers() {
    fetch(`${API_BASE}/api/users`)
      .then((res) => res.json())
      .then(setUsersList);
  }

  useEffect(() => {
    if (role === "Admin") loadUsers();
  }, [role]);

  /* Add User */
  function addUser() {
    fetch(`${API_BASE}/api/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser,
        password: newPass,
        role: "Operator",
      }),
    }).then(() => {
      loadUsers();
      setNewUser("");
      setNewPass("");
    });
  }

  /* Delete User */
  function deleteUser(username) {
    fetch(`${API_BASE}/api/users/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    }).then(() => loadUsers());
  }

  if (!data) return <Typography>Loading Dashboard...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#111827" : "#f9fafb",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 260 }}>
        <Toolbar />
        <List>
          <SidebarItem
            icon={<DashboardIcon />}
            text="Dashboard"
            active={page === "dashboard"}
            onClick={() => setPage("dashboard")}
          />
          <SidebarItem
            icon={<DevicesIcon />}
            text="Devices"
            active={page === "devices"}
            onClick={() => setPage("devices")}
          />
          <SidebarItem
            icon={<InsightsIcon />}
            text="Analytics"
            active={page === "analytics"}
            onClick={() => setPage("analytics")}
          />
          <SidebarItem
            icon={<HistoryIcon />}
            text="Sensor Logs"
            active={page === "logs"}
            onClick={() => setPage("logs")}
          />
          <SidebarItem
            icon={<BuildIcon />}
            text="Maintenance"
            active={page === "maintenance"}
            onClick={() => setPage("maintenance")}
          />

          {role === "Admin" && (
            <SidebarItem
              icon={<PeopleIcon />}
              text="User Management"
              active={page === "admin"}
              onClick={() => setPage("admin")}
            />
          )}

          <SidebarItem
            icon={<SettingsIcon />}
            text="Settings"
            active={page === "settings"}
            onClick={() => setPage("settings")}
          />
          <SidebarItem
            icon={<DescriptionIcon />}
            text="Reports"
            active={page === "reports"}
            onClick={() => setPage("reports")}
          />
          <SidebarItem
            icon={<InfoIcon />}
            text="System Info"
            active={page === "info"}
            onClick={() => setPage("info")}
          />

          <Divider />

          <SidebarItem
            icon={<LogoutIcon />}
            text="Logout"
            onClick={() => setRole(null)}
          />
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Water Quality Monitoring ({role})
            </Typography>

            {/* Dark Mode Toggle */}
            <Typography variant="body2" sx={{ mr: 1 }}>
              Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            {alertMsg}
          </Alert>

          {/* PAGE CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* DASHBOARD */}
              {page === "dashboard" && (
                <>
                  <Grid container spacing={3}>
                    <KpiCard title="pH Level" value={data.ph} />
                    <KpiCard title="Turbidity" value={data.turbidity} />
                    <KpiCard title="TDS (ppm)" value={data.tds} />
                    <KpiCard title="Temperature (°C)" value={data.temperature} />
                  </Grid>

                  <Typography variant="h5" sx={{ mt: 4 }}>
                    Live pH Trend
                  </Typography>

                  <Card sx={{ mt: 2, p: 2, borderRadius: 4 }}>
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

              {/* DEVICES */}
              {page === "devices" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">Connected Devices</Typography>
                  <Typography sx={{ mt: 2 }}>
                    Device-01 → Online <br />
                    Device-02 → Offline <br />
                    Device-03 → Maintenance Required
                  </Typography>
                </Card>
              )}

              {/* ANALYTICS */}
              {page === "analytics" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">AI Water Risk Prediction</Typography>
                  <Typography sx={{ mt: 2 }}>
                    Risk Score: 12% (Low Risk) <br />
                    Forecast: Stable water quality for next 24 hours.
                  </Typography>
                </Card>
              )}

              {/* SENSOR LOGS */}
              {page === "logs" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">Recent Sensor Logs</Typography>
                  {history.map((h, i) => (
                    <Typography key={i}>
                      {h.time} → pH: {h.ph}
                    </Typography>
                  ))}
                </Card>
              )}

              {/* MAINTENANCE */}
              {page === "maintenance" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">Maintenance Schedule</Typography>
                  <Typography sx={{ mt: 2 }}>
                    Next Calibration: 7 Days <br />
                    Sensor Cleaning: Pending <br />
                    Hardware Health: Good
                  </Typography>
                </Card>
              )}

              {/* SETTINGS */}
              {page === "settings" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">System Settings</Typography>
                  <Typography sx={{ mt: 2 }}>
                    Configure alert thresholds and monitoring rules.
                  </Typography>
                </Card>
              )}

              {/* REPORTS */}
              {page === "reports" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">Reports Center</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    href={`${API_BASE}/api/report/full`}
                    target="_blank"
                  >
                    Download Full Report
                  </Button>
                </Card>
              )}

              {/* SYSTEM INFO */}
              {page === "info" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">System Information</Typography>
                  <Typography sx={{ mt: 2 }}>
                    Platform Version: 1.0 <br />
                    Backend: FastAPI + SQLite <br />
                    Frontend: React + Material UI <br />
                    Deployment Ready
                  </Typography>
                </Card>
              )}

              {/* ADMIN PAGE */}
              {page === "admin" && role === "Admin" && (
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h5">User Management</Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <TextField
                      label="Username"
                      value={newUser}
                      onChange={(e) => setNewUser(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <Button startIcon={<AddIcon />} onClick={addUser}>
                      Add
                    </Button>
                  </Box>

                  {usersList.map((u, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography>{u.username}</Typography>
                      <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteUser(u.username)}
                      >
                        Delete
                      </Button>
                    </Box>
                  ))}
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, text, onClick, active }) {
  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        background: active ? "#2563eb15" : "transparent",
        borderRadius: 2,
        m: 1,
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

/* KPI Card */
function KpiCard({ title, value }) {
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
