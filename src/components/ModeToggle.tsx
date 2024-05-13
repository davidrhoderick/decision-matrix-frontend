import { useColorScheme } from "@mui/joy/styles";
import { Moon } from "lucide-react";
import { Switch } from "@mui/joy";

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Switch
      size="lg"
      checked={mode === "dark"}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      slotProps={{
        input: { "aria-label": "Dark mode" },
        thumb: {
          children: <Moon />,
        },
      }}
      sx={{
        "--Switch-thumbSize": "16px",
      }}
    />
  );
};

export default ModeToggle;
