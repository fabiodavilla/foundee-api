import { CommonResponse } from './CommonResponse';

export abstract class BaseController {
  Ok(data: any) {
    return CommonResponse.Ok(200, data);
  }

  BadRequest(error: string, data: any = null) {
    return CommonResponse.BadRequest(400, error, data);
  }
}
