import User from '../Models/UserModel.js'
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { hashPassword, comparePassword } from '../Utils/password.utils.js';
import  {generateToken} from '../Utils/jwt.utils.js';

// Sign In
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError(400, "Email and password are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        const token = generateToken({ id: user._id });

        return res.status(200).json(
            new ApiResponse(200, "SignIn successful", { token, user })
        );
    } catch (err) {
        next(err);
    }
};

// Sign Up
export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(new ApiError(400, "All fields are required"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError(409, "Email already registered"));
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(
            new ApiResponse(201, "SignUp successful", { user })
        );
    } catch (err) {
        next(err);
    }
};
