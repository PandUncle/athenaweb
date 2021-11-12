import { useState } from 'react';
import { getLocale, setLocale } from 'umi';
import { Select, Popover, Button } from 'antd';
import { $locale } from '@/utils/locale-utils';

const getLangText = (lc: any) => {
  const item = (ic: any, txt: string) => {
    return (
      <span>
        <span>{ic}</span>
        <span style={{ marginLeft: '8px' }}>{txt}</span>
      </span>
    );
  };

  if (lc === $locale.zhCN.code) {
    return item('🇨🇳', $locale.zhCN.text);
  } else if (lc == $locale.enUS.code) {
    return item('🇺🇸', $locale.enUS.text);
  } else {
    return ''; //'🇨🇳 简体中文';
  }
};

export default function SelectLang(props: any) {
  const { color, borderColor, width, placement } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const items = () => {
    const lcs = [$locale.zhCN.code, $locale.enUS.code];
    return lcs.map((lc: any, idx: number) => {
      return (
        <Button
          key={idx}
          ghost
          style={{ color: 'black', textAlign: 'left' }}
          onClick={() => {
            localStorage.setItem('locale', lc);
            setLocale(lc, true);
            setVisible(false);
          }}
        >
          {getLangText(lc)}
        </Button>
      );
    });
  };

  return (
    <div>
      <Popover
        placement={placement ? placement : 'bottom'}
        content={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {items()}
          </div>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={() => {
          setVisible(!visible);
        }}
      >
        <Button
          ghost
          style={{
            borderColor: borderColor ? borderColor : '#ffffff99',
            color: color ? color : '#ffffffdd',
            borderRadius: '8px',
          }}
        >
          {getLangText(getLocale())}
        </Button>
      </Popover>
    </div>
  );
}
