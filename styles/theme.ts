export interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  completed: string;
  pending: string;
}

export const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  cardBackground: "#f5f5f5",
  completed: "green",
  pending: "red",
};

export const darkTheme: Theme = {
  background: "#3A3A3A",
  text: "#F5F5F5",
  cardBackground: "#1e1e1e",
  completed: "#66BB6A",
  pending: "#FF6F61",
};
