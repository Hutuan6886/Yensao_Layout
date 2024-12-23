//todo: Upload image
export const uploadImage = (formData: FormData): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-cloudflare`,
        {
          credentials: "include",
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        return new Error("upload image fail!");
      }
      const imageName = await res.json();
      resolve(imageName);
    } catch (error) {
      reject(`[UPLOAD_IMAGE_DESCRIPTION_ERROR]: ${error}`);
    }
  });
};
//todo: Get uploaded image url
export const getUploadedImageUrl = (fileName: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-cloudflare/${fileName}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream", //* Nếu không có "Content-Type" => url trả về là downloadUrl, nếu có "Content-Type" => url là overviewUrl
          },
        }
      );
      if (!res.ok) {
        return new Error("upload image fail!");
      }
      const imgUrl = await res.json();
      resolve(imgUrl);
    } catch (error) {
      reject(`[GET_IMAGE_DESCRIPTION_ERROR]: ${error}`);
    }
  });
};
