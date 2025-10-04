class ApiError{
    constructor(statusCode, message, data = null, success = false){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    };
};

export default ApiError;