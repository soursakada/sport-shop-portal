// ./src/api/category/services/category.ts

import { BaseService } from "../../../util/base-service";
import { QueryParams } from "../../../util/query-helper";
import { Category, FetchCategoryProps } from "../interface/category";

class CategoryService extends BaseService<Category> {
    constructor() {
        super("api::category.category");
    }

    /** Fetch products with pagination + custom response */
    async listCategory({ page, pageSize }: FetchCategoryProps) {
        const start = (page - 1) * pageSize;

        // Fetch paginated data using QueryParams<T>
        const data = await this.find({
            pagination: {
                page,
                pageSize,
            },
            start,
            limit: pageSize,
            populate: {
                tags: true,
                products: true,
                image: true,
            },
            sort: {
                createdAt: 'desc',
            },
        } as QueryParams<Category>);

        // Count total records
        const total = await this.count();

        // Build custom response
        return this.createResponse(data, { page, pageSize, total, message: "fetch post successfully" });
    }
}

export default new CategoryService();