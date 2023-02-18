export const getLocalStorage = (key) => {
  if (typeof window === "undefined") return;
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const setLocalStorageData = (key, data) => {
  if (typeof window === "undefined") return;
  const strData = typeof data === "string" ? data : JSON.stringify(data);
  return localStorage.setItem(key, strData);
};

export const removeLocalStorageData = (key) => {
  if (typeof window === "undefined") return;
  return localStorage.removeItem(key);
};
