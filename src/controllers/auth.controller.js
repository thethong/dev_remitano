import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import JWT from "../libs/jwt.js";

class AuthController {
  async loginOrRegister(req, res) {
    try {
      const userName = req.body.user_name;
      const password = req.body.password;

      const userModel = new UserModel();
      const rsUser = await userModel.getUserByUserName(userName);

      if (rsUser.length) {
        // case: exits user ==> login
        // compare password from client and password in db
        const isPasswordValid = bcrypt.compareSync(
          password,
          rsUser[0].password
        );
        if (!isPasswordValid) {
          return res.status(401).json({
            error_message: `Input wrong password for user: ${userName}`,
          });
        }
      } else {
        // case: not exits user ==> register user
        // mã hóa password
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = {
          user_name: userName,
          password: hashPassword,
        };

        // insert new user to db
        await userModel.createUser(newUser);
      }

      ////////////Access Token//////////////
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      // chose user_name because user_name is the only one
      const dataForAccessToken = {
        user_name: userName,
      };

      // jwt
      const jwt = new JWT();

      // generate access_token
      const accessToken = await jwt.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );

      if (!accessToken) {
        return res.status(401).json({
          error_message: "Access Token can not generate.",
        });
      }

      // all ok
      return res.status(201).json({
        user_name: userName,
        access_token: accessToken,
      });
    } catch (err) {}
  }
}

export default AuthController;
