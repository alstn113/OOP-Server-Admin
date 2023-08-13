import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    const posts = await this.prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
    return posts.map(
      (post) =>
        new PostEntity(
          post.id,
          post.title,
          post.content,
          post.user,
          post.userId,
          post.createdAt,
          post.updatedAt,
          post.comments,
        ),
    );
  }

  async findPostById(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return null;
    return new PostEntity(
      post.id,
      post.title,
      post.content,
      post.user,
      post.userId,
      post.createdAt,
      post.updatedAt,
      post.comments,
    );
  }

  async createPost(postEntity: PostEntity) {
    const { title, content, userId, user } = postEntity;
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        userId,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return new PostEntity(
      post.id,
      post.title,
      post.content,
      post.user,
      post.userId,
      post.createdAt,
      post.updatedAt,
      [],
    );
  }

  async deletePostById(postId: number) {
    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
