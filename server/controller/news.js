const express = require("express");
const axios = require("axios");
const router = express.Router();

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

router.get("/get-all", async (req, res) => {
  try {
    const response = await axios.get(process.env.GNEWS_API);
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch news data", error: error.message });
  }
});

router.get("/top-headlines", async (req, res) => {
  try {
    const { category, lang, country, page = 1, pageSize = 10 } = req.query;

    const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
      params: {
        category,
        lang,
        country,
        page,
        pageSize,
        apikey: GNEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch top headlines",
      error: error.response?.data || error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q, lang, country, page = 1, pageSize = 10 } = req.query;

    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q,
        lang,
        country,
        page,
        pageSize,
        apikey: GNEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search news",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
