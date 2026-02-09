import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <Drawer variant="permanent" sx={{ width: 220 }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>

        {role === "Admin" && (
          <ListItem button component={Link} to="/admin">
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}

        <ListItem
          button
          component="a"
          href="https://water-quality-management.onrender.com"
          target="_blank"
        >
          <ListItemText primary="Download Report" />
        </ListItem>
      </List>
    </Drawer>
  );
}
