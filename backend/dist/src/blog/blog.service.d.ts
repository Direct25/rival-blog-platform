import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, userId: string, dto: UpdateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    getPublicBlog(slug: string): Promise<{
        user: {
            email: string;
        };
        _count: {
            likes: number;
            comments: number;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    getPublicFeed(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
            };
            _count: {
                likes: number;
                comments: number;
            };
        } & {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            isPublished: boolean;
            slug: string;
            summary: string | null;
            updatedAt: Date;
            userId: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
