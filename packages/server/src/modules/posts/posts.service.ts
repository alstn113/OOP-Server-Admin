import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getPosts() {
    return await this.postsRepository.findPosts();
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    return post;
  }

  async createPost(dto: CreatePostRequestDto, userId: number) {
    const user = await this.usersService.getUserByIdOrThrow(userId);
    return await this.postsRepository.createPost(
      dto.title,
      dto.content,
      user.id,
    );
  }

  async deletePostById(postId: number, userId: number) {
    const user = await this.usersService.getUserByIdOrThrow(userId);
    const post = await this.getPostOrElseThrow(postId);
    if (post.userId !== user.id) {
      throw new UnauthorizedException(
        `User with id ${user.id} is not authorized to delete post with id ${post.id}`,
      );
    }
    return await this.postsRepository.deletePostById(postId);
  }

  async getPostOrElseThrow(postId: number) {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new NotFoundException(`Post with id ${postId} not found`);
    return post;
  }
}
