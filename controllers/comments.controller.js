const CommentsService = require('../services/comments.service');

//Post의 컨트롤러 역할을 하는 클래스
class CommentsController {
  commentService = new CommentsService(); //Post서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당한다.

  //댓글 목록 조회
  //작성날짜 기준 내림차순
  getComments = async (req, res, next) => {
    //서비스 계층에 구현된 findAllPost 로직을 실행한다.
    const comments = await this.commentService.findAllComment();
    // allComment.sort((a, b) => {
    //     return b.createdAt - a.createdAt;
    //   });
  

    res.status(200).json({ data: comments });
  };


  //댓글 작성
  //로그인 토큰검사
  addComment = async (req, res, next) => {
    const { nickname, postId, content } = req.body;
    //서비스 계층에 구현된 createPost로직을 실행한다.
    const result = await this.commentService.create(
      nickname,
      postId,
      content
    );

    res.status(201).json({ data: result });
  };

  //댓글 수정
  //로그인 토큰검사
  updateComment = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updateComment = await this.commentService.updateComment(
      postId,
      title,
      content
    );

    res.status(200).json({ data: updateComment });
  };

  //댓글 삭제
  //로그인 토큰 검사
  deleteComment = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const deleteComment = await this.commentService.deleteComment(
        postId, 
        title, 
        content
        );

    res.status(200).json({ data: deleteComment });
  };
}

module.exports = CommentsController;