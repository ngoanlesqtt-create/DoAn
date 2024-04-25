
const userModel = require("../models/UserModel");

const UserModelMethods = {
    getUser: async (email) => {
        try {
            const user = await userModel.findOne({email: email}).exec();
            return user;
        } catch (error) {
            console.error("getUser Error: ", error);
            return null;
        }
    },

    createUser: async (userData) => {
        try {
            const user = new userModel(userData);
            await user.save();
            return user;
        } catch (error) {
            console.error("createUser Error: ", error);
            return false;
        }
    },

};

module.exports = UserModelMethods;
