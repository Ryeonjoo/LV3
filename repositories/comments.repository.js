const { Comments } = require("../models");

class CommentRepository {
  //전체 댓글 조회
  findAllComment = async () => {
    return await Comments.findAll();
  };

  //댓글 작성
  create = async (nickname, postId, content) => {
    return await Comments.create({
      nickname,
      postId,
      content,
    });
  };

  //댓글 수정
  updateComment = async ({ postId, nickname, title, content }) => {
    return await Comments.update(
      { title, content },
      {
        where: {
          [op.and]: [{ postId }, { nickname: nickname }], //op.and 다시 찾아보기 다시까먹.
        },
      }
    );
  };

  //댓글 삭제
  deleteComment = async ({ postId }) => {
    return await Comments.destroy({ where: { postId } });
  };
}

module.exports = CommentRepository;
