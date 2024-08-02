const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const route = require("./routes/routes.js");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");

// const app = express();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     origin: 'https://social-chat-app-001.netlify.app',
//   optionsSuccessStatus: 200,
//     // origin: "*",
//     credentials: true,
//   })
// );

const corsOptions = {
  origin: "https://social-chat-app-001.netlify.app",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.options("/api/password", cors(corsOptions));
app.options("/api/register", cors(corsOptions));
app.options("/api/email", cors(corsOptions));
app.options("/api/user-details", cors(corsOptions));
app.options("/api/logout", cors(corsOptions));
app.options("/api/update-user", cors(corsOptions));
app.options("/api/serach-user", cors(corsOptions));

// app.use(cors);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server running at " + PORT,
  });
});

// Routes
app.use("/api", route);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
