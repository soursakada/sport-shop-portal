// ./src/api/post/controllers/post.ts
import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::product.product', ({ strapi }) => ({

    async findAll(ctx) {
        try {
            const service = strapi.service('api::product.product');
            const { page, pageSize } = ctx.query;
            const pageNum = parseInt(page as string, 10) || 1;
            const pageSizeNum = parseInt(pageSize as string, 10) || 10;
            const posts = await service.findAll({ page: pageNum, pageSize: pageSizeNum });
            ctx.body = posts;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async productDetail(ctx) {
        try {
            const service = strapi.service('api::product.product');
            const { id } = ctx.params;
            const documentId = id
            const products = await service.productDetail({ documentId });
            ctx.body = products;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async productByCategoryAndTags(ctx) {
        try {
            const service = strapi.service('api::product.product');
            const { category, tags } = ctx.query;
            const products = await service.productByCategoryAndTags({ category, tags });
            ctx.body = products;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async productDetailBySlug(ctx) {
        try {
            const service = strapi.service('api::product.product');
            const { slug } = ctx.params;
            const products = await service.productDetailBySlug({ slug });
            ctx.body = products;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));