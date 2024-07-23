import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'default-text': "#93fad6",
        'primaryTable': '#3F3F46',
        'primaryTableHover': '#10b981',
        'primaryTableText': '#10b981',
      }
    },
  },
  plugins: [nextui({
    themes: {
      dark: {        
        colors: {
          background: '#0000003b',
          // Customize the light theme here
          

        },
      },
      light: {
        colors: {
          secondary: '#10b981',
        }
      },
    },
  })],
};
export default config;
