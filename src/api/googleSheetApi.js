import { GOOGLE_SHEET_URL } from "../constants/googleSheetUrl";
import { StorageService } from "../services/StorageService";
import { USER_STORAGE_KEY } from "../constants/storageKeys";

const fetchColors = async () => {
  return fetch(GOOGLE_SHEET_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error("Error fetching colors:", err));
};

const fetchParticipants = async () => {
  try {
    const response = await fetch(`${GOOGLE_SHEET_URL}?type=participants`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch participants:", err);
    return [];
  }
};

const getRandomColor = async (name) => {
  const hasParticipated = StorageService.getItem(USER_STORAGE_KEY);
  if (hasParticipated) return;

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify({ name }),
      contentType: "application/json",
    });

    const data = await response.json();
    StorageService.setItem(USER_STORAGE_KEY, 1);
    return data;
  } catch (err) {
    console.error("Failed to access Google Sheet:", err);
    throw err;
  }
};

const resetColors = async () => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify({ action: "reset" }),
      contentType: "application/json",
    });

    const data = await response.json();
    console.log("Google Sheet reset:", data.message);
    return data;
  } catch (err) {
    console.error("Failed to reset Google Sheet:", err);
    throw err;
  }
};

export { fetchColors, fetchParticipants, getRandomColor, resetColors };
