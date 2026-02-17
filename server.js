const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middlewares/loggerMiddleware");
const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorHandlingMiddleware");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);


app.get("/", (req, res) => {
  res.send("API Running...");
});
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
