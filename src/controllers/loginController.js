const express = require("express");
const router = express.Router();
const registrasiRepository = require("../repository/registrasiRepository");
const defaultBaseResponse = require("../common/baseResponse/defaultBaseResponse");
const { StatusCodes } = require("http-status-codes");
const { checkPassword } = require("../common/utils/securityUtils");
const { generateToken } = require("../common/utils/jwtUtils");

class loginController {
  async login(req, res) {
    const { Email, Password } = req.body;

    // Perbaiki kondisi pengecekan input
    if (!Email || !Password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          defaultBaseResponse(
            StatusCodes.BAD_REQUEST,
            false,
            "Email & Password harus disediakan"
          )
        );
    }

    try {
      const loginAttempTime = new Date();
      console.log(`Login attempt at: ${loginAttempTime.toISOString()}`);

      // Pastikan variabel 'pelanggan' telah didefinisikan sebelum digunakan
      const register = await registrasiRepository.getByEmail(Email);
      if (!register) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(
            defaultBaseResponse(
              StatusCodes.NOT_FOUND,
              false,
              "register tidak ditemukan"
            )
          );
      }

      if (!Password) {
        console.log(`Password tidak ditemukan untuk email: ${Email}`);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            defaultBaseResponse(
              StatusCodes.INTERNAL_SERVER_ERROR,
              false,
              "Password tidak ditemukan, Silahkan Coba Lagi"
            )
          );
      }

      console.log("email yang di masukan: ", Email);
      console.log("Password yang dimasukkan: ", Password);
      console.log("Hash password dari database: ", register.Password);

      const hashedPasswordFromDB = register.Password;

      // Validasi kata sandi
      const isPasswordValid = await checkPassword(
        Password,
        hashedPasswordFromDB
      );
      console.log("Apakah password valid?", isPasswordValid);

      if (!isPasswordValid) {
        console.warn(`Login Failed: Incorrect password for email - ${Email}`);
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            defaultBaseResponse(
              StatusCodes.UNAUTHORIZED,
              null,
              "Kata sandi salah"
            )
          );
      }

      const accessToken = generateToken(register.RegisterID);
      await pelangganRepository.UpdateAccessToken(
        register.RegisterID,
        accessToken
      );

      // Respon berhasil login
      res.status(StatusCodes.OK).json(
        defaultBaseResponse(StatusCodes.OK, true, "Login Successfully", {
          RegisterID: register.RegisterID,
          Username: register.UserName,
          Role: register.Role,
          Email: register.Email,
          AccessToken: accessToken,
        })
      );
    } catch (error) {
      console.log("Error during login: ", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          defaultBaseResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            "An error occurred"
          )
        );
    }
  }
}

const LoginController = new loginController();

// Router
router.post("/login", LoginController.login.bind(LoginController));

module.exports = router;
