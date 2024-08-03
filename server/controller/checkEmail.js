const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    "https://chat-app-03-deploy-vercel-pvdm-a0dvo2aqa.vercel.app"
  );

  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: "Email field is required",
        error: true,
      });
    }

    const checkEmail = await UserModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return response.status(400).json({
        message: "user not exit",
        error: true,
      });
    }

    return response.status(200).json({
      message: "email verify",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
