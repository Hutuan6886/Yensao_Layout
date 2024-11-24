import { MassType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeleteMassModalType {
  massState: MassType;
  isOpen: boolean;
}
interface MassReduxType {
  massModal: DeleteMassModalType;
}

const initialState: MassReduxType = {
  massModal: {
    massState: {
      id: "",
      value: "",
    },
    isOpen: false,
  },
};

export const massSlice = createSlice({
  name: "mass",
  initialState,
  reducers: {
    openDeleteMassModal: (state, action: PayloadAction<MassType>) => {
      state.massModal.massState = action.payload;
      state.massModal.isOpen = true;
    },
    closeDeleteMassModal: (state) => {
      state.massModal.massState = {
        id: "",
        value: "",
      };
      state.massModal.isOpen = false;
    },
  },
});

export const { openDeleteMassModal, closeDeleteMassModal } = massSlice.actions;
export const massReducer = massSlice.reducer;
