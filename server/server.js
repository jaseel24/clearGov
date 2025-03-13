const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/user");
const tenderRoute = require("./routes/tender");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/adminRoutes");
const govauthRoute = require("./routes/govauth");
const contractorRoute = require("./routes/contractor");
const dbConnect = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

dbConnect();

app.use("/user", userRoute);
app.use("/tender", tenderRoute);
app.use("/contractor", contractorRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/govauth", govauthRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

