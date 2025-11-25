import path from "path";

// ./src/api/category/routes/category.ts
export default {
    routes: [
        {
            // get categories with pagination
            method: 'GET',
            path: '/categories',
            handler: 'category.listCategory',
            config: {
                auth: false,
            },
        },
    ],
};