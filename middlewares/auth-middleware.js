const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
    //이런형태의 req.cookies전달받을수 있도록 하기위해 cookieParser(app.js 2줄)를 전역미들웨어에 등록해야 사용가능
    const { authorization } = req.cookies;
    const [tokenType, token] = authorization.split(" ") //배열형태
    if (tokenType !== "Bearer" || !token) {
        return res.status(401).json({ "message": "토큰 타입이 일치하지 않거나, 토큰이 존재하지 않습니다." });

    }
    try {
        const decodedToken = jwt.verify(token, "customized_secret_key");
        const userId = decodedToken.userId;

        const user = await Users.findOne({ where: { userId } }); //몽구스의 사용자 인증미들웨어랑 다른부분은 여기뿐일듯!
        if (!user) {
            return res.status(401).json({ "message": "토큰에 해당하는 사용자가 존재하지 않습니다." });
        }

        res.locals.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "비정상적인 접근입니다."
        });
    }

}
