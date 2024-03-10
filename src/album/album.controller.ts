import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UUIDPipe } from 'src/common/pipes/uuid.pipe';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { Album } from './entities/album.entity';

@ApiTags('Albums')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({
    status: 201,
    description: 'The album has been created.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  findOne(@Param('id', UUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    this.findOne(id);
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  remove(@Param('id', UUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }

    return this.albumService.remove(id);
  }
}
