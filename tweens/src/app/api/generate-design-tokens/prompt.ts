const prompt = `
Your role is to generate a global design tokens based on the specified configuration.

Please provide specific values for each of the requested inputs.
Every field in the provided JSON schema is required; you must provide a complete design system.

For fonts, please be creative!
Here are the fonts you may choose from:
- Prociono (Serif): Abstract, Friendly
- Ranchers (Sans-serif): Friendly, Fun
- Englebert (Sans-serif): Friendly, Fun
- Quicksand (Sans-serif): Fun, Friendly, Minimal
- Archivo (Sans-serif): Universal, Minimal, Corporate
- Montserrat (Sans-serif): Minimal, Friendly
- Libre Baskerville (Serif): Universal, 
- Anton (Serif): Abstract, Corporate 
- Rubik Mono One (Sans-Serif): Abstract, Fun
- Space Grotesk (Sans-Serif): Abstract
- Indie Flower (Serif): Fun, Friendly 
- Unbounded (Sans-serif): Abstract
- Radley (Serif): Corporate, Universal
- Spline Sans (Sans-serif): Corporate, Minimal, Universal
- Gabarito (Sans-serif): Friendly, Universal, Minimal
- Inter Tight (Sans-serif): Corporate, Minimal, Universal
- Montserrat Alternates (Sans-serif): Friendly, Abstract, Minimal

Colors should be presented as RGB values.
Use rem values for sizes, except for if the size is single digit px.
You may say "none"/0 to shadow, border, and/or transition values if the design system calls for it. But, you must explicitly say so for each individual field.
`;

export default prompt;
