// 格式化日期
export const formatDate = (dateString: string, locale: string = 'zh-CN'): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// 截断文本，保留指定长度
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// 生成随机 ID
export const generateId = (prefix: string = ''): string => {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
};

// 防抖函数
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number = 300
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<F>): void {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// 节流函数
export function throttle<F extends (...args: any[]) => any>(
  func: F,
  limit: number = 300
): (...args: Parameters<F>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<F>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 安全获取嵌套属性
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
  try {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
      if (result === undefined || result === null) return defaultValue;
      result = result[key];
    }

    return (result === undefined || result === null) ? defaultValue : result;
  } catch (error) {
    console.error('Error getting nested value:', error);
    return defaultValue;
  }
}

// URL 工具函数
export const urlUtils = {
  // 添加 URL 参数
  addParams: (url: string, params: Record<string, string>): string => {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://aitolife.net');
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
    return urlObj.toString();
  },
  
  // 获取 URL 参数
  getParam: (name: string, url?: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const urlString = url || window.location.href;
    const urlObj = new URL(urlString);
    return urlObj.searchParams.get(name);
  }
}; 