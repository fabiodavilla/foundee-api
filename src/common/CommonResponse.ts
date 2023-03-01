export class CommonResponse {
  static Ok(statusCode: number, data: any) {
    return {
      statusCode,
      data,
    };
  }

  static BadRequest(statusCode: number, error: string, data: any) {
    return {
      statusCode,
      error,
      data,
    };
  }
}
