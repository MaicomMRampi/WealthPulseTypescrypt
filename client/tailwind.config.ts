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
        'primaryTable': '#3e3b3b',
        'primaryTableHover': '#10b981',
        'primaryTableText': '#10b981',
        'buttonAzulClaro':'#0284c7',
        'buttonCinzaPadrao':'#9ca3af',
        'buttonAzulEscuro':'rgb(30,58,138)',
        'iconeDeBloquiar':'#eeb70d',
        'bgCards':'#0b1739',
        'backgroundModais':'#333333'
      }
    },
  },
  plugins: [nextui({
    
    themes: {
      dark: {        
        colors: {
          textCards:'#fff',
          BgCardPadrao: '#1f2127',
          BgCardPadraoTable: '#1f2127',
          background: '#0000003b',
          primary: '#10b981',          
          // Customize the light theme here        
        },
      },
      light: {
        colors: {
          textCards:'#000',
          BgCardPadraoTable: '#0b1739',
          BgCardPadrao: '#ffffff',
          primary: '#10b981',
        }
      },
    },
  })],
};
export default config;
