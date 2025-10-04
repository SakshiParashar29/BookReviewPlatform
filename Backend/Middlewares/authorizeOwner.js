import ApiError from "../Utils/ApiError.js"

export const authorizeOwner = (model, resourceField = "addedBy") => async(req, res, next) => {
    try {
        const resource = await model.findById(req.params.id);
        if(!resource)
            return next(new ApiError(404, "Resource not found!!"));

        if(resource[resourceField].toString() !== req.user._id.toString()){
            return next(new ApiError(403, "Authorization denied!!"));
        }
        next();
    } catch (err) {
        next(err);
    }
};