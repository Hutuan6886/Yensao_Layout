/* //todo: Type of Dashboard*/
export type SideBarDashboard = {
  title: string;
  icon: React.ReactElement;
  href: string;
  isActive: boolean;
};

export type NotionItemDragDropActiveType = {
  index: number;
  height?: number;
  title?: string;
  content: string;
};

/* //todo: Type of Root*/
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

export type CategoryType = {
  id: string;
  createAt?: Date;
  updateAt?: Date;

  name: string;
};

export type ProductType = {
  id: string;
  title: string;

  image: ImageType[];
  desc: DescriptionType[];
  notion: NotionType[];
  price: PriceType[];

  Category: CategoryType;
  categoryId: string;

  createAt?: Date;
  updateAt?: Date;
};

export type ImageType = {
  id?: string;
  src: string;
};

export type DescriptionType = {
  id?: string;
  title: string;
  imgUrl?: string | null;
  content: string;
};
export type NotionType = {
  id?: string;
  title?: string;
  content: string;
};
export type MassType = {
  id: string;
  createAt?: Date;
  updateAt?: Date;

  value: number;
};

export type PriceType = {
  id?: string;
  createAt?: Date;
  updateAt?: Date;

  Mass: MassType
  massId: string
  regularPrice: number;
  discountPrice?: number;
};

export type SidebarSearchType = {
  price: {
    min: number;
    max: number;
  };
  type: string[];
  mass: string[];
};

export type ModalType = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export type SearchParamsType = {
  priceMin?: string; priceMax?: string; type?: string; mass?: string; page?: string; limit?: string; skip?: string; sortField?: string;
  sortOrder?: string;
}

