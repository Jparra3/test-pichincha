export class Product{
  public id: string;
  public name: string | undefined;
  public description: string | undefined;
  public logo: string | undefined;
  public data_release: string | undefined;
  public data_revision: string | undefined;
  public showMenu: boolean;

  constructor(_parameters: any) {
    this.id = (_parameters?.id != null ? _parameters.id: undefined);
    this.name = (_parameters?.name != null ? _parameters.name: undefined);
    this.description = (_parameters?.description != null ? _parameters.description: undefined);
    this.logo = (_parameters?.logo != null ? _parameters.logo: undefined);
    this.data_release = (_parameters?.data_release != null ? _parameters.data_release: undefined);
    this.data_revision = (_parameters?.data_revision != null ? _parameters.data_revision: undefined);
    this.showMenu = (_parameters?.showMenu != null ? _parameters.showMenu: false);
  }

}
