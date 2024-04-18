import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UUIDPipe } from 'common/pipes/uuid.pipe';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { Album } from './album.entity';

@Controller('album')
@ApiTags('Albums')
@ApiBearerAuth()
export class AlbumController {
  constructor(private readonly service: AlbumService) {}

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
    return this.service.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  findAll() {
    return this.service.findAll();
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
  async findOne(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
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
  async update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return this.service.update(id, updateDto);
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
  async remove(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return this.service.remove(id);
  }
}
