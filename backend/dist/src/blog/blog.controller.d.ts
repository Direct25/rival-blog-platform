import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(req: any, createBlogDto: CreateBlogDto): Promise<{
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
    update(id: string, req: any, updateBlogDto: UpdateBlogDto): Promise<{
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
    delete(id: string, req: any): Promise<{
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
    getFeed(page?: string, limit?: string): Promise<{
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
    getBlogBySlug(slug: string): Promise<{
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
}
