export interface IElementPlainDTO {
  id: number;
  elementName: string;
}
export interface IElementDTO extends IElementPlainDTO {
  status: string;
  description: string;
}
