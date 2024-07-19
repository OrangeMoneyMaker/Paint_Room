class ApiError extends Error{
    status: number;
    errors: Array<any>;
    constructor(status, message, errors = []){
        super(message);
        this.status = status,
        this.errors = errors
    }

    static UnauthorizedError(){
        return new ApiError(401, "User not Unauthorized");
    }

    static BadRequest(message, error = []){
        return new ApiError(400, message, error)
    }
}

export default ApiError;