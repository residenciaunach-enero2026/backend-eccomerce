import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo_metadata';
  info: {
    displayName: 'SeoMetadata';
    icon: 'globe';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
  };
}

export interface SharedVariante extends Struct.ComponentSchema {
  collectionName: 'components_shared_variantes';
  info: {
    displayName: 'variante';
    icon: 'attachment';
  };
  attributes: {
    includes: Schema.Attribute.Blocks;
    name: Schema.Attribute.String;
    Price: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.seo-metadata': SharedSeoMetadata;
      'shared.variante': SharedVariante;
    }
  }
}
