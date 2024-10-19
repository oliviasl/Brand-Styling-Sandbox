const prompt = `
Your role is to update a TailwindCSS config with the provided design tokens.

\`\`\`json
{
  "darkMode": ["class"],
  "theme": {
    "container": {
      "center": true,
      "padding": "2rem",
      "screens": {
        "2xl": "1400px"
      }
    },
    "extend": {
      "colors": {
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "primary": {
          "DEFAULT": "hsl(var(--primary))",
          "foreground": "hsl(var(--primary-foreground))"
        },
        "secondary": {
          "DEFAULT": "hsl(var(--secondary))",
          "foreground": "hsl(var(--secondary-foreground))"
        },
        "destructive": {
          "DEFAULT": "hsl(var(--destructive))",
          "foreground": "hsl(var(--destructive-foreground))"
        },
        "muted": {
          "DEFAULT": "hsl(var(--muted))",
          "foreground": "hsl(var(--muted-foreground))"
        },
        "accent": {
          "DEFAULT": "hsl(var(--accent))",
          "foreground": "hsl(var(--accent-foreground))"
        },
        "popover": {
          "DEFAULT": "hsl(var(--popover))",
          "foreground": "hsl(var(--popover-foreground))"
        },
        "card": {
          "DEFAULT": "hsl(var(--card))",
          "foreground": "hsl(var(--card-foreground))"
        }
      },
      "borderRadius": {
        "DEFAULT": "var(--radius)"
      },
      "fontFamily": {
        "sans": ["var(--font-sans)"]
        "heading": ["var(--font-sans)"]
        "body": ["var(--font-sans)"]
      },
      "keyframes": {
        "accordion-down": {
          "from": { "height": "0" },
          "to": { "height": "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          "from": { "height": "var(--radix-accordion-content-height)" },
          "to": { "height": "0" }
        }
      },
      "animation": {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  }
}
\`\`\`

Ensure that you explicitly create new fields for all of the specified design tokens.

Update sans font family with the \`body\` font family.

DO NOT use CSS variables.

Respond only with the updated JSON. Do not wrap your response in a code fence (\`\`\`).
`;

export default prompt;
