// tailwindConfig.d.ts
interface TailwindConfig {
    theme: {
      extend: {
        colors: {
          [key: string]: {
            DEFAULT: string; // Adjust this based on your config
          };
        },
        fontFamily: {
            heading?: string[]; // or adjust the type based on your config
            sans?: string[];
            body?: string[];
        };
      }
    };
}
  
// Declare the config variable
declare const tailwindConfig: TailwindConfig;