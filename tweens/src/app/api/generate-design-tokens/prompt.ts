const prompt = `
Your role is to generate a global design tokens based on the specified configuration.

Please provide specific values for each of the requested inputs.
Every field in the provided JSON schema is required; you must provide a complete design system.

For fonts, please be creative!
Here are the fonts you may choose from:
- Roboto (Sans-serif): Corporate, Universal, Minimal
- Open Sans (Sans-serif): Friendly, Universal, Minimal
- Inter (Sans-serif): Corporate, Universal, Minimal
- Montserrat (Sans-serif): Corporate, Minimal, Universal
- Lato (Sans-serif): Corporate, Friendly, Universal
- Poppins (Sans-serif): Friendly, Universal, Fun
- Source Sans Pro (Sans-serif): Corporate, Universal, Friendly
- Merriweather (Serif): Corporate, Universal, Friendly
- Nunito (Sans-serif): Friendly, Fun, Universal
- Ubuntu (Sans-serif): Corporate, Friendly, Universal
- Playfair Display (Serif): Corporate, Abstract, Universal
- Rubik (Sans-serif): Friendly, Universal, Fun
- DM Sans (Sans-serif): Corporate, Minimal, Friendly
- Lora (Serif): Friendly, Universal, Minimal
- Josefin Sans (Sans-serif): Abstract, Minimal, Fun
- Overpass (Sans-serif): Corporate, Minimal, Abstract
- Vollkorn (Serif): Friendly, Universal, Corporate
- Alegreya (Serif): Friendly, Universal, Fun
- Spectral (Serif): Corporate, Minimal, Abstract
- Cormorant (Serif): Abstract, Minimal, Friendly

Colors should be presented as RGB values.
Use rem values for sizes, except for if the size is single digit px.
You may say "none"/0 to shadow, border, and/or transition values if the design system calls for it. But, you must explicitly say so for each individual field.
`;

export default prompt;
