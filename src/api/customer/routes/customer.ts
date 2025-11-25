// ./src/api/customer/routes/customer.ts
export default {
    routes: [
        {
            method: 'GET',
            path: '/customer/profile',
            handler: 'customer.getProfile',
            config: {
                auth: false,
            },
        }
    ],
};