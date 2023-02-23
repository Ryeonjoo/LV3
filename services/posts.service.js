//리포지토리 모듈 호출
const PostRepository = require('../repositories/posts.repository');
const UserRepository = require('../repositories/users.repository');

class PostService {
  postRepository = new PostRepository();

  //전체 게시글 목록 조회
  getPostList = async () => {
    //리포지토리 에서 데이터를 요청함
    const allPost = await this.postRepository.findAllPost();

    //호출한 post들을 가장 최신 게시글부터 정렬
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    //비즈니스 로직을 수행한 수 사용자에게 보여줄 데이터를 가공
    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }; //map결과값->배열
    });  //이 데이터들을 가공해서 컨트롤러에게 전달하기 위해 사용
  };

  //상세 게시글 조회
  getPost = async ({ postId }) => {
    const findPost = await this.postRepository.findPostById({ postId });

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  //게시글 생성
  createPost = async (title, content) => {
    //리포지토리에게 데이터 요청
    const createPostData = await this.postRepository.create(
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

  //게시글 수정 //@@@@다시
  updatePost = async ({ postId, password, title, content }) => {
    const findPost = await this.postRepository.findPostById({ postId });
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.updatePost(postId, password, title, content);

    const updatePost = await this.postRepository.update(postId);

    return {
      postId: updatePost.postId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
  };

  //게시글 삭제
  deletePost = async ({ postId, nickname }) => {
    const findPost = await this.postRepository.findPostById({ postId });
    if (!findPost) throw new Error("게시글 조회에 실패하였습니다.");

    await this.postRepository.delete({ postId });

    return { message: "게시글을 삭제하였습니다." };
  };
}

module.exports = PostService;