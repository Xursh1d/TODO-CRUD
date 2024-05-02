import { Plus } from "@gravity-ui/icons";
import PageTitle from "./PageTitle";
import SelectField from "../../../components/Select";
import ActionButton from "../../../components/buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../types/productListsTypes";
import useProductStore from "../../../stores/ProductsStore";
import { BulkDeleteButton } from "../../../components";

function TableHeader() {
  const navigate = useNavigate()
  const { categories, selectedCategory, filterAction, deleteList } = useProductStore()
  const selectOptions = categories?.map((category: ICategory) => ({ content: category.title, value: String(category.id) }))

  const categoryCallBack = (value: string[]) => {
    filterAction(value[0])
  };

  return (
    <div className="flex items-center justify-between w-full py-4 ">
      <div className="flex items-center h-full gap-8 grow">
        <PageTitle title="Products" />
        <div className="w-56">
          <SelectField
            value={selectedCategory ? [String(selectedCategory)] : []}
            loading={false}
            placeholder="Categories"
            options={selectOptions}
            onChange={categoryCallBack}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <BulkDeleteButton
          onClick={() => navigate("bulk/delete")}
          isDisabled={!deleteList.length}
        />
        <ActionButton onClick={() => navigate("/create")} title="Add" icon={Plus} />
      </div>
    </div >
  );
}

export default TableHeader;
