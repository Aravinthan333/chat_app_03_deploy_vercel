const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    "https://chat-app-03-deploy-vercel-pvdm-a0dvo2aqa.vercel.app"
  );
  try {
    const token = request.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    return response.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
