export type MainNavType = {
  title: string;
  href: string;
  subNav?: MainNavType[];
};

export type CarouselType = {
  title: string;
  desc: string;
  href?: string;
  imgUrl: string;
};

export type ProductsType = {
  id: string;
  title: string;
  imgUrl: string[];
  desc?: DescriptionType[];
  notion?: NotionType[];

  type: string;
  mass: number[];
  regularPrice: number;
  discountPrice?: number;

  createAt?: Date;
  updateAt?: Date;
};

export type DescriptionType = {
  title: string;
  imgUrl?: string;
  content: string;
};
export type NotionType = {
  title: string;
  content: string;
};
