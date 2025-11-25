// ./src/api/post/services/post.ts

import { BaseService } from "../../../util/base-service";
import { QueryParams } from "../../../util/query-helper";
import { Customer } from "../interface/customer";


class CustomerService extends BaseService<Customer> {
    constructor() {
        super("api::customer.customer");
    }

    /** Fetch posts with pagination + custom response */
    async getProfile(documentId: any) {
        const data = await this.findOne(documentId, {} as QueryParams<Customer>);
        // Build custom response
        return this.createResponse(data, { message: "fetch customer successfully" });
    }
    // create poster
    async checkOrCreateCustomer({ name, profileURL, external }: Partial<Customer>) {

        const existingUser = await this.findFirst({ filters: { external: external || "" } });
        if (existingUser) {
            return this.createResponse(existingUser, { message: "customer already exists" });
        }

        const createdCustomer = await this.createAndPublish({
            name: name || "New User",
            profileURL: profileURL || "",
            external: external || "",
        });
        return this.createResponse(createdCustomer, { message: "customer created successfully" });
    }
}

export default new CustomerService();