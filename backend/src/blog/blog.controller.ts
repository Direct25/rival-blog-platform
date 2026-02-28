import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    // --- PRIVATE ROUTES (Requires JWT Token) ---

    @UseGuards(AuthGuard('jwt'))
    @Post('blogs')
    create(@Request() req:any, @Body() createBlogDto: CreateBlogDto) {
        // req.user comes from the JwtStrategy we built earlier
        return this.blogService.create(req.user.userId, createBlogDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('blogs/:id')
    update(@Param('id') id: string, @Request() req:any, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, req.user.userId, updateBlogDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('blogs/:id')
    delete(@Param('id') id: string, @Request() req:any) {
        return this.blogService.delete(id, req.user.userId);
    }

    // --- PUBLIC ROUTES (No login required) ---

    @Get('public/feed')
    getFeed(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        // Convert query strings to numbers for the pagination logic
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        return this.blogService.getPublicFeed(pageNumber, limitNumber);
    }

    @Get('public/blogs/:slug')
    getBlogBySlug(@Param('slug') slug: string) {
        return this.blogService.getPublicBlog(slug);
    }
}