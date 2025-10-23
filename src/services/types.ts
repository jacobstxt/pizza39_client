export interface ICategoryItem {
    id: string;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryCreate {
    name: string;
    slug: string;
    ImageFile: string;
}

export interface ICategoryEdit {
    id: number;
    name: string;
    slug: string;
    ImageFile: string;
}

export interface ICategoryDelete {
    id: number;
}

export interface ServerError {
    status: number;
    data: {
        errors: Record<string, string[]>;
    };
}

export interface IRegister
{
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    ImageFile: string;
}


export interface IAuthResponse {
    token: string;
}

export interface CategoryItemModel {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ProductSizeModel {
    id: number;
    name: string;
}

export interface ProductIngredientModel {
    id: number;
    name: string;
    image: string;
}

export interface ProductImageModel {
    id: number;
    name: string;
    priority: number;
}

export interface ProductItemModel {
    id: number;
    name: string;
    slug: string;
    price: number;
    weight: number;
    category?: CategoryItemModel;
    productSize?: ProductSizeModel;
    productIngredients?: ProductIngredientModel[];
    productImages?: ProductImageModel[];
}

export interface IProductCreate {
    name: string;
    slug: string;
    price: number;
    weight: number;
    categoryId: number;
    productSizeId: number;
    ingredientIds?: number[];
    imageFiles?: File[];
}


export interface IAdminUserItem {
    id: number;
    fullName:string
    email: string;
    image: string;
    dateCreated: string;
    roles: string[];
    loginTypes: string[];
}

export interface IPaginationModel {
    totalCount: number;
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
}

export interface ISearchResult<T> {
    items: T[];
    pagination: IPaginationModel;
}

export interface IUserSearchParams {
    name?: string;
    roles?: string[];
    page?: number;
    itemPerPage?: number;
    startDate?: string;
    endDate?: string;
}


export interface IUserUpdateModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    roles: string[];
}

