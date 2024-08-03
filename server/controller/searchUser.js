const UserModel = require("../models/UserModel");

async function searchUser(request, response) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    "https://chat-app-03-deploy-vercel.vercel.app"
  );
  try {
    const { search } = request.body;

    const query = new RegExp(search, "i", "g");

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return response.json({
      message: "all user",
      data: user,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = searchUser;
