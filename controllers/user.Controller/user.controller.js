const User = require("../../models/User.Model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const {name, login, password } = req.body;
      const hash = await bcrypt.hash(
        password.toString(),
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        name: name,
        login: login,
        password: hash,
      });
      if (!name) {
        return res.json({
          error: "Имя не найдено",
        });
      }
      if (!login) {
        return res.json({
          error: "login не найден",
        });
      }
      if (!password) {
        return res.json({
          error: "password не найден",
        });
      }
      await res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: "Ошибка при регистрации" + e.toString(),
      });
    }
  },

  logIn: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json({
        error: 'Неверный данные (login)'
      });
    }

    const valid = await bcrypt.compare(password.toString(), candidate.password);
    if (!valid) {
      return res.status(401).json({
        error: 'Неверный данные (password)'
      });
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    res.json({
      token: token,
    });
  },
};
