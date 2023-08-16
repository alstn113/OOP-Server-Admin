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
import { plainToInstance } from 'class-transformer';
import { AuthRoles } from '../auth/decorators/auth-roles.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @AuthRoles()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get All Posts', type: [PostResponseDto] })
  async getPosts() {
    const posts = await this.postsService.getPosts();
    const postsResponse = plainToInstance(PostResponseDto, posts);
    return postsResponse;
  }

  @Get(':postId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Get Post By Id', type: PostResponseDto })
  async getPostById(@Param('postId') postId: number) {
    const post = await this.postsService.getPostById(postId);
    const postResponse = plainToInstance(PostResponseDto, post);
    return postResponse;
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Created' })
  async createPost(
    @Body() dto: CreatePostRequestDto,
    @GetCurrentUser('userId') userId: number,
  ) {
    await this.postsService.createPost(dto, userId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'No Content' })
  async deletePostById(
    @Param('postId') postId: number,
    @GetCurrentUser('userId') userId: number,
  ) {
    await this.postsService.deletePostById(postId, userId);
  }
}
