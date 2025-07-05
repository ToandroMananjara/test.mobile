/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode - Base colors
        background: "#ffffff",
        foreground: "#0f172a",
        card: "#f8fafc",
        border: "#e2e8f0",
        input: "#ffffff",
        ring: "#3b82f6",
        primary: "#3b82f6",
        secondary: "#64748b",
        accent: "#e0f2fe",
        muted: "#f1f5f9",
        destructive: "#ef4444",

        // Light mode - Text colors with good contrast
        "text-primary": "#0f172a", // High contrast text
        "text-secondary": "#475569", // Medium contrast text
        "text-muted": "#64748b", // Low contrast text
        "text-accent": "#3b82f6", // Accent text
        "text-success": "#059669", // Success text
        "text-warning": "#d97706", // Warning text
        "text-error": "#dc2626", // Error text

        // Dark mode - Base colors
        "background-dark": "#020617",
        "foreground-dark": "#f8fafc",
        "card-dark": "#0f172a",
        "border-dark": "#1e293b",
        "input-dark": "#1e293b",
        "ring-dark": "#60a5fa",
        "primary-dark": "#60a5fa",
        "secondary-dark": "#64748b",
        "accent-dark": "#0284c7",
        "muted-dark": "#1e293b",
        "destructive-dark": "#f87171",

        // Dark mode - Text colors with good contrast
        "text-primary-dark": "#f8fafc", // High contrast text
        "text-secondary-dark": "#cbd5e1", // Medium contrast text
        "text-muted-dark": "#94a3b8", // Low contrast text
        "text-accent-dark": "#60a5fa", // Accent text
        "text-success-dark": "#34d399", // Success text
        "text-warning-dark": "#fbbf24", // Warning text
        "text-error-dark": "#f87171", // Error text

        // Surface colors for better layering
        surface: "#ffffff",
        "surface-secondary": "#f8fafc",
        "surface-tertiary": "#f1f5f9",
        "surface-dark": "#0f172a",
        "surface-secondary-dark": "#1e293b",
        "surface-tertiary-dark": "#334155",

        // Interactive states
        interactive: "#3b82f6",
        "interactive-hover": "#2563eb",
        "interactive-active": "#1d4ed8",
        "interactive-dark": "#60a5fa",
        "interactive-hover-dark": "#3b82f6",
        "interactive-active-dark": "#2563eb",

        // Branding colors
        "brand-primary": "#3b82f6",
        "brand-secondary": "#8b5cf6",
        "brand-accent": "#06b6d4",
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
