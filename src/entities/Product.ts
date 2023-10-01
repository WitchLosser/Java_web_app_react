import { IProductImage } from "./ProductImage";

export interface IProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  category_id: string;
  images: IProductImage[];
}

export interface IPorductCreate {
  name: string;
  description: string;
  price: number;
  category_id: number;
  files: Array<File>;
}

export interface IPorductEdit {
  name: string;
  price: number;
  description: string;
  category_id: string;
  files: Array<File>;
  removeFiles: string[];
}
