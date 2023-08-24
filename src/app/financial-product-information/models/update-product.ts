export class UpdateProduct{
  public id: string;
  public name: string | undefined;
  public description: string | undefined;
  public logo: string | undefined;
  public date_release: string | undefined;
  public date_revision: string | undefined;

  constructor(_parameters: any) {
    this.id = (_parameters?.id != null ? _parameters.id: undefined);
    this.name = (_parameters?.name != null ? _parameters.name: undefined);
    this.description = (_parameters?.description != null ? _parameters.description: undefined);
    this.logo = (_parameters?.logo != null ? _parameters.logo: undefined);
    this.date_release = (_parameters?.date_release != null ? _parameters.date_release: undefined);
    this.date_revision = (_parameters?.date_revision != null ? _parameters.date_revision: undefined);
  }

}
