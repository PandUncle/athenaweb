import { useIntl, getLocale } from 'umi';

let intl: any = undefined;
export function $T(id: string) {
  if (!intl) {
    intl = useIntl();
  }
  return intl.formatMessage({
    id: id,
    defaultMessage: id,
  });
}

export function initIntl(itl: any) {
  if (intl == undefined) {
    intl = itl;
  }
  return;
}

// export a language map
export const $locale = {
  zhCN: { code: 'zh-CN', text: '简体中文' },
  enUS: { code: 'en-US', text: 'English' },
};
