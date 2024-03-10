import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
  HttpCode,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UUIDPipe } from 'src/common/pipes/uuid.pipe';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
@ApiTags('Favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, type: Favorite })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({
    status: 201,
    description: 'The artist has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The artist doesn't exist",
  })
  addArtist(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addArtist(id);
    return 'Successful';
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  removeArtist(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeArtist(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({
    status: 201,
    description: 'The album has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The album doesn't exist",
  })
  addAlbum(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addAlbum(id);
    return 'Successful';
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  removeAlbum(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeAlbum(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({
    status: 201,
    description: 'The track has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The track doesn't exist",
  })
  addTrack(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addTrack(id);
    return 'Successful';
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  removeTrack(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeTrack(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }
}
