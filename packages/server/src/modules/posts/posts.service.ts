import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { PostResponse } from './dto/post-response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPosts() {
    const posts = await this.postsRepository.findPosts();
    return posts.map((post) =>
      PostResponse.from(post.id, post.title, post.content),
    );
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    const { id, title, content } = post;
    return PostResponse.from(id, title, content);
  }

  async createPost(Post: Post) {
    return await this.postsRepository.createPost(Post);
  }

  async deletePostById(postId: number) {
    return await this.postsRepository.deletePostById(postId);
  }
}
