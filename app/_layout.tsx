import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerTitle: "Task Manager" }}>
      <Stack.Screen name="index" options={{ title: "Task List" }} />
    </Stack>
    </ThemeProvider>
  );
}
