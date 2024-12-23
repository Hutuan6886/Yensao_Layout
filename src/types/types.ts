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

export type ProductsType = {
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
  imgUrl?: string;
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

  value: string;
};

export type PriceType = {
  id?: string;
  createAt?: Date;
  updateAt?: Date;

  mass: string;
  regularPrice: number;
  discountPrice: number | undefined;
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
