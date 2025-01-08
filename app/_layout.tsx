import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack >
      <Stack.Screen name="index" options={{ title: "Task List" }} />
      <Stack.Screen name="task/[id]" options={{ title: "Task Screen" }} />
    </Stack>
    </ThemeProvider>
  );
}
