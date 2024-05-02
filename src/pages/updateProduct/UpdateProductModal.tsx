import { useFormik } from "formik";
import * as Yup from "yup";
import { useToaster } from "@gravity-ui/uikit";
import ModalContainer from "../../components/ModalContainer";
import { UpdateFormValues } from "../../types/createProductTypes";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButton, CancelButton, Input, Loader, SelectField } from "../../components";
import { ICategory } from "../../types/productListsTypes";
import TextArea from "../../components/TextArea";
import useProductStore from "../../stores/ProductsStore";

const validationSchema = Yup.object({
    id: Yup.string().required("It is important to include the Id!"),
    title: Yup.string().required("It is important to include the product name!"),
    category: Yup.string().required("It is important to include the category!"),
    price: Yup.string().required("It is important to include the price!"),
    description: Yup.string(),
});

const initialState = {
    id: "",
    title: "",
    category: "",
    price: "",
    description: "",
}

export default function UpdateProductModal() {
    const {
        isUpdateLoading,
        getCurrentProduct,
        currentProduct,
        isCurrentProductLoading,
        updateProduct,
        getCategories,
        categories
    } = useProductStore()

    const navigate = useNavigate()
    const { add } = useToaster();
    const { id } = useParams()

    useEffect(() => {
        getCategories()
        id && getCurrentProduct(id)
    }, [id])

    useEffect(() => {
        if (currentProduct) {
            for (const [key, value] of Object.entries(currentProduct)) {
                formik.setFieldValue(key, value);
            }
        }
    }, [currentProduct])

    const navigateBack = () => {
        useProductStore.setState({ currentProduct: null })
        navigate(-1)
    }

    const toaster = () => add({ theme: "success", name: "Updated successfully", title: "Updated successfully" })

    const formik = useFormik({
        initialValues: initialState,
        validationSchema,
        onSubmit: async (values: UpdateFormValues) => {
            const newProduct = { ...values, category: Number(values.category) }
            updateProduct(newProduct, navigateBack, toaster)
        }
    });

    return (
        <ModalContainer title="Update product">
            {isCurrentProductLoading ? <Loader /> :
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                    <Input
                        required
                        size="l"
                        name="title"
                        label="Product name"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        validationError={
                            formik.touched.title && formik.errors.title
                                ? formik.errors.title
                                : undefined
                        }
                    />
                    <SelectField
                        required
                        label="Categories"
                        name="category"
                        options={categories?.map((category: ICategory) => ({ content: category.title, value: String(category.id) }))}
                        onChange={(val) => formik.setFieldValue("category", val[0] || "")}
                        value={[String(formik.values.category)]}
                        onBlur={formik.handleBlur("category")}
                        errorMessage={
                            formik.touched.category
                                ? formik.errors.category
                                : undefined
                        }
                    />
                    <Input
                        required
                        type="number"
                        size="l"
                        name="price"
                        label="Price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                        onBlur={formik.handleBlur}
                        validationError={
                            formik.touched.price && formik.errors.price
                                ? formik.errors.price
                                : undefined
                        }
                    />
                    <TextArea
                        size="l"
                        name="description"
                        label="Description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        validationError={
                            formik.touched.description && formik.errors.description
                                ? formik.errors.description
                                : undefined
                        }
                    />
                    <div className="flex justify-end gap-4 pt-4">
                        <CancelButton />
                        <ActionButton title="Update" type="submit" onClick={() => formik.handleSubmit()} loading={isUpdateLoading} />
                    </div>
                </form>}
        </ModalContainer>
    )
}
