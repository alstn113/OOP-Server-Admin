import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './post.entity';

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

  createPost(postEntity: PostEntity) {
    const { title, content } = postEntity;
    return this.prisma.post.create({
      data: {
        title,
        content,
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
