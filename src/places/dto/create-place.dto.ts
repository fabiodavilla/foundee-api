export class CreatePlaceDto {
  name: string;
  description: string;
  placeType: number;
  latitude: number;
  longitude: number;
  idUser: string;
  imagesStringList: string[];
  commercialInfoId: string;
}
