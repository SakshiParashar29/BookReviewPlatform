import ApiError from '../Utils/ApiError.js'

export const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data : err.data || null,
        });
    }
    res.status(500).json({success: false, message: "Server Error", data: null});
}