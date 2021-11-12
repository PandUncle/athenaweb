export const ellipsis = (str: string, maxLength: number) => {
  if (!str) {
    return '';
  }

  if (str.length <= 3) {
    return str;
  }

  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...';
  } else {
    return str;
  }
};

export const locale2Tag = (lc: string) => {
  if (lc === 'zh-CN') {
    return 'hash-cn';
  } else if (lc === 'en-US') {
    return 'hash-en';
  } else {
    return 'hash-cn';
  }
};
