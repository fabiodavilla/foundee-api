export class CreatePlaceDto {
  name: string;
  description: string;
  status: number;
  placeType: number;
  commercialInfoId?: string;
}
