import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { PostResponseDto } from './dto/post-response.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPosts() {
    const posts = await this.postRepository.findPosts();
    return posts.map((post) =>
      PostResponseDto.from(post.id, post.title, post.content),
    );
  }

  async getPostById(postId: number) {
    const post = await this.postRepository.findPostById(postId);
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    const { id, title, content } = post;
    return PostResponseDto.from(id, title, content);
  }

  async createPost(postEntity: PostEntity) {
    return await this.postRepository.createPost(postEntity);
  }

  async deletePostById(postId: number) {
    return await this.postRepository.deletePostById(postId);
  }
}
