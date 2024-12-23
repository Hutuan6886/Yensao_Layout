import { ProductsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteProductModalType {
  productState: ProductsType;
  isOpen: boolean;
}
interface ProductReduxType {
  productModal: DeleteProductModalType;
}

const initialState: ProductReduxType = {
  productModal: {
    productState: {
      id: "",
      title: "",
      price: [],
      image: [],
      notion: [],
      desc: [],
      Category: {
        id: "",
        name: "",
      },
      categoryId: "",
    },
    isOpen: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    openDeleteProductModal: (state, action: PayloadAction<ProductsType>) => {
      state.productModal.productState = action.payload;
      state.productModal.isOpen = true;
    },
    closeDeleteProductModal: (state) => {
      state.productModal.productState = {
        id: "",
        title: "",
        price: [],
        image: [],
        notion: [],
        desc: [],
        Category: {
          id: "",
          name: "",
        },
        categoryId: "",
      };
      state.productModal.isOpen = false;
    },
  },
});

export const { openDeleteProductModal, closeDeleteProductModal } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
