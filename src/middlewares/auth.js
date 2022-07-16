import JWT from "../libs/jwt.js";

export default async function isAuth (req, res, next) {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

  // jwt
  const jwt = new JWT();

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await jwt.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

  // save payload to req
	req.payload = verified.payload;

	return next();
}
