import { useFormik } from "formik";
import * as Yup from "yup";
import { useToaster } from "@gravity-ui/uikit";
import ModalContainer from "../../components/ModalContainer";
import { FormValues } from "../../types/createProductTypes";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { ActionButton, CancelButton, Input, SelectField } from "../../components";
import { ICategory } from "../../types/productListsTypes";
import TextArea from "../../components/TextArea";
import useProductStore from "../../stores/ProductsStore";

const validationSchema = Yup.object({
    title: Yup.string().required("It is important to include the product name!"),
    category: Yup.string().required("It is important to include the category!"),
    price: Yup.string().required("It is important to include the price!"),
    description: Yup.string().required("It is important to include the description!"),
});

const initialState = {
    title: "",
    category: "",
    price: "",
    description: "",
}

export default function CreateProductModal() {
    const { isCreateLoading, addProduct, getCategories, categories } = useProductStore()
    const navigate = useNavigate()
    const { add } = useToaster();

    useEffect(() => {
        getCategories()
    }, [])

    const navigateBack = () => navigate(-1)
    const toaster = () => add({ theme: "success", name: "Created successfully", title: "Created successfully" })

    const formik = useFormik({
        initialValues: initialState,
        validationSchema,
        onSubmit: async (values: FormValues) => {
            const id = uuidv4();
            const newProduct = { ...values, id: id, category: Number(values.category) }
            addProduct(newProduct, navigateBack, toaster)
        }
    });

    return (
        <ModalContainer title="Add product">
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
                    onChange={(val) => formik.setFieldValue("category", val[0])}
                    value={[formik.values.category]}
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
                    required
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
                    <ActionButton
                        title="Add"
                        type="submit"
                        loading={isCreateLoading}
                        onClick={() => formik.handleSubmit()} />
                </div>
            </form>
        </ModalContainer>
    )
}
