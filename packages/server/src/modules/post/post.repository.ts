import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    const posts = await this.prisma.post.findMany();
    return posts.map((post) =>
      PostEntity.from(post.id, post.title, post.content),
    );
  }

  async findPostById(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return null;
    return PostEntity.from(post.id, post.title, post.content);
  }

  async createPost(postEntity: PostEntity) {
    const { title, content } = postEntity;
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return PostEntity.from(post.id, post.title, post.content);
  }

  async deletePostById(postId: number) {
    const post = await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return PostEntity.from(post.id, post.title, post.content);
  }
}
