import GhostContentAPI from '@tryghost/content-api';
import ghostConfig from './ghost-config';

const ghostApi = new GhostContentAPI({
  url: ghostConfig.url,
  key: ghostConfig.key,
  version: 'v3',
});

export const $api = ghostApi;
