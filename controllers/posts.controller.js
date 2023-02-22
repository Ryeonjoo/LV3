const PostService = require('../services/posts.service');

//Post의 컨트롤러 역할을 하는 클래스
class PostsController {
  postService = new PostService(); //Post서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당한다.

  //게시판 목록 조회
  getPosts = async (req, res, next) => {
    //서비스 계층에 구현된 findAllPost 로직을 실행한다.
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  //게시판 상세 조회
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  //게시판 생성
  createPost = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;
    //서비스 계층에 구현된 createPost로직을 실행한다.
    const createPostData = await this.postService.createPost(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: createPostData });
  };

  //게시판 수정
  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { password, title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      password,
      title,
      content
    );

    res.status(200).json({ data: updatePost });
  };

  //게시판 삭제
  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { password } = req.body;

    const deletePost = await this.postService.deletePost(postId, password);

    res.status(200).json({ data: deletePost });
  };
}

module.exports = PostsController;