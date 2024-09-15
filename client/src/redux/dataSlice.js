import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  news: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("data/fetchNews", async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/news/get-all");
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
});

export const filterData = createAsyncThunk(
  "data/filterData",
  async ({ category }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/news/top-headlines",
        {
          params: {
            category,
          },
        }
      );
      return response.data.articles;
    } catch (error) {
      console.error("Error fetching filtered news:", error);
      throw error;
    }
  }
);

export const searchData = createAsyncThunk("data/searchData", async ({ q }) => {
  try {
    const response = await axios.get("http://localhost:8080/api/news/search", {
      params: {
        q,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(filterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(filterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(searchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(searchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
