export interface ICategory {
  id: number;
  title: string;
}
export interface IProduct {
  title: string;
  category: number;
  id: string;
  description: string;
  price: string;
}
export interface IDataRow extends IProduct {
  checkbox: JSX.Element;
  edit_column: JSX.Element;
  delete_column: JSX.Element;
}

export interface IProductsTableProps {
  products: IProduct[];
}
