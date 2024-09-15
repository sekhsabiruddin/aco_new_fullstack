const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const newsRoutes = require("./controller/news");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/news", newsRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
