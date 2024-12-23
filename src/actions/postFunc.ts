// import { ImageType } from "@/types/types";

// export const postImage = (url: string): Promise<ImageType> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`, {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(url),
//       });
//       if (!res.ok) {
//         return new Error("upload image fail!");
//       }
//       const imgUrlCreated = await res.json();
//       resolve(imgUrlCreated);
//     } catch (error) {
//       reject(`[POST_IMAGE_DATABASE_ERROR]: ${error}`);
//     }
//   });
// };
