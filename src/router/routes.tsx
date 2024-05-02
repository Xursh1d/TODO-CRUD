import { RouteObject } from "react-router-dom";
import BulkDeleteModal from "../pages/bulkDelete";
import CreateProductModal from "../pages/createProduct";
import DeleteProductModal from "../pages/deleteProduct";
import ProductsLists from "../pages/productLists";
import UpdateProductModal from "../pages/updateProduct";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProductsLists />
    ),
    children: [
      {
        path: "create",
        element: <CreateProductModal />
      },
      {
        path: ":id/edit",
        element: <UpdateProductModal />
      },
      {
        path: ":id/delete",
        element: <DeleteProductModal />
      },
      {
        path: "bulk/delete",
        element: <BulkDeleteModal />
      }
    ],
  },

];
export default routes;
