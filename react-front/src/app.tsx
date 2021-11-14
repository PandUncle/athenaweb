// import { setTimeout } from 'timers';

import { notification, message } from 'antd';
import { getIntl, getLocale, history, setLocale, getAllLocales } from 'umi';
import parse from 'url-parse';
import { $T, $locale } from '@/utils/locale-utils';
import config from '@/config';

const getContainer = () => {
  let dlg = document.querySelector('#message-hanger');
  if (dlg) {
    return dlg as HTMLElement;
  } else {
    return document.body;
  }
};

const localeInit = () => {
  let lang = localStorage.getItem('locale');
  console.log('lang: ', lang);
  if (lang) {
    config.locale = lang;
  }
  // 默认英文
  let lc = config.locale ? config.locale : $locale.enUS.code;
  setLocale(lc, false);
  localStorage.setItem('locale', lc);
};

const appInit = async () => {
  // 设置 message container , 避免被material-ui的 dialog覆盖掉
  message.config({
    getContainer: getContainer,
  });
  notification.config({
    getContainer: getContainer,
  });

  // 初始化locale
  localeInit();
};

// initialState 定义
export async function getInitialState(): Promise<any> {
  // app 初始化
  await appInit();
  return {};
}
