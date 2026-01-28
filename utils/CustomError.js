class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    // console.log("Email : ", statusCode);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default CustomError;
