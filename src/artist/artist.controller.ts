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

import { UUIDPipe } from 'common/pipes/uuid.pipe';

import { Artist } from './artist.entity';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly service: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been created.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  create(@Body() createDto: CreateArtistDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async findOne(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateDto: UpdateArtistDto,
  ) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the artist',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async remove(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return this.service.remove(id);
  }
}
