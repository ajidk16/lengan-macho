// Enhanced theme system with dark mode support
export const theme = {
  colors: {
    primary: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316", // Main orange
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
    secondary: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
    neutral: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
    },
  },
  gradients: {
    light: {
      primary: "bg-gradient-to-r from-orange-400 to-orange-600",
      secondary: "bg-gradient-to-r from-yellow-400 to-orange-500",
      background: "bg-gradient-to-br from-orange-50 via-white to-yellow-50",
      card: "bg-gradient-to-br from-white to-orange-50",
    },
    dark: {
      primary: "bg-gradient-to-r from-orange-600 to-orange-800",
      secondary: "bg-gradient-to-r from-yellow-600 to-orange-700",
      background: "bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20",
      card: "bg-gradient-to-br from-gray-800 to-gray-700",
    },
  },
  shadows: {
    light: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg shadow-orange-500/10",
      xl: "shadow-xl shadow-orange-500/20",
    },
    dark: {
      sm: "shadow-sm shadow-black/20",
      md: "shadow-md shadow-black/30",
      lg: "shadow-lg shadow-black/40",
      xl: "shadow-xl shadow-black/50",
    },
  },
}

export const getStatusColor = (status: "success" | "warning" | "error" | "info", isDark = false) => {
  const lightColors = {
    success: "text-green-600 bg-green-50 border-green-200",
    warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
    error: "text-red-600 bg-red-50 border-red-200",
    info: "text-orange-600 bg-orange-50 border-orange-200",
  }

  const darkColors = {
    success: "text-green-400 bg-green-900/20 border-green-800",
    warning: "text-yellow-400 bg-yellow-900/20 border-yellow-800",
    error: "text-red-400 bg-red-900/20 border-red-800",
    info: "text-orange-400 bg-orange-900/20 border-orange-800",
  }

  return isDark ? darkColors[status] : lightColors[status]
}
