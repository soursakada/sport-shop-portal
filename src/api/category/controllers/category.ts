// ./src/api/category/controllers/category.ts
import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::category.category', ({ strapi }) => ({

    async listCategory(ctx) {
        try {
            const service = strapi.service('api::category.category');
            const { page, pageSize } = ctx.query;
            const pageNum = parseInt(page as string, 10) || 1;
            const pageSizeNum = parseInt(pageSize as string, 10) || 10;
            const categories = await service.listCategory({ page: pageNum, pageSize: pageSizeNum });
            ctx.body = categories;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));