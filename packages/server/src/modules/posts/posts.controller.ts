import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
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
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { Request } from 'express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get All Posts', type: [PostResponseDto] })
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get Post By Id', type: PostResponseDto })
  async getPostById(@Param('postId') postId: number) {
    return await this.postsService.getPostById(postId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(
    @Body() dto: CreatePostRequestDto,
    @GetCurrentUser() userId: number,
  ) {
    await this.postsService.createPost(dto, userId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'No Content' })
  async deletePostById(
    @Param('postId') postId: number,
    @GetCurrentUser() userId: number,
  ) {
    await this.postsService.deletePostById(postId, userId);
  }
}
