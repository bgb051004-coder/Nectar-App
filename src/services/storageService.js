import AsyncStorage from '@react-native-async-storage/async-storage';

// Các Key để định danh dữ liệu
const STORAGE_KEYS = {
  USER_DATA: '@user_data',
  AUTH_TOKEN: '@auth_token',
};

const storageService = {
  // 1. Lưu thông tin đăng nhập (User và Token)
  saveLoginData: async (user, token) => {
    try {
      const userData = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, userData);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      console.log('Login data saved successfully');
    } catch (error) {
      console.error('Error saving login data:', error);
    }
  },

  // 2. Lấy dữ liệu người dùng (Dùng cho Auto Login)
  getLoginData: async () => {
    try {
      const userJSON = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      
      return {
        user: userJSON != null ? JSON.parse(userJSON) : null,
        token: token,
      };
    } catch (error) {
      console.error('Error getting login data:', error);
      return { user: null, token: null };
    }
  },

  // 3. Xóa dữ liệu khi Logout
  clearLoginData: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      // Hoặc dùng AsyncStorage.clear() nếu muốn xóa sạch mọi thứ trong app
      console.log('Login data cleared');
    } catch (error) {
      console.error('Error clearing login data:', error);
    }
  },
};

export default storageService;