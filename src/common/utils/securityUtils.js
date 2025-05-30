const bcrypt = require("bcrypt");

const hashPassword = async (Password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);
        return hashedPassword
    } catch (error) {
        throw new Error("Gagal menekripsi password: " + error.message);
    }
};

const checkPassword = async (Password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(Password, hashedPassword)
        return isMatch
    } catch (error) {
        throw new Error("gagal memverifikasi password");
    }
}

module.exports = { hashPassword, checkPassword }