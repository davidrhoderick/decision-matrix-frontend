
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}


const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81"
        },
        "danger": {
          "50": "#fff1f2",
          "100": "#ffe4e6",
          "200": "#fecdd3",
          "300": "#fda4af",
          "400": "#fb7185",
          "500": "#f43f5e",
          "600": "#e11d48",
          "700": "#be123c",
          "800": "#9f1239",
          "900": "#881337"
        },
        "success": {
          "50": "#f7fee7",
          "100": "#ecfccb",
          "200": "#d9f99d",
          "300": "#bef264",
          "400": "#a3e635",
          "500": "#84cc16",
          "600": "#65a30d",
          "700": "#4d7c0f",
          "800": "#3f6212",
          "900": "#365314"
        },
        "warning": {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        "background": {
          "backdrop": 'rgba(var(--joy-palette-primary-darkChannel, 11, 13, 14) / 0.90)'
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81"
        },
        "danger": {
          "50": "#fff1f2",
          "100": "#ffe4e6",
          "200": "#fecdd3",
          "300": "#fda4af",
          "400": "#fb7185",
          "500": "#f43f5e",
          "600": "#e11d48",
          "700": "#be123c",
          "800": "#9f1239",
          "900": "#881337"
        },
        "success": {
          "50": "#f7fee7",
          "100": "#ecfccb",
          "200": "#d9f99d",
          "300": "#bef264",
          "400": "#a3e635",
          "500": "#84cc16",
          "600": "#65a30d",
          "700": "#4d7c0f",
          "800": "#3f6212",
          "900": "#365314"
        },
        "warning": {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        "neutral": {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b"
        },
        "background": {
          "backdrop": 'rgba(var(--joy-palette-primary-darkChannel, 11, 13, 14) / 0.25)'
        }
      }
    }
  }
})

export default theme;
