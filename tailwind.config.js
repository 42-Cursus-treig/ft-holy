export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          deep: "var(--ink-deep)",
          soft: "var(--ink-soft)",
          line: "var(--ink-line)",
          hairline: "var(--ink-hairline)",
        },
        vellum: {
          DEFAULT: "var(--vellum)",
          dim: "var(--vellum-dim)",
          mute: "var(--vellum-mute)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
        },
        rust: {
          DEFAULT: "var(--rust)",
          soft: "var(--rust-soft)",
        },
        azure: {
          DEFAULT: "var(--azure)",
          soft: "var(--azure-soft)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderColor: {
        DEFAULT: "var(--ink-line)",
      },
    },
  },
  plugins: [],
};
