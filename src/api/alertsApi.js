import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/alerts`;

export const getRecentAlerts = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
  });

  return response.data;
};
