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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UUIDPipe } from 'common/pipes/uuid.pipe';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { Track } from './track.entity';

@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({
    status: 201,
    description: 'The track has been created.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.service.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  async findOne(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  async update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateDto: UpdateTrackDto,
  ) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the track',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  async remove(@Param('id', UUIDPipe) id: string) {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return this.service.remove(id);
  }
}
