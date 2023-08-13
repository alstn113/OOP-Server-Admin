import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostResponseDto } from './dto/post-response.dto';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getPosts() {
    const posts = await this.postsRepository.findPosts();
    return posts.map((post) =>
      PostResponseDto.from(post.id, post.title, post.content),
    );
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    const { id, title, content } = post;
    return PostResponseDto.from(id, title, content);
  }

  async createPost(dto: CreatePostRequestDto, userId: number) {
    const userEntity = await this.usersService.getUserByIdOrThrow(userId);
    const postEntity = dto.toPostEntity(userEntity);
    return await this.postsRepository.createPost(postEntity);
  }

  async deletePostById(postId: number, userId: number) {
    return await this.postsRepository.deletePostById(postId);
  }
}
