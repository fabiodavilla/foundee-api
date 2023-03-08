export class CreatePlaceDto {
  name: string;
  description: string;
  placeType: number;
  latitude: number;
  longitude: number;
  imagesStringList: string[];
  commercialInfoId: string;
}
