import { useToaster } from "@gravity-ui/uikit";
import { useNavigate } from "react-router";
import { CancelButton, DeleteButton, ModalContainer } from "../../components";
import useProductStore from "../../stores/ProductsStore";

export default function BulkDeleteModal() {
    const { add } = useToaster()
    const navigate = useNavigate()
    const { bulkDeleteProduct, deleteList, isDeleteLoading } = useProductStore()

    const navigateBack = () => navigate(-1)
    const toaster = () => add({theme: "success",name: "Deleted successfully",title: "Deleted successfully"})

    const handleDeleteProduct = () => bulkDeleteProduct(deleteList, navigateBack, toaster)

    return (
        <ModalContainer title="Do you agree to delete the products?" >
            <form className="flex flex-col gap-4">
                <div className="flex items-center justify-end w-full gap-2">
                    <CancelButton />
                    <DeleteButton isLoading={isDeleteLoading} deleteCallBack={() => handleDeleteProduct()} />
                </div>
            </form>
        </ModalContainer >
    );
}
