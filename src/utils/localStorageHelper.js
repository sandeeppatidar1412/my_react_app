const STORAGE_KEY = "crud_records";

export function getProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to read local storage", error);
    return [];
  }
}

export function saveProducts(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
}
