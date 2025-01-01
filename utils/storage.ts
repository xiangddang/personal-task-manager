import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to load data for key: ${key}`, error);
    return null;
  }
};

export const saveToStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save data for key: ${key}`, error);
  }
};
