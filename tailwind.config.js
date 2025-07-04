/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode
        background: "#ffffff",
        foreground: "#111827",
        card: "#f9fafb",
        border: "#e5e7eb",
        input: "#f1f5f9",
        ring: "#3b82f6",
        primary: "#2563eb",
        secondary: "#f3f4f6",
        accent: "#e0f2fe",
        muted: "#f8fafc",
        destructive: "#ef4444",

        // Dark mode
        "background-dark": "#0f172a",
        "foreground-dark": "#f8fafc",
        "card-dark": "#1e293b",
        "border-dark": "#334155",
        "input-dark": "#1e293b",
        "ring-dark": "#60a5fa",
        "primary-dark": "#60a5fa",
        "secondary-dark": "#1e293b",
        "accent-dark": "#0ea5e9",
        "muted-dark": "#1e293b",
        "destructive-dark": "#b91c1c",

        // Branding colors
        "app-blue": "#2563eb",
        "app-violet": "#7c3aed",
        "app-gradient-start": "#3b82f6",
        "app-gradient-end": "#8b5cf6",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      },
    },
  },
  plugins: [],
};
