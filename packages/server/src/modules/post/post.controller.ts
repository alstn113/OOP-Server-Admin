import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/create-post-request.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponseDto } from './dto/post-response.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOkResponse({ description: 'Get All Posts', type: [PostResponseDto] })
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get(':postId')
  @ApiOkResponse({ description: 'Get Post By Id', type: PostResponseDto })
  async getPostById(@Param('postId') id: number) {
    return await this.postService.getPostById(id);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(@Body() dto: CreatePostRequestDto) {
    const postEntity = dto.toPostEntity();
    await this.postService.createPost(postEntity);
  }

  @Delete(':postId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'No Content' })
  async deletePostById(id: number) {
    await this.postService.deletePostById(id);
  }
}
