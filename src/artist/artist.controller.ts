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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Put(':id')
  update(
    @Param('id', UUIDPipe) id: string,
    @Body() updateArtistPasswordDto: UpdateArtistDto,
  ) {
    this.findOne(id);
    return this.artistService.update(id, updateArtistPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException();
    }

    return this.artistService.remove(id);
  }
}
