// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/news";

export const fetchNews = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
