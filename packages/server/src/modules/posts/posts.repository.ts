import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    return await this.prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async findPostById(postId: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async createPost(title: string, content: string, userId: number) {
    return await this.prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }

  async deletePostById(postId: number) {
    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
