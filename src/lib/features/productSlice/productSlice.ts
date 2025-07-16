import { DescriptionType, NotionType, ProductType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteProductModalType {
  productState: ProductType;
  isOpen: boolean;
}
interface EditNotionType {
  data: NotionType;
  index?: number;
}
interface EditDescriptionType {
  data: DescriptionType;
  index?: number;
}
interface ProductReduxType {
  productModal: DeleteProductModalType;
  editNotion: EditNotionType;
  editDescription: EditDescriptionType;
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
  editNotion: {
    data: {
      id: "",
      title: "",
      content: "",
    },
    index: undefined,
  },
  editDescription: {
    data: {
      id: "",
      title: "",
      imgUrl: "",
      content: "",
    },
    index: undefined,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //todo: Modal
    openDeleteProductModal: (state, action: PayloadAction<ProductType>) => {
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
    //todo: Edit Notion, Desc
    updateNotion: (state, action: PayloadAction<EditNotionType>) => {
      state.editNotion = action.payload;
    },
  },
});

export const { openDeleteProductModal, closeDeleteProductModal, updateNotion } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
