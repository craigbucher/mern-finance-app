import { Box } from "@mui/material";
import { styled } from "@mui/system";

// default styling for dashboard boxes:

// passing-in 'theme' to use color scheme:
const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",	// top, left, bottom, right; black 80% opacity
}));

export default DashboardBox;