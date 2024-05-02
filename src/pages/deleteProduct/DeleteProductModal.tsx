import { useToaster } from "@gravity-ui/uikit";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { CancelButton, DeleteButton, ModalContainer } from "../../components";
import useProductStore from "../../stores/ProductsStore";

export default function DeleteProductModal() {
    const { add } = useToaster()
    const { id } = useParams()
    const navigate = useNavigate()
    const { deleteProduct, isDeleteLoading } = useProductStore()

    const navigateBack = () => navigate(-1)
    const toaster = () => add({ theme: "success", name: "Deleted successfully", title: "Deleted successfully" })

    const handleDeleteProduct = useCallback(() => {
        if (id) deleteProduct(id, navigateBack, toaster)
    }, [id])

    return (
        <ModalContainer title="Do you agree to delete the product?" >
            <form className="flex flex-col gap-4">
                <div className="flex items-center justify-end w-full gap-2">
                    <CancelButton />
                    <DeleteButton isLoading={isDeleteLoading} deleteCallBack={() => handleDeleteProduct()} />
                </div>
            </form>
        </ModalContainer >
    );
}
