// additions to 'default' MaterialUI themes:

// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

// get types in 'createPalette':
declare module "@mui/material/styles/createPalette" {
  // declare types for expanded theme (ex= 500: "#b3b6c2")
	interface PaletteColor {
    [key: number]: string;
  }
	// add 'tertiary' theme to Palette:
  interface Palette {
    tertiary: PaletteColor;
  }
}