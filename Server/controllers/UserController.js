const randToken = require("rand-token");
const bcrypt = require("bcrypt");
const userModelMethods = require("../methods/UserModelMethods");

const UserController = {
    register: async (req, res) => {
        const email = req.body.email.toLowerCase();
        const user = await userModelMethods.getUser(email);
        if (user) res.status(409).send("Email đã tồn tại!");
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS, 10));
            const newUser = {
                name: req.body.name,
                email: email,
                password: hashedPassword,
                moneySpent: 0
            };
            const createUser = await userModelMethods.createUser(newUser);
            if (!createUser) {
                return res.status(400).send("Có lỗi trong quá trình tạo tài khoản!");
            }
            return res.send({
                email,
            });
        }
    },

    login: async (req, res) => {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await userModelMethods.getUser(email);
        if (!user) {
            console.log("Tai khoan khong ton tai!");
            return res.status(401).send("Tài khoản không tồn tại!");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log("Mat khau khong chinh xac!");
            return res.status(401).send("Mật khẩu không chính xác!");
        }

        return res.json({
            //msg: "Đăng nhập thành công",
            user
        });
    },

};

module.exports = UserController;