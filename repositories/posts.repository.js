const { Posts } = require("../models");

class PostRepository {
  //전체 게시글 조회
  findAllPost = async () => {
    return await Posts.findAll();
  };

  //게시글 상세 조회
  findByPostId = async ({ postId }) => {
    const post = await Posts.findOne({
      where: { postId },
    });
    return post;
  };

  //게시글 생성
  create = async (title, content) => {
    return await Posts.create({
      title,
      content,
    });
  };

  //게시글 수정
  update = async ({ postId, nickname, title, content }) => {
    return await Posts.update(
      { title, content },
      {
        where: {
          [op.and]: [{ postId }, { nickname: nickname }], //op.and 다시 찾아보기 다시까먹.
        },
      }
    );
  };

  //게시글 삭제
  delete = async ({ postId }) => {
    return await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostRepository;
