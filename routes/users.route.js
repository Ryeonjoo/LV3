const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const router = express.Router();
const usersController = require("../controllers/users.controller.js");
const UserController = new usersController();

//^:시작 $:종료
const re_nickname = /^[a-zA-Z0-9]{3,}$/; 
const re_password = /^[a-zA-Z0-9]{4,}$/;


router.post("/signup", UserController.createSignup)
router.post("/login", UserController.createLogin)

module.exports = router;


//회원가입 API
//[a-zA-Z0-9]{3,} //{4,}
//닉넴,비번,비번확인--req
//비번=비번확인
//닉넴 중복 확인, 에러 출력


// router.post("/signup", async (req, res) => {
//     const { nickname, password, confirm } = req.body;

//     try {
//     //동일한 닉넴 있는지 확인
//     const isExistUser = await Users.findOne({
//         where: { nickname: nickname } //닉넴이 닉넴에 해당하는가
//     });
 
//     //동일한 닉넴 존재시
//     if (isExistUser) {
//         return res.status(412).json({ message: "이미 존재하는 닉네임입니다." });
//     }
//     //닉넴과 형식 불일치
//     if (nickname.search(re_nickname) === -1) {
//         return res.status(412).json({ message: "닉네임의 형식이 일치하지 않습니다."});
//     }
//     //비번 불일치
//     if (password !== confirm) {
//         return res.status(412).json({ message: "패스워드가 일치하지 않습니다."});
//     }
//     //비번 형식 불일치
//     if (password.search(re_password) === -1) {
//         return res.status(412).json({ message: "패스워드 형식이 일치하지 않습니다."})
//     }
//     //@@@@@@@@@ 비번에 닉넴 포함
    
//     //사용자 테이블에 데이터 삽입, 유저생성
//     const user = await Users.create({ nickname, password });
//     return res.status(201).json({ message: "회원가입이 완료되었습니다." });
// } //@@@@@@@@@ catch문 다시 보기 
// catch (error) {
//     return res.status(400).json({ message: "요청한 데이터 형식이 올바르지 않습니다. "});
// }
// });




//로그인 API
//닉넴,비번--req
//@@@@@@@@@@@@@@@@ 로그인 시 닉넴,비번 db확인후 에러
//로그인 성공시 jwt 클라 쿠키전달
// router.post("/login", async (req, res) => {
//     const { nickname, password } = req.body;
//     const user = await Users.findOne({
//         where: { nickname }
//     });

//     //1. 해당하는 사용자가 존재하는가
//     //2. 해당하는 사용자의 비번이 존재하는가
//     if (!user) {
//         return res.status(401).json({ message: "해당하는 사용자가 존재하지 않습니다." });
//     } else if (user.password !== password) {
//         return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
//     }

//     //1. jwt 발급
//     const token = jwt.sign({
//         userId: user.userId
//     }, "customized_secret_key");
//     //2. 쿠키 발급(authorization이란 쿠키발급)
//     res.cookie("authorization", `Bearer ${token}`);
//     //3. reponse에 할당
//     return res.status(200).json({ message: "로그인에 성공하였습니다." });

// });












