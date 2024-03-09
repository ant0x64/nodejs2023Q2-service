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
import { FavoriteService } from './favorite.service';
import { UUIDPipe } from 'src/common/pipes/uuid.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addArtist(id);
    return 'Successful';
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeArtist(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }

  @Post('album/:id')
  addAlbum(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addAlbum(id);
    return 'Successful';
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeAlbum(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }

  @Post('track/:id')
  addTrack(@Param('id', UUIDPipe) id: string) {
    this.favoriteService.addTrack(id);
    return 'Successful';
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', UUIDPipe) id: string) {
    if (!this.favoriteService.removeTrack(id)) {
      throw new NotFoundException();
    }
    return 'Successful';
  }
}
