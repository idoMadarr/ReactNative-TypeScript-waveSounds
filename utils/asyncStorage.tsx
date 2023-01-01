import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (name: string, payload: unknown) => {
  const data = JSON.stringify(payload);
  await AsyncStorage.setItem(name, data);
};

export const getFromStorage = async (name: string) => {
  const data: string | null = await AsyncStorage.getItem(name);
  if (data) return JSON.parse(data);
};

export const clearStorage = async () => {
  const keys = ['userSession'];
  await AsyncStorage.multiRemove(keys);
};
