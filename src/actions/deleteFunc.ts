export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "apllication/json",
        },
      }
    );
    if (res.ok) {
      console.log("Delete category successfully");
    } else {
      console.log("Delete category fail");
    }
  } catch (error) {
    console.log("Internal Error", error);
  }
};

export const deleteMass = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mass`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      console.log("Delete mass successfully");
    } else {
      console.log("RES_ERROR_[Delete mass fail!]");
    }
  } catch (error) {
    console.log("SERVER_ERROR_[Delete mass fail!]", error);
  }
};
