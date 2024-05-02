import { Checkbox, withTableCopy } from "@gravity-ui/uikit";
import { Table } from '@gravity-ui/uikit';
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { LinkIcon } from "../../../components";
import { IProduct } from "../../../types/productListsTypes";
import useProductStore from "../../../stores/ProductsStore";
import { useCallback, useMemo } from "react";

export default function ProductsTable() {
    const MyTable = withTableCopy(Table);
    const { categories, deleteList, products } = useProductStore()

    const allSelected = products.length > 0 && deleteList.length === products.length;

    const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        useProductStore.setState({ deleteList: e.target.checked ? [...products] : [] });
    }, [products]);

    const handleChecking = useCallback((product: IProduct) => {
        const newList = deleteList.includes(product) ? deleteList.filter(p => p !== product) : [...deleteList, product];
        useProductStore.setState({ deleteList: newList });
    }, [deleteList]);

    const data = useMemo(() => products.map((product: IProduct, index: number) => {
        const category = categories.find(cat => cat.id === product.category);
        return {
            checkbox: <Checkbox checked={deleteList.includes(product)} onChange={() => handleChecking(product)} size="m" />,
            id: index + 1,
            title: product.title,
            category: category?.title,
            price: `$${product.price}`,
            description: product.description,
            edit_column: <LinkIcon to={`${product.id}/edit`} icon={Pencil} />,
            delete_column: <LinkIcon to={`${product.id}/delete`} icon={TrashBin} />,
        };
    }), [products, categories, deleteList, handleChecking]);

    const columns = useMemo(() => [
        { id: "checkbox", name: () => <Checkbox checked={allSelected} onChange={handleSelectAll} size="m" />, width: "4%" },
        { id: "id", name: "№", width: "5%" },
        { id: "title", name: "Product name" },
        { id: "category", name: "Category" },
        { id: "price", name: "Price" },
        { id: "description", name: "Description", width: "40%" },
        { id: "edit_column", name: "", width: "5%" },
        { id: "delete_column", name: "", width: "5%" },
    ], [handleSelectAll, allSelected]);

    return <MyTable className="w-full" data={data as []} columns={columns} />
}
