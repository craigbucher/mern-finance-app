import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

// https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas:
// large screens = 10 rows of 3 columns
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
// small screens = 10 rows of 1 column
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

// no need to use typescript here, because we're just setting-up layouts
// typescript is most useful when actually dealing with data

const Dashboard = () => {
	// set breakpoint at 1200px using MUI 'useMediaQuery':
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
		// outermost container:
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
							// 3 equal sized & spaced columns:
							// min width = 370px; max width = 1 fractional unit (1/3)
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
							// 10 rows, each component will be between 2 and 4 rows:
							// min height = 60px; max height = 1 fractional unit (1/10)
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
							// use 'gridTemplateAreas' specification, above
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
							// width = 1 fractional unit (1/1 in this case)
              gridAutoColumns: "1fr",
							// row height exactly 80px
              gridAutoRows: "80px",
							// use 'gridTemplateSmallScreens' specification, above
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
			{/* Demonstrate grid layout: */}
			{/* <Box bgcolor="#fff" gridArea="a">a</Box>
			<Box bgcolor="#fff" gridArea="b">b</Box>
			<Box bgcolor="#fff" gridArea="c">c</Box>
			<Box bgcolor="#fff" gridArea="d">d</Box>
			<Box bgcolor="#fff" gridArea="e">e</Box>
			<Box bgcolor="#fff" gridArea="f">f</Box>
			<Box bgcolor="#fff" gridArea="g">g</Box>
			<Box bgcolor="#fff" gridArea="h">h</Box>
			<Box bgcolor="#fff" gridArea="i">i</Box>
			<Box bgcolor="#fff" gridArea="j">j</Box> */}

      {/* Split-out rows, to keep from having one huge, long file */}
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;