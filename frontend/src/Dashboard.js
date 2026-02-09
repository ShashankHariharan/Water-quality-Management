import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function Dashboard({ role }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/api/water/latest")
        .then((res) => res.json())
        .then(setData);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar role={role} />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">
          Dashboard ({role})
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Kpi title="pH" value={data.ph} />
          <Kpi title="Turbidity" value={data.turbidity} />
          <Kpi title="TDS" value={data.tds} />
          <Kpi title="Temperature" value={data.temperature} />
        </Grid>
      </Box>
    </Box>
  );
}

function Kpi({ title, value }) {
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography>{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
