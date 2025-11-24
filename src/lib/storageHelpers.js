//ayuda a guardar y cargar datos del localStorage
export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const loadFromStorage = (key, defaultValue = []) => {
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
}
