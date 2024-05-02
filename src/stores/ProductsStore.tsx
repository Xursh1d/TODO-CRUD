import { create } from 'zustand';
import { ICategory } from '../types/productListsTypes';
import { Actions, ProductState } from '../types/storeTypes';

const useProductStore = create<ProductState & Actions>((set, get) => ({
    products: [],
    categories: [],
    deleteList: [],
    currentProduct: null,
    isLoading: false,
    isCreateLoading: false,
    isDeleteLoading: false,
    isUpdateLoading: false,
    isCurrentProductLoading: false,
    selectedCategory: null,

    getProducts: () => {
        set({ isLoading: true });
        setTimeout(() => {
            const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
            set({ products: storedProducts, isLoading: false });
        }, 1000)
    },

    addProduct: (product, navigateBack, toaster) => {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const newProducts = [...storedProducts, product];
        set({ isCreateLoading: true })
        setTimeout(() => {
            localStorage.setItem('products', JSON.stringify(newProducts));
            set({ products: newProducts, selectedCategory: null, isCreateLoading: false });
            navigateBack()
            toaster()
        }, 1000)
    },

    deleteProduct: (id, navigateBack, toaster) => {
        set({ isDeleteLoading: true })
        const filtered = get().products?.filter(product => product.id !== id)
        setTimeout(() => {
            localStorage.setItem('products', JSON.stringify(filtered));
            set({ products: filtered, isDeleteLoading: false });
            navigateBack()
            toaster()
        }, 1000)
    },

    bulkDeleteProduct: (deleteList, navigateBack, toaster) => {
        set({ isDeleteLoading: true })
        const filtered = get().products.filter(product => !deleteList.includes(product));
        setTimeout(() => {
            localStorage.setItem('products', JSON.stringify(filtered));
            set({ products: filtered, deleteList: [], isDeleteLoading: false });
            navigateBack()
            toaster()
        }, 1000)
    },

    updateProduct: (updatedValue, navigateBack, toaster) => {
        set({ isUpdateLoading: true })
        const updatedProducts = get().products?.map(product => product.id === updatedValue.id ? updatedValue : product)
        setTimeout(() => {
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            set({ products: updatedProducts, isUpdateLoading: false });
            navigateBack()
            toaster()
        }, 1000)
    },

    getCurrentProduct: (id) => {
        set({ isCurrentProductLoading: true })
        const findProduct = get().products?.find(product => product.id === id)
        setTimeout(() => {
            set({ currentProduct: findProduct, isCurrentProductLoading: false });
        }, 1000)
    },

    filterAction: (id) => {
        set({ isLoading: true, selectedCategory: Number(id) })
        if (id) {
            const filtered = get().products?.filter(product => product.category === Number(id))
            setTimeout(() => {
                set({ products: filtered, isLoading: false, });
            }, 1000)
        } else {
            get().getProducts()
            set({
                selectedCategory: null
            })
        }

    },

    getCategories: () => {
        const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        set({ categories: storedCategories });
    },

    setCategories: (categories: ICategory[]) => {
        localStorage.setItem('categories', JSON.stringify(categories));
        set({ categories });
    }
}));

export default useProductStore;
