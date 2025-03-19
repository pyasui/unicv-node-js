const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Usuário registrado com sucesso!", userId: user.id });
    } catch (error) {
        console.log("Error: Create User", error);
        res.status(500).json({ message: "Erro ao registrar usuário", error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Senha inválida" });
        }

        const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        res.json({
            data: {
                user: {
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer login" });
    }
};

exports.me = async (req, res) => {


    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token)
            return res.status(401).json();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded?.email;

        if (!email)
            return res.status(401).json();

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const userWithoutPassword = { ...user.toJSON() };
        delete userWithoutPassword.password;

        res.json({
            data: {
                user: userWithoutPassword
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
};
