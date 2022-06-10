const sizes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const names = ["tertiary", "neutral", "primary", "secondary"];

let colors: ColorInfo[] | undefined;

/** computes color values for each combination from css value via the document */
export function getColorInfo(): ColorInfo[] {
  if (colors) {
    return colors;
  }
  const results: ColorInfo[] = [];
  for (const name of names) {
    for (const weight of sizes) {
      const info: ColorInfo = {
        name,
        weight,
        cssVarName: `--colors-${name}-${weight}`,
      };
      results.push(info);
    }
  }
  if (results.length) {
    colors = results;
  }
  return results;
}

export function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// based off of https://stackoverflow.com/a/12043228/4522100
export function isDark(r: number, g: number, b: number): boolean {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma < 90;
}

export interface ColorInfo {
  name: string;
  weight: number;
  cssVarName: string;
}
