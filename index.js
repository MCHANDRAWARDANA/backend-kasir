const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./src/config/databaseConfig");
const pelangganRouter = require("./src/controllers/pelangganControllers");
const produkRouter = require("./src/controllers/produkControllers");
const penjualanRouter = require("./src/controllers/PenjualanController");
const detailpenjualanRouter = require("./src/controllers/detailpenjualanControllers");
const registrasiRouter = require("./src/controllers/registrasiController");
const kategoriRouter = require("./src/controllers/kategoriControllers");
const authRouter = require("./src/controllers/authController");
const loginRouter = require("./src/controllers/loginController");

const app = express();

const PORT = process.env.PORT || 3000;
const syncDb = process.env.DB_SYNC === "true"; // Ambil nilai DB_SYNC dari environment

app.use("/uploads", express.static("uploads"));
// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("Request dari origin:", req.headers.origin);
  next();
});

app.use(
  cors({
    origin: "https://mchandrawardana.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/pelanggan", pelangganRouter);
app.use("/produk", produkRouter);
app.use("/penjualan", penjualanRouter);
app.use("/detailpenjualan", detailpenjualanRouter);
app.use("/registrasi", registrasiRouter);
app.use("/kategori", kategoriRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);

// Sinkronisasi database dan memulai server
sequelize
  .sync() // Gunakan force dari environment
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server berjalan pada port ${PORT}`);
      if (syncDb) {
        console.log("Database sinkronisasi");
      } else {
        console.log("Database sinkronisasi tanpa force.");
      }
    });
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi database:", err);
  });

module.exports = app;
