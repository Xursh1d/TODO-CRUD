import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";
import { useEffect } from "react";
import useProductStore from "./stores/ProductsStore";
import categories from "./data/categories.json";

function App() {
  const { setCategories } = useProductStore()
  useEffect(() => {
    if (!localStorage.getItem("categories")) {
      setCategories(categories)
    }
  }, [])

  return (
    <ThemeProvider theme="light" >
      <ToasterProvider>
        <RouterProvider router={router} />
        <ToasterComponent className="optional additional classes" />
      </ToasterProvider>
    </ThemeProvider>)
}

export default App
