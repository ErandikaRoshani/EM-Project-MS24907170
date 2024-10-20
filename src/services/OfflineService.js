import AsyncStorage from '@react-native-async-storage/async-storage';

const saveProgressOffline = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Saving failed", e);
  }
};

const getOfflineProgress = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log("Fetching failed", e);
  }
};

const syncWithBackend = async (key, data, backendSyncFunction) => {
  try {
    const offlineData = await getOfflineProgress(key);
    if (offlineData) {
      // Sync offline data with backend
      await backendSyncFunction(offlineData);
      // Clear offline data after syncing
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.log("Syncing failed", e);
  }
};

export { saveProgressOffline, getOfflineProgress, syncWithBackend };
