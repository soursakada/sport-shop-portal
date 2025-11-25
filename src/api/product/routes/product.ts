import path from "path";

// ./src/api/product/routes/product.ts
export default {
    routes: [
        {
            // get products with pagination
            method: 'GET',
            path: '/products',
            handler: 'product.findAll',
            config: {
                auth: false,
            },
        },
        {
            // get product detail by id
            method: 'GET',
            path: '/product-detail/:id',
            handler: 'product.productDetail',
            config: {
                auth: false,
            },
        },
        {
            // get product detail by cagteory and tags --- IGNORE ---
            method: 'GET',
            path: '/product-by-category-tags',
            handler: 'product.productByCategoryAndTags',
            config: {
                auth: false,
            },
        },
        {
            // get product detail by slug
            method: 'GET',
            path: '/product-detail-slug/:slug',
            handler: 'product.productDetailBySlug',
            config: {
                auth: false,
            },
        },
    ],
};