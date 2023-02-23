//리포지토리 모듈 호출
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  
  //댓글 전체 조회
  findAllComment = async () => {
    
    const allComment = await this.commentRepository.findAllComment();

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }; //map결과값->배열
    });  //이 데이터들을 가공해서 컨트롤러에게 전달하기 위해 사용
  };

  //댓글 작성
  create = async (nickname, postId, content) => {
    //리포지토리에게 데이터 요청
    const createData = await this.postRepository.create(
      nickname,
      postId,
      content
    );

    return {
      postId: createData.null, //@@@
      nickname: createData.nickname,
      content: createData.content,
    };
  };

  //댓글 수정
  updateComment = async (postId, password, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.updateComment(postId, password, title, content);

    const updatePost = await this.postRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
  };

  //댓글 삭제
  deleteComment = async (postId, password) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deleteComment(postId, password);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };
}

module.exports = CommentService;