import { OmitType } from '@nestjs/mapped-types';
import { Album } from 'src/album/entities/album.entity';

export class CreateAlbumDto extends OmitType(Album, ['id']) {}
