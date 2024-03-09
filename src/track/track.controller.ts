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
  ForbiddenException,
} from '@nestjs/common';
import { UUIDPipe } from 'src/common/pipes/uuid.pipe';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  @Put(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateTrackPasswordDto: UpdateTrackDto,
  ) {
    this.findOne(id);
    return this.trackService.update(id, updateTrackPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException();
    }

    return this.trackService.remove(id);
  }
}
