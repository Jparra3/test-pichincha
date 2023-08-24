export class ResponseApi{
  public state: boolean;
  public message: string | undefined;

  constructor(_parameters: any) {
    this.state = (_parameters?.state != null ? _parameters.state: undefined);
    this.message = (_parameters?.message != null ? _parameters.message: undefined);
  }

}
