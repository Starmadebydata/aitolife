// 客户端本地存储缓存工具

// 缓存数据到 localStorage
export const cacheData = <T>(key: string, data: T, ttl: number = 3600): void => {
  if (typeof window === 'undefined') return;

  try {
    const now = new Date();
    const item = {
      value: data,
      expiry: now.getTime() + ttl * 1000,
    };
    localStorage.setItem(`aitolife_${key}`, JSON.stringify(item));
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

// 从 localStorage 获取缓存数据
export const getCachedData = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const itemStr = localStorage.getItem(`aitolife_${key}`);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(`aitolife_${key}`);
      return null;
    }
    
    return item.value as T;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

// 从 localStorage 移除缓存数据
export const removeCachedData = (key: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`aitolife_${key}`);
  } catch (error) {
    console.error('Error removing cached data:', error);
  }
};

// 清除所有 aitolife 缓存数据
export const clearAllCachedData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('aitolife_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing all cached data:', error);
  }
}; 