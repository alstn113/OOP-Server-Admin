import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPosts() {
    const posts = await this.prisma.post.findMany();
    return posts.map((post) => Post.from(post.id, post.title, post.content));
  }

  async findPostById(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return null;
    return Post.from(post.id, post.title, post.content);
  }

  async createPost(Post: Post) {
    const { title, content } = Post;
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return Post.from(post.id, post.title, post.content);
  }

  async deletePostById(postId: number) {
    const post = await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return Post.from(post.id, post.title, post.content);
  }
}
