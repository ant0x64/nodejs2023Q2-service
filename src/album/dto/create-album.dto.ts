import { OmitType } from '@nestjs/swagger';
import { Album } from 'album/album.entity';

export class CreateAlbumDto extends OmitType(Album, ['id']) {}
