export interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  completed: string;
  pending: string;
  placeholder: string;
  inputBackground: string;
  dropdownBackground: string;
  border: string;
  trash: string;
}

export const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  cardBackground: "#f5f5f5",
  completed: "#004290",
  pending: "#FE6229",
  placeholder: "#888",
  inputBackground: "#f9f9f9",
  dropdownBackground: "#f9f9f9",
  border: "#ccc",
  trash: "rgb(169, 169, 169)"
};

export const darkTheme: Theme = {
  background: "#121212",
  text: "#E0E0E0",
  cardBackground: "#1e1e1e",
  inputBackground: "#333",
  dropdownBackground: "#333",
  completed: "#007AFF",
  pending: "#FD8227",
  placeholder: "#aaa",
  border: "#555",
  trash: "rgb(128, 128, 128)"
};
