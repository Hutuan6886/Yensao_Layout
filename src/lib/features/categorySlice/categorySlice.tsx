import { CategoryType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteCategoryModalType {
    categoryState: CategoryType;
    isOpen: boolean
}
interface CategoryReduxType {
    categoryModal: DeleteCategoryModalType
}

const initialState: CategoryReduxType = {
    categoryModal: {
        categoryState: {
            id: '',
            name: ''
        },
        isOpen: false
    }
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        openDeleteCategoryModal: (state, action: PayloadAction<CategoryType>) => {
            state.categoryModal.categoryState = action.payload
            state.categoryModal.isOpen = true
        },
        closeDeleteCategoryModal: (state) => {
            state.categoryModal.categoryState = {
                id: '',
                name: ''
            }
            state.categoryModal.isOpen = false
        }
    }
})

export const { openDeleteCategoryModal, closeDeleteCategoryModal } = categorySlice.actions
export const categoryReducer = categorySlice.reducer