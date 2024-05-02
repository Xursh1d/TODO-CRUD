import { ICategory, IProduct } from "./productListsTypes";

export interface ProductState {
  currentProduct: IProduct | null;
  selectedCategory: number | null;
  products: IProduct[];
  categories: ICategory[];
  deleteList: IProduct[];
  isLoading: boolean;
  isCreateLoading: boolean;
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  isCurrentProductLoading: boolean;
}
export interface Actions {
  getProducts: () => void;
  getCategories: () => void;
  addProduct: (
    product: IProduct,
    navigateBack: () => void,
    toaster: () => void
  ) => void;
  updateProduct: (
    updatedValue: IProduct,
    navigateBack: () => void,
    toaster: () => void
  ) => void;
  deleteProduct: (
    id: string,
    navigateBack: () => void,
    toaster: () => void
  ) => void;
  bulkDeleteProduct: (
    deleteList: IProduct[],
    navigateBack: () => void,
    toaster: () => void
  ) => void;
  getCurrentProduct: (id: string) => void;
  setCategories: (categories: ICategory[]) => void;
  filterAction: (id: string) => void;
}
