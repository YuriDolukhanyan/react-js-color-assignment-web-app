import { GOOGLE_SHEET_URL } from "../constants/googleSheetUrl";

const fetchColors = async () => {
  return fetch(GOOGLE_SHEET_URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error("Error fetching colors:", err));
};

const getRandomColor = async (name) => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify({ name }),
      contentType: "application/json",
    });

    const data = await response.json();
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

export { fetchColors, getRandomColor, resetColors };
