// app/components/theme-switcher.tsx
"use client";

import { Button, Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();
  console.log("resolvedTheme", resolvedTheme)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // const activeTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = resolvedTheme == "dark"
  const handleThemeChange = (isSelected) => {
    setTheme(isSelected ? "dark" : "light")
  }

  return (
    <Switch
      size="md"
      isSelected={isDark}
      onChange={handleThemeChange}
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon className="">
              {
                  isDark ? (<FaMoon size="lg"/>) 
                  : (<FaSun size="lg" />)
              }
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}