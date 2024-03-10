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

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { Track } from './entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
@ApiTags('Tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

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
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  findAll() {
    return this.trackService.findAll();
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
  findOne(@Param('id', UUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
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
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    this.findOne(id);
    return this.trackService.update(id, updateTrackDto);
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
  remove(@Param('id', UUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }

    return this.trackService.remove(id);
  }
}
