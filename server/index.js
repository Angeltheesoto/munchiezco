const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  // "http://localhost:3000",
  // "https://munchiezco-client.vercel.app",
  // "https://munchiezco-client.vercel.app/",
  "www.munchiezco.com/",
  // "https://www.munchiezco.com/",
];

connectDB();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // callback(new Error("Not allowed by CORS"));
        console.error({ error: "Not allowed by CORS" });
        callback(null, false);
      }
    },
    optionsSuccessStatus: 204,
  })
);

// paths

// pass as a function
const productRoutes = require("./routes/products.js");

// Dont pass as a function.
const billingRoutes = require("./routes/billing.js");

// routes
app.get("/", (req, res) => {
  res.send("Server is live!");
});
app.use("/api/products", productRoutes());
app.use("/billing", billingRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
