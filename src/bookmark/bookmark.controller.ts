import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkSrvice: BookmarkService,
  ) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkSrvice.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarksById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkSrvice.getBookmarksById(
      userId,
      bookmarkId,
    );
  }

  @Post()
  createBookmark(
    @GetUser('id') user: User,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkSrvice.createBookmark(
      user.id,
      dto,
    );
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkSrvice.editBookmarkById(
      userId,
      dto,
      bookmarkId,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkSrvice.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
