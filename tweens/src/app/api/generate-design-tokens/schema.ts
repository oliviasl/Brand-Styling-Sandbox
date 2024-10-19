import { z } from "zod";

// Typography Schema
const TypographySchema = z.object({
  heading: z.string(),
  body: z.string(),
});

// Borders Schema
const BordersSchema = z.object({
  width: z.string(),
  radius: z.string(),
});

// ColorConfig Schema
const ColorConfigSchema = z.object({
  DEFAULT: z.string(),
  foreground: z.string(),
});

// Colors Schema
const ColorsSchema = z.object({
  primary: ColorConfigSchema,
  secondary: ColorConfigSchema,
  destructive: ColorConfigSchema,
  muted: ColorConfigSchema,
  accent: ColorConfigSchema,
  popover: ColorConfigSchema,
  border: z.string(),
  ring: z.string(),
  background: z.string(),
  foreground: z.string(),
});

// Other Schema
const OtherSchema = z.object({
  shadow: z.string(),
  transitionDuration: z.string(),
  transitionTimingFunction: z.string(),
  transitionProperties: z.string(),
});

// DesignTokens Schema
export const DesignTokensSchema = z.object({
  colors: ColorsSchema,
  typography: TypographySchema,
  borders: BordersSchema,
  other: OtherSchema,
});
