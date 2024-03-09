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
import { UUIDPipe } from 'src/common/pipes/uuid.pipe';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Put(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    this.findOne(id);
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException();
    }

    return this.albumService.remove(id);
  }
}
