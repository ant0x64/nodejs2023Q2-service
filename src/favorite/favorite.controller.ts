import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  ClassSerializerInterceptor,
  ParseEnumPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UUIDPipe } from 'common/pipes/uuid.pipe';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';
import { User } from 'user/user.entity';

enum endpoints {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
@ApiTags('Favorites')
export class FavoriteController {
  protected blank_user: User['id'] = '0fa85f64-5717-4562-b3fc-2c963f66afa6';
  protected favorite: Favorite;

  constructor(private readonly service: FavoriteService) {}

  protected async getUserFavorite() {
    return this.service.findByUser(this.blank_user);
  }

  @Get()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, type: Favorite })
  async getAll() {
    return this.getUserFavorite();
  }

  @Post(':entity/:id')
  @ApiOperation({ summary: 'Add entity' })
  @ApiParam({
    name: 'entity',
    enum: endpoints,
    description: 'The entity type',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the entity',
  })
  @ApiResponse({
    status: 201,
    description: 'The entity has been added.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID has invalid format',
  })
  @ApiResponse({
    status: 422,
    description: "The entity doesn't exist",
  })
  async add(
    @Param('entity', new ParseEnumPipe(endpoints)) enpoint: endpoints,
    @Param('id', UUIDPipe) id: string,
  ) {
    const entity = (enpoint + 's') as keyof FavoriteService['services'];
    return this.service.add(await this.getUserFavorite(), entity, id);
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove album' })
  @ApiParam({
    name: 'entity',
    enum: endpoints,
    description: 'The entity type',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the album',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async delete(
    @Param('entity', new ParseEnumPipe(endpoints)) enpoint: endpoints,
    @Param('id', UUIDPipe) id: string,
  ) {
    const entity = (enpoint + 's') as keyof FavoriteService['services'];
    return this.service.delete(await this.getUserFavorite(), entity, id);
  }
}
