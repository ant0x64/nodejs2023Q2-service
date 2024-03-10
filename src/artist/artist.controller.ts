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

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { Artist } from './entities/artist.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
@ApiTags('Artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

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
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  findAll() {
    return this.artistService.findAll();
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
  findOne(@Param('id', UUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
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
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    this.findOne(id);
    return this.artistService.update(id, updateArtistDto);
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
  remove(@Param('id', UUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }

    return this.artistService.remove(id);
  }
}
