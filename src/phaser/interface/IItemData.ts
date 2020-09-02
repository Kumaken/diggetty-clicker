import { ITextureKey } from './ITextureKey';

export interface IItemData {
  name: string;
  attributes: string;
  duration: number;
  description: string;
  textureKey: ITextureKey;
  texturePath: string;
}
