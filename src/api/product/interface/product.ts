export interface Product {
    id: string;
    slug: string;
    documentId?: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: Array<{
        id: string;
        name: string;
        url: string;
    }>;
    category: {
        id: string;
        name: string;
    } | null;
    tags: Array<{
        id: string;
        name: string;
    }>;
    variants: Array<{
        id: string;
        name: string;
        additionalPrice: number;
    }>;
    allow_customization: boolean;
    customization_template: {
        id: string;
        templateFields: Array<{
            fieldName: string;
            fieldType: string;
        }>;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface FetchProductProps {
    page: number;
    pageSize: number;
    search?: string;
}

export interface FetchProductOneProps {
    documentId: string;
}