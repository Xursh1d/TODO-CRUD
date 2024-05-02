import ProductsTable from "./components/ProductsTable";
import TableHeader from "./components/TableHeader";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { EmptyContent, Loader } from "../../components";
import useProductStore from "../../stores/ProductsStore";

export default function ProductsLists() {
    const { products, getCategories, getProducts, isLoading } = useProductStore()

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <main className="container min-h-screen py-5 mx-auto space-y-2">
            <TableHeader />
            {isLoading ? <Loader />
                : products.length ? <ProductsTable />
                    : <EmptyContent />}
            <Outlet />
        </main>
    )
}
