export const STANDARD_NUMPAD: (string | null)[][] = [
  ["7", "8", "9", "DEL", "AC"],
  ["4", "5", "6", "×", "÷"],
  ["1", "2", "3", "+", "-"],
  ["0", ".", "%", "Ans", "="]
];

export const SCIENTIFIC_KEYBOARD_LAYOUT: (string | null)[][] = [
  // Row 1: Nav & Others
  ["◀", "▶", "LCM", "HCF", "Factor", "E"],
  // Row 2: SOLVE & Powers
  ["SOLVE", "x²", "x³", "^", "x⁻¹", "10^"],
  // Row 3: Fractions, Roots, Specials
  ["□/□", "√", "∛", "0.□̅", "÷R", "∞"],
  // Row 4: Mixed Fraction, Pi, Trig
  ["□□/□", "π", "Log", "Sin", "Cos", "Tan"],
  // Row 5: Variables x, y, z & Inv Trig
  ["x", "y", "z", "Csc", "Sec", "Cot"],
  // Row 6: Variables a, b, c, Brackets, Comma
  ["a", "b", "c", "(", ")", ","],
  ...STANDARD_NUMPAD
];

export const SIMPLE_KEYBOARD_LAYOUT: (string | null)[][] = [
  ["7", "8", "9", "DEL", "AC"],
  ["4", "5", "6", "×", "÷"],
  ["1", "2", "3", "+", "-"],
  ["(", ")", ".", "0", "="]
];

// All chapter specific top layouts will be defined here or inside their respective chapter definitions.
// Each layout is just the 6x6 array (or similar) that goes ON TOP of the standard numpad.
