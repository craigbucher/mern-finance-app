// from: https://www.youtube.com/watch?v=uoJ0Tv-BFcQ
// https://github.com/ed-roh/finance-app
// https://discord.gg/N58wa7JmDB

import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";

function App() {
	// 'useMemo' Hook returns a memoized value. Think of memoization as caching a value so that it does not need to be recalculated
  const theme = useMemo(() => createTheme(themeSettings), []);	// run once on initial load
  return (
    <div className="app">
      <BrowserRouter>
				{/* initialize theme, imported above */}
        <ThemeProvider theme={theme}>
					{/* CssBaseline = normalizes styles amongst/between browsers */}
          <CssBaseline />
					{/* "root em" refers to the font size of the root element, which is usually the <html> element. */}
          {/* padding = top, left, bottom, right (like a clock) */}
					<Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
							{/* <Route path="/" element={<div>dashboard page</div>}	/> */}
              <Route path="/" element={<Dashboard />} />
							{/* <Route path="/predictions" element={<div>predictions page</div>} /> */}
              <Route path="/predictions" element={<Predictions />} />
							<Route path="/*" element={<h1>404 - Not Found</h1>}	/>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
