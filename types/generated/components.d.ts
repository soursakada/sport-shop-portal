import type { Schema, Struct } from '@strapi/strapi';

export interface OrderLine extends Struct.ComponentSchema {
  collectionName: 'components_order_lines';
  info: {
    displayName: 'Order line';
  };
  attributes: {
    customization: Schema.Attribute.JSON;
    product_ref: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
    unit_price: Schema.Attribute.Decimal;
    variant: Schema.Attribute.JSON;
  };
}

export interface ProductCustomizationField extends Struct.ComponentSchema {
  collectionName: 'components_product_customization_fields';
  info: {
    displayName: 'Customization field';
  };
  attributes: {
    maxLength: Schema.Attribute.Integer;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['name-number', 'text', 'number', 'select', 'boolean']
    > &
      Schema.Attribute.Required;
  };
}

export interface ProductCustomizationTemplate extends Struct.ComponentSchema {
  collectionName: 'components_product_customization_templates';
  info: {
    displayName: 'Customization template';
  };
  attributes: {
    fields: Schema.Attribute.Component<'product.customization-field', true> &
      Schema.Attribute.Required;
    previewConfig: Schema.Attribute.JSON;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'Variant';
  };
  attributes: {
    color: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    size: Schema.Attribute.String & Schema.Attribute.Required;
    sku: Schema.Attribute.String & Schema.Attribute.Required;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order.line': OrderLine;
      'product.customization-field': ProductCustomizationField;
      'product.customization-template': ProductCustomizationTemplate;
      'product.variant': ProductVariant;
    }
  }
}
