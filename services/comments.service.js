//리포지토리 모듈 호출
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  //findAllpost, createPost
  findAllComment = async () => {
    //리포지토리 에서 데이터를 요청함
    const allComment = await this.commentRepository.findAllComment();

    //호출한 post들을 가장 최신 게시글부터 정렬
    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    //비즈니스 로직을 수행한 수 사용자에게 보여줄 데이터를 가공
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

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  createPost = async (nickname, password, title, content) => {
    //리포지토리에게 데이터 요청
    const createPostData = await this.postRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    //비즈니스 로직을 수행한 수 사용자에게 보여줄 데이터를 가공한다
    return {
      postId: createPostData.null,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (postId, password, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.updatePost(postId, password, title, content);

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

  deletePost = async (postId, password) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deletePost(postId, password);

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

module.exports = PostService;