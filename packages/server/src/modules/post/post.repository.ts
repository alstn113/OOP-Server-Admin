import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  findPosts() {
    return this.prisma.post.findMany();
  }

  findPostById(postId: number) {
    return this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  createPost(
    title: string,
    content: string,
    published: boolean,
    authorId: number,
  ) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
  }

  deletePostById(postId: number) {
    return this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
