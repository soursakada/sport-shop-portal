// ./src/api/product/services/product.ts

import { BaseService } from "../../../util/base-service";
import { QueryParams } from "../../../util/query-helper";
import { FetchProductOneProps, FetchProductProps, Product } from "../interface/product";


class ProductService extends BaseService<Product> {
    constructor() {
        super("api::product.product");
    }

    // "attributes": {
    //     "title": { "type": "string", "required": true },
    //     "slug": { "type": "uid", "targetField": "title" },
    //     "description": { "type": "text" },
    //     "category": {
    //         "type": "relation",
    //         "relation": "manyToOne",
    //         "target": "api::category.category",
    //         "inversedBy": "products"
    //     },
    //     "tags": {
    //         "type": "relation",
    //         "relation": "manyToMany",
    //         "target": "api::tag.tag",
    //         "mappedBy": "products"
    //     },
    //     "price": { "type": "decimal", "required": true },
    //     "currency": { "type": "string", "default": "USD" },
    //     "images": {
    //         "type": "media",
    //         "multiple": true,
    //         "required": true
    //     },
    //     "variants": {
    //         "type": "component",
    //         "repeatable": true,
    //         "component": "product.variant"
    //     },
    //     "allow_customization": { "type": "boolean", "default": false },
    //     "customization_template": {
    //         "type": "component",
    //         "component": "product.customization-template"
    //     }
    // }

    /** Fetch products with pagination + custom response */
    async findAll({ page, pageSize }: FetchProductProps) {
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
                category: true,
                tags: true,
                variants: true,
                customization_template: true,
                images: {
                    fields: ["id", "name", "url"]
                }
            },
            sort: {
                createdAt: 'desc',
            },
        } as QueryParams<Product>);

        // Count total records
        const total = await this.count();

        // Build custom response
        return this.createResponse(data, { page, pageSize, total, message: "fetch post successfully" });
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