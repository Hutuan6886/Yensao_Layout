// import fetchData from "@/actions/fetchData";
// import getRealHost from "@/actions/getRealHost";
import prismadb from "@/lib/prismadb";

import { CategoryType, MainNavType } from "@/types/types";

const fetchNavbarApiData = async (): Promise<MainNavType[]> => {
  //todo: using fetch (for client)
  // const host: string = getRealHost();
  // const data: CategoryType[] = await fetchData<CategoryType[]>(
  //   `${host}/api/categories`
  // );
  //todo: using prisma fetch data from DB directly (for server)
  const data: CategoryType[] = await prismadb.category.findMany();
  if (!data)
    return [
      {
        title: "Khuyến Mãi",
        href: "/promotion",
      },
      {
        title: "Công Thức",
        href: "/recipe",
      },
      {
        title: "Liên Hệ",
        href: "/contact",
      },
    ];
  const categoryList: MainNavType[] = data.map((dataItem: CategoryType) => ({
    title: dataItem.name,
    href: `/${dataItem.id}`,
  }));
  //todo: Format data MainNav (CategoryType -> MainNavType)
  const formattedMainNav: MainNavType[] = [
    {
      title: "Sản Phẩm",
      href: "/categories",
      subNav: categoryList,
    },
    {
      title: "Khuyến Mãi",
      href: "/promotion",
    },
    {
      title: "Công Thức",
      href: "/recipe",
    },
    {
      title: "Liên Hệ",
      href: "/contact",
    },
  ];

  return formattedMainNav;
};

export default fetchNavbarApiData;
