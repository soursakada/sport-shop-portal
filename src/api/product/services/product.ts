// ./src/api/product/services/product.ts

import { BaseService } from "../../../util/base-service";
import { QueryParams } from "../../../util/query-helper";
import { FetchProductOneProps, FetchProductProps, Product } from "../interface/product";


class ProductService extends BaseService<Product> {
    constructor() {
        super("api::product.product");
    }

    /** Fetch products with pagination + custom response */
    async findAll({ page, pageSize, search }: FetchProductProps) {
        const start = (page - 1) * pageSize;

        // Build search filter only if search exists
        const searchFilter = search
            ? {
                $or: [
                    { title: { $containsi: search } },
                    { slug: { $containsi: search } }
                ]
            }
            : {};

        // Fetch paginated + search + populated data
        const data = await this.find({
            filters: searchFilter,
            pagination: {
                page,
                pageSize,
            },
            start,
            limit: pageSize,
            populate: {
                category: true,
                tags: true,
                variants: true,
                customization_template: true,
                images: {
                    fields: ["id", "name", "url"],
                },
            },
            sort: {
                createdAt: "desc",
            },
        } as QueryParams<Product>);

        // Count total records with same filter
        const total = await this.count({
            filters: searchFilter,
        });

        // Custom response
        return this.createResponse(data, {
            page,
            pageSize,
            total,
            message: "fetch post successfully",
        });
    }

    // product detail
    async productDetail({ documentId }: FetchProductOneProps) {

        const data = await this.findOne(documentId, {
            populate: {
                category: true,
                tags: true,
                variants: true,
                customization_template: {
                    populate: {
                        fields: true
                    }
                },
                images: {
                    fields: ["id", "name", "url"]
                }
            },
        })

        // Build custom response
        return this.createResponse(data, { message: "fetch product successfully" });
    }
    // product by category and tags
    async productByCategoryAndTags({ category, tags }: { category?: string; tags?: string }) {
        const filters: any = {};
        if (category) {
            // compare category documentId
            filters.category = { documentId: category };
        }
        if (tags) {
            // compare tags documentId
            filters.tags = { documentId: tags };
        }

        const data = await this.find({
            filters,
            populate: {
                category: true,
                tags: true,
                variants: true,
                customization_template: true,
                images: {
                    fields: ["id", "name", "url"]
                }
            },
        } as QueryParams<Product>);

        // Build custom response
        return this.createResponse(data, { message: "fetch products by category and tags successfully" });
    }
    // product detail by slug
    async productDetailBySlug({ slug }: { slug: string }) {

        // Use find with filters (returns an array) and pick the first matching product
        const results = await this.find({
            filters: { slug },
            populate: {
                category: true,
                tags: true,
                variants: true,
                customization_template: {
                    populate: {
                        fields: true
                    }
                },
                images: {
                    fields: ["id", "name", "url"]
                }
            },
            limit: 1,
        } as QueryParams<Product>)

        const data = Array.isArray(results) ? results[0] : results;

        // Build custom response
        return this.createResponse(data, { message: "fetch product by slug successfully" });
    }

}

export default new ProductService();