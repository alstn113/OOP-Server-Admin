import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequest } from './dto/create-post-request.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponse } from './dto/post-response.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get All Posts', type: [PostResponse] })
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get(':postId')
  @ApiOkResponse({ description: 'Get Post By Id', type: PostResponse })
  async getPostById(@Param('postId') id: number) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(@Body() dto: CreatePostRequest) {
    const Post = dto.toPost();
    await this.postsService.createPost(Post);
  }

  @Delete(':postId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'No Content' })
  async deletePostById(id: number) {
    await this.postsService.deletePostById(id);
  }
}
