import prismadb from "@/lib/prismadb"
import { CategoryType, MassType, ProductType, SearchParamsType } from "@/types/types"

export const getMass = async (): Promise<MassType[]> => {
    const massData: MassType[] = await prismadb.mass.findMany({
        orderBy: {
            value: 'asc',
        }
    })
    return massData
}

export const getCategories = async (): Promise<CategoryType[]> => {
    const categoriesData = await prismadb.category.findMany()
    return categoriesData
}

export const getCategoryById = async (categoryId: string): Promise<CategoryType | null> => {
    const categoryData = await prismadb.category.findFirst({
        where: {
            id: categoryId
        }
    })
    return categoryData
}

export const getProductById = async (productId: string): Promise<ProductType | null> => {
    const product = await prismadb.product.findFirst({
        where: {
            id: productId
        }, include: {
            Category: true,
            image: true,
            price: {
                include: {
                    Mass: true
                },
                orderBy: {
                    createAt: 'desc'
                }
            },
            notion: true,
            desc: true
        }
    })
    return product
}

export const getProductsByCategoryId = async (categoryId: string): Promise<ProductType[]> => {
    const products = await prismadb.product.findMany({
        where: {
            categoryId,
        }, include: {
            Category: true,
            image: true,
            price: {
                include: {
                    Mass: true
                },
                orderBy: {
                    createAt: 'desc'
                }
            },
            notion: true,
            desc: true
        }
    })
    return products
}

export const getProducts = async (searchParams: SearchParamsType): Promise<ProductType[]> => {
    const { priceMin = '0', priceMax = '10000000', type, mass, limit, skip, sortField, sortOrder } = searchParams

    const typeArray: string[] = type ? type.split(',').filter(Boolean) : []
    const massArray: string[] = mass ? mass.split(',').filter(Boolean) : []
    console.log('searchParams', { priceMin, priceMax, typeArray, massArray })

    const products = await prismadb.product.findMany({
        where: {
            price: {
                some: {
                    regularPrice: {
                        gte: Number(priceMin),
                        lte: Number(priceMax)
                    },
                    ...(massArray.length > 0 && {
                        massId: {
                            in: massArray
                        }, Mass: {
                            id: {
                                in: massArray
                            }
                        }
                    })
                }
            },
            ...(typeArray.length > 0 && {
                Category: {
                    id: { in: typeArray }
                }
            }),
        },
        include: {
            Category: true,
            image: true,
            price: {
                include: {
                    Mass: true
                }
            },
            notion: true,
            desc: true,
        },
        ...(limit && {
            take: Number(limit),
        }),
        ...(skip && {
            skip: Number(skip),
        }),
        ...(sortField && sortOrder && {
            orderBy: {
                [sortField]: sortOrder,
            }
        })
    })
    return products
} 