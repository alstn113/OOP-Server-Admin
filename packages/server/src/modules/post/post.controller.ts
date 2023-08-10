import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseDto } from './dto/post-response.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOkResponse({ description: 'OK', type: [PostResponseDto] })
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get(':postId')
  @ApiOkResponse({ description: 'OK', type: PostResponseDto })
  async getPostById(@Param('postId') id: number) {
    return await this.postService.getPostById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(@Body() dto: CreatePostRequestDto) {
    const postEntity = dto.toPostEntity();
    await this.postService.createPost(postEntity);
    return `Post created`;
  }

  @Delete(':postId')
  @ApiOkResponse({ description: 'OK' })
  async deletePostById(id: number) {
    await this.postService.deletePostById(id);
    return `Post deleted`;
  }
}
