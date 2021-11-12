import { defineConfig } from 'umi';
import constants from './src/constants';
import routes from './routes';

export default defineConfig({
  title: constants.title,
  history: {
    type: 'hash',
  },
  chunks: ['go'],
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    title: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    // baseNavigator: true,
    baseNavigator: false,
  },
  routes: routes,
  fastRefresh: {},
});
