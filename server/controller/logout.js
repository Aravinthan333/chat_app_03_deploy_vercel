async function logout(request, response) {
  response.setHeader(
    "Access-Control-Allow-Origin",
    "https://chat-app-03-deploy-vercel.vercel.app"
  );
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return response.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
