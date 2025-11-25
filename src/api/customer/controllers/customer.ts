// ./src/api/customer/controllers/customer.ts
import { factories } from '@strapi/strapi';
import { getUserIdFromToken } from '../../../util/auth';

export default factories.createCoreController('api::customer.customer' as any, ({ strapi }) => ({

    async getProfile(ctx) {
        try {
            const service = strapi.service('api::customer.customer');
            const userChat = getUserIdFromToken(ctx.request.header.authorization);
            const checkOrCreateCustomer = await service.checkOrCreateCustomer({
                name: userChat?.username || "New User",
                profileURL: "",
                external: userChat?.chat_key ? userChat.chat_key.toString() : "",
            });
            // Fetch profile using userChat info
            const profile = await service.getProfile(checkOrCreateCustomer.data.documentId);
            ctx.body = profile;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));