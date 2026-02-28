"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BlogService = class BlogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
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
    async update(id, userId, dto) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (blog.userId !== userId)
            throw new common_1.ForbiddenException('You can only edit your own blogs');
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
    async delete(id, userId) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (blog.userId !== userId)
            throw new common_1.ForbiddenException('You can only delete your own blogs');
        return this.prisma.blog.delete({ where: { id } });
    }
    async getPublicBlog(slug) {
        const blog = await this.prisma.blog.findFirst({
            where: { slug, isPublished: true },
            include: {
                user: { select: { email: true } },
                _count: { select: { likes: true, comments: true } }
            },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async getPublicFeed(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            this.prisma.blog.findMany({
                where: { isPublished: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { email: true, id: true } },
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
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogService);
//# sourceMappingURL=blog.service.js.map