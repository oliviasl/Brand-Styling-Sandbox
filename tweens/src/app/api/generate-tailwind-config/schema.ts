import { z } from "zod";

// FontFamily Schema
const FontFamilySchema = z.object({
  primary: z.string(),
  secondary: z.string(),
});

// TypographyConfig Schema
const TypographyConfigSchema = z.object({
  fontFamily: z.string(),
  fontSize: z.string(),
  fontWeight: z.string(),
  lineHeight: z.string(),
  letterSpacing: z.string(),
});

// Typography Schema
const TypographySchema = z.object({
  heading: TypographyConfigSchema,
  subheading: TypographyConfigSchema,
  subsubheading: TypographyConfigSchema,
  body: TypographyConfigSchema,
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
