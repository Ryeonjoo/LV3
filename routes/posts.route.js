const express = require("express");
const { Posts } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const postsController = require("../controllers/posts.controller.js");
const PostController =new postsController();

router.get("/posts", PostController.getPosts);
router.get("/posts/:postId", PostController.getPost);
router.post("/posts", PostController.addPost);
router.put("/posts/:postId", PostController.updatePost);
router.delete("/posts/:postId", PostController.deletePost);

module.exports = router;


// //게시글 생성 API
// //토큰검사, 유효토큰일 경우만 작성
// router.post("/posts", authMiddleware, async (req, res) => {
 

//   const { nickname } = res.locals.user;
//   const { title, content } = req.body;

//   const post = await Posts.create({
//     nickname: nickname,
//     title,
//     content,
//   });

//   return res.status(201).json({ data: post });
// });

// //전체 게시글 목록 조회API
// //제목,작성자명,작성날짜 조회
// //내림차순 조회
// router.get("/posts", async (req, res) => {
//   const posts = await Posts.findAll({
//     attributes: ["nickname", "title", "createdAt"],
//     order: [("createdAt", "DESC")],
//   });

//   return res.status(200).json({ date: posts });
// });

// //게시글 조회 API
// //제목, 작성자명,작성날짜, 작성내용 조회
// router.get("/posts/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const post = await Posts.findOne({
//     attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
//     where: { postId },
//   });

//   return res.status(200).json({ data: post });
// });

// //게시글 수정 API
// //토큰 검사후 해당 사용자만 수정
// //@@@@@@@@@@@ middleware-next??
// router.put("/posts/:postId", authMiddleware, async (req, res) => {
//   const { postId } = req.params;
//   const { nickname } = res.locals.user;
//   const { title, content } = req.body;

//   //게시글 조회 findOne-->존재여부
//   const post = await Posts.findOne({ where: { postId } });

//   if (!post) {
//     return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
//   } else if (post.nickname !== nickname) {
//     return res.status(401).json({ message: "권한이 없습니다." });
//   }

//   //게시글 권한 확인 후 게시글 수정하기
//   await Posts.update(
//     { title, content },
//     {
//       where: {
//         [Op.and]: [{ postId }, { nickname: nickname }],
//       },
//     }
//   );
//   return res.status(200).json({ message: "게시글이 수정되었습니다." });
// });



// //게시글 삭제 API
// //토큰 검사 후 해당 사용자만 삭제
// router.delete("/posts/:postId", authMiddleware, async(req, res) => {
//     const { postId } = req.params;
//     const { nickname } = res.locals.user;

//     //게시글 조회 findOne-->존재여부
//     const post = await Posts.findOne({ where: { postId } });

//     if (!post) {
//         return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
//     } else if (post.nickname !== nickname) {
//         return res.status(401).json({ message: "권한이 없습니다." });
//     }

//     //게시글의 권한 확인 후 게시글 삭제하기
//     await Posts.destroy({
//         where: {
//             [Op.and]: [{ postId }, { nickname: nickname }],
//         }
//     });
//     return res.status(200).json({ message: "게시글이 삭제되었습니다." });
// });


