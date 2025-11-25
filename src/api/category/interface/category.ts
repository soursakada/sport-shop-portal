export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FetchCategoryProps {
    page: number;
    pageSize: number;
    search?: string;
}

