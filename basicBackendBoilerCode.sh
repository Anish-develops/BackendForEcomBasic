#!/bin/bash
npm init -y
npm install express mongoose dotenv --save
npm install --save-dev nodemon

touch .env
mkdir src
cd src
touch app.js index.js
mkdir db utils routes models controllers
cd db

touch index.js
cd ..
cd utils
touch apiErrors.js apiResponse.js asyncHandler.js

cat > apiErrors.js <<EOF
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


export { ApiError };
EOF


cat > apiResponse.js <<EOF

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
EOF

cat > asyncHandler.js <<EOF
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
EOF


echo "everthing happend successfully"
