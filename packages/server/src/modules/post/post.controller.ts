import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get(':postId')
  async getPostById(@Param('postId') id: number) {
    return await this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostRequestDto) {
    const postEntity = dto.toPostEntity();
    await this.postService.createPost(postEntity);
    return `Post created`;
  }

  @Delete(':postId')
  async deletePostById(id: number) {
    await this.postService.deletePostById(id);
    return `Post deleted`;
  }
}
