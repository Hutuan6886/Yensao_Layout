import { CategoryType, DescriptionType, ImageType, NotionType } from "./types";

export type ProductFormType = {
    id: string;
    title: string;

    image: ImageType[];
    desc: DescriptionType[];
    notion: NotionType[];
    price: Record<string, ProductPriceObject>;

    Category: CategoryType;
    categoryId: string;

    createAt?: Date;
    updateAt?: Date;
};

export type ProductPriceObject = {
    id?: string;
    createAt?: Date;
    updateAt?: Date;

    regularPrice: string;
    discountPrice?: string;
};