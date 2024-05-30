const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const itemsRouter = require("./routes/itemsRoutes");
const app = express();

// middleware
const corsOption = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", authRouter);
app.use("/item", itemsRouter);

// Global error handling
app.use((err, req, res, next) => {
  err.statuCode = err.statuCode || 500;
  err.status = err.status || "error";

  res.status(err.statuCode).json({
    status: err.status,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Servr Check");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server Listening on " + PORT);
});
