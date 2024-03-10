import { OmitType } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';

export class CreateAlbumDto extends OmitType(Album, ['id']) {}
