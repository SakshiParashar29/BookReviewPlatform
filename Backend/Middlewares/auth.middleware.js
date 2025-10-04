import User from "../Models/UserModel.js";
import ApiResponse from '../Utils/ApiResponse.js'
import ApiError from '../Utils/ApiError.js'
import { verifyToken } from "../Utils/jwt.utils.js";

export const authMiddleware = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if(!token)
            return next(new ApiError(401, "Authorization denied!!"));

        const decode = verifyToken(token);

        const user = await User.findById(decode.id).select("-password");
        if(!user)
            return next(new ApiError(404, "User not found"));
        
        req.user = user
        next();
    } catch (err) {
        return next(new ApiError(403, "Invalid or expired token"));
    }
}