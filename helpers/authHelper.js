import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export const jwtDecode = async(token) => {
    try {
        const value = JWT.verify(token, process.env.JWT_SECRET);
        return {
            success: true,
            value
        };
    } catch (error) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }
}