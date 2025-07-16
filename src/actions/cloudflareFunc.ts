//todo: Upload image API call
export const uploadImage = async (formData: FormData): Promise<string> => {
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
      throw new Error("Upload image failed!");
    }

    const imageName = await res.json();
    console.log('imageName', imageName);

    return imageName; // Trả về fileName
  } catch (error) {
    throw new Error(`[UPLOAD_IMAGE_ERROR]: ${error}`);
  }
};

// //todo: Get signed URL (Only need for private image, and expired time for image)
// export const getUploadedImageUrl = async (
//   fileName: string
// ): Promise<string> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-cloudflare/${fileName}`,
//       {
//         credentials: "include",
//         method: "GET",
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Get image URL failed!");
//     }

//     const imgUrl = await res.json();
//     return imgUrl; // Trả về signed URL
//   } catch (error) {
//     throw new Error(`[GET_IMAGE_URL_ERROR]: ${error}`);
//   }
// };

//todo:---------------------------------------------------------------------------------

// //todo: Upload image
// export const uploadImage = (formData: FormData): Promise<string> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-cloudflare`,
//         {
//           credentials: "include",
//           method: "POST",
//           body: formData,
//         }
//       );
//       if (!res.ok) {
//         return new Error("upload image fail!");
//       }
//       const imageName = await res.json();
//       resolve(imageName);
//     } catch (error) {
//       reject(`[UPLOAD_IMAGE_DESCRIPTION_ERROR]: ${error}`);
//     }
//   });
// };
// //todo: Get uploaded image url
// export const getUploadedImageUrl = (fileName: string): Promise<string> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-cloudflare/${fileName}`,
//         {
//           credentials: "include",
//           method: "GET",
//           headers: {
//             "Content-Type": "application/octet-stream", //* Nếu không có "Content-Type" => url trả về là downloadUrl, nếu có "Content-Type" => url là overviewUrl
//           },
//         }
//       );
//       if (!res.ok) {
//         return new Error("upload image fail!");
//       }
//       const imgUrl = await res.json();
//       resolve(imgUrl);
//     } catch (error) {
//       reject(`[GET_IMAGE_DESCRIPTION_ERROR]: ${error}`);
//     }
//   });
// };


