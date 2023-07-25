import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme(); // import theme settings
  const [selected, setSelected] = useState("dashboard");  // not reall for navigation; used to style text when selected
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      {/* 'gap' = insert space between elements (icon and typography) */}
      <FlexBetween gap="0.75rem">
        {/* 'sx' = add styling to elements */}
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finanseer
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        {/* lighten link text when hovered */}
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          {/* link to 'dashboard' */}
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            // using 'style' rather than 'sx' because <Link> is react-router-dom element:
            style={{
              // 'inherit' = use the color that it currently is (from parent):
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",  // same styling as parent
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          {/* link to 'predictions' */}
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;