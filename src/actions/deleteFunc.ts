import { toast } from "react-toastify";

const configDelete: RequestInit = {
  credentials: "include",
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
}

export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`, configDelete);
    if (res.ok) {
      toast(res.statusText, { type: 'success' })
    } else {
      toast(res.statusText, { type: 'error' })
    }
  } catch (error) {
    toast("SERVER_ERROR_[Delete category fail!]", { type: 'success' })
    console.log("SERVER_ERROR_[Delete category fail!]", error);
  }
};

export const deleteMass = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mass/${id}`, configDelete);
    if (res.ok) {
      toast(res.statusText, { type: 'success' })
    } else {
      toast(res.statusText, { type: 'error' })
    }
  } catch (error) {
    toast('SERVER_ERROR_[Delete mass fail!]', { type: 'error' })
    console.log("SERVER_ERROR_[Delete mass fail!]", error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, configDelete);
    if (res.ok) {
      toast(res.statusText, { type: 'success' })
    } else {
      toast(res.statusText, { type: 'error' })
    }
  } catch (error) {
    toast('SERVER_ERROR_[Delete product fail!]', { type: 'error' })
    console.log("SERVER_ERROR_[Delete product fail!]", error);
  }
};
