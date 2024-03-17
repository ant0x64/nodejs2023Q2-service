import { OmitType } from '@nestjs/swagger';
import { Album } from 'src/album/album.entity';

export class CreateAlbumDto extends OmitType(Album, ['id']) {}
