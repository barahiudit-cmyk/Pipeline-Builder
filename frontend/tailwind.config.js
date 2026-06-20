// module.exports = {
//   content: ['./src/**/*.{js,jsx}'],
//   darkMode: 'class',
//   safelist: [
   
//   ],
//   theme: { extend: {} },
//   plugins: [require('tailwindcss-animate')],
// };

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  safelist: [
    // gradients for node headers
    {
      pattern: /(from|to)-(emerald|blue|violet|amber|cyan|pink|sky|gray|orange|rose|purple|indigo)-(500|600)/,
    },
    // text colors for icons
    {
      pattern: /text-(emerald|blue|violet|amber|cyan|pink|sky|gray|orange|rose|purple|indigo)-500/,
    },
  ],
  theme: { extend: {} },
  plugins: [require('tailwindcss-animate')],
};