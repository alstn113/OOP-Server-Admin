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
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get All Posts', type: [PostResponseDto] })
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get(':postId')
  @ApiOkResponse({ description: 'Get Post By Id', type: PostResponseDto })
  async getPostById(@Param('postId') id: number) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(@Body() dto: CreatePostRequestDto) {
    await this.postsService.createPost(dto);
  }

  @Delete(':postId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'No Content' })
  async deletePostById(id: number) {
    await this.postsService.deletePostById(id);
  }
}
