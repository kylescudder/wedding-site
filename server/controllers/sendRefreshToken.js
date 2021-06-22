function sendRefreshToken(res, token) {
  return res.cookie(
    "jid",
    token,
    {
      httpOnly: true
    }
  );
}
exports.sendRefreshToken = sendRefreshToken;
