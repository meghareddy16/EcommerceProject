const {constants} = require("../constants");
const errorHandler = (err, req, res, next)=> {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Error", message:err.message, stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED_ERROR:
            res.json({title:"Unauthorized Error", message:err.message, stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden", message:err.message, stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found ", message:err.message, stackTrace:err.stack});
            break;
        default:
            console.log("All Good");
            break;

    }

    res.json({message: err.message, stackTrace: err.stack});
};

module.exports = errorHandler;