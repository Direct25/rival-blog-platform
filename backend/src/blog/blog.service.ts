import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    // 1. Create a new blog
    async create(userId: string, dto: CreateBlogDto) {
        // Generate a simple unique slug by appending the timestamp
        const baseSlug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const slug = `${baseSlug}-${Date.now()}`;

        return this.prisma.blog.create({
            data: {
                title: dto.title,
                content: dto.content,
                isPublished: dto.isPublished || false,
                slug,
                userId,
            },
        });
    }

    // 2. Update a blog (Only Owner)
    async update(id: string, userId: string, dto: UpdateBlogDto) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException('Blog not found');
        if (blog.userId !== userId) throw new ForbiddenException('You can only edit your own blogs');

        let slug = blog.slug;
        if (dto.title) {
            const baseSlug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            slug = `${baseSlug}-${Date.now()}`;
        }

        return this.prisma.blog.update({
            where: { id },
            data: { ...dto, ...(dto.title && { slug }) },
        });
    }

    // 3. Delete a blog (Only Owner)
    async delete(id: string, userId: string) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException('Blog not found');
        if (blog.userId !== userId) throw new ForbiddenException('You can only delete your own blogs');

        return this.prisma.blog.delete({ where: { id } });
    }

    // 4. Get a single public blog by slug
    async getPublicBlog(slug: string) {
        const blog = await this.prisma.blog.findFirst({
            where: { slug, isPublished: true },
            include: {
                user: { select: { email: true } },
                _count: { select: { likes: true, comments: true } }
            },
        });

        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    // 5. Get Public Feed (Paginated, avoids N+1 query problem)
    async getPublicFeed(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
            this.prisma.blog.findMany({
                where: { isPublished: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { email: true, id: true } },
                    // This _count object is how we avoid the N+1 query problem!
                    _count: { select: { likes: true, comments: true } }
                },
            }),
            this.prisma.blog.count({ where: { isPublished: true } })
        ]);

        return {
            data: blogs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}