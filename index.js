const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user_routes");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
