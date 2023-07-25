import { Box } from "@mui/material";
import { styled } from "@mui/system";

// most common flex settings:

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",  // equal space *between* elements
  alignItems: "center", // align vertically in center
});

export default FlexBetween;