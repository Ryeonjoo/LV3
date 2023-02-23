//리포에서 sequelize를 통해서 Users테이블에 접근을 하기 위해서 사용하는거
const { Users } = require("../models");

class UserRepository {
  
  //회원가입 리포, 회원 생성
  createSignup = async (nickname, password) => {
    return await Users.create({ nickname, password });
  };

  //로그인 리포
  //닉넴,비번
  createLogin = async (nickname, password) => {
    return await Users.findOne({ where: { nickname, password } });
  };
}
// findUser = async ({ nickname }) => {
//   const user = await Users.findOne({
//   where: {
//   nickname
//   }
//   });
//   return user;
//   };

module.exports = UserRepository;

//unit test(단위테스트),가짜 저장소?
//저장소 계층은 데이터저장소를 간단히 추상화 한것. 모델계층과 데이터 계층 분리가능
//add추가 get조회 사용방법

 //add, get

  //회원가입 리포
  //해당 유저 데이터 존재 여부(닉넴만)
  // findSignupById = async (nickname) => {
  //   const signupData = await Users.findByPk(nickname); //findByPk:프라이머리키로 조회하는 함수

  //   return signupData;
  // };