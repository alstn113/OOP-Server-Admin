import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    const postResponseDtos = await this.postService.getPosts();
    return postResponseDtos;
  }

  @Get(':postId')
  async getPostById(@Param('postId') id: number) {
    const postResponseDto = await this.postService.getPostById(id);
    return postResponseDto;
  }

  @Post()
  createPost(@Body() dto: CreatePostRequestDto) {
    const postEntity = dto.toPostEntity();
    this.postService.createPost(postEntity);
    return `Post created`;
  }

  @Delete(':postId')
  deletePostById(id: number) {
    this.postService.deletePostById(id);
    return `Post deleted`;
  }
}
