import type { Schema, Attribute } from '@strapi/strapi';

export interface DataStructuresFeature extends Schema.Component {
  collectionName: 'components_data_structures_features';
  info: {
    displayName: 'feature';
    icon: 'bulletList';
  };
  attributes: {
    header: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Enumeration<
      ['desktop', 'lock', 'shield', 'globe', 'check-circle']
    > &
      Attribute.Required;
  };
}

export interface PageComponentsCallToAction extends Schema.Component {
  collectionName: 'components_page_components_call_to_actions';
  info: {
    displayName: 'Call To Action';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    header: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 64;
      }>;
    description: Attribute.Text;
    target: Attribute.String & Attribute.Required;
    targetLabel: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'ACT NOW'>;
  };
}

export interface PageComponentsFeaturesList extends Schema.Component {
  collectionName: 'components_page_components_features_lists';
  info: {
    displayName: 'Features List';
    icon: 'apps';
    description: '';
  };
  attributes: {
    header: Attribute.String;
    features: Attribute.Component<'data-structures.feature', true>;
  };
}

export interface PageComponentsHeroBanner extends Schema.Component {
  collectionName: 'components_page_components_hero_banners';
  info: {
    displayName: 'Hero Banner';
    icon: 'picture';
    description: '';
  };
  attributes: {
    header: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media;
    target: Attribute.String & Attribute.Required;
    targetLabel: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'data-structures.feature': DataStructuresFeature;
      'page-components.call-to-action': PageComponentsCallToAction;
      'page-components.features-list': PageComponentsFeaturesList;
      'page-components.hero-banner': PageComponentsHeroBanner;
    }
  }
}
