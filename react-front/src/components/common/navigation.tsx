import React, { useState } from 'react';
import { Link, history } from 'umi';
import { $T } from '@/utils/locale-utils';
import { v4 as uuidv4 } from 'uuid';

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation = (props: any) => {
  const { data, navClass, setKey } = props;

  return (
    <>
      {data.map((navItem: any, i: number) => {
        if (navItem.url.match(/^\s?http(s?)/gi)) {
          return (
            <a
              className={navClass}
              href={navItem.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          );
        } else {
          let path = navItem.url;
          if (path == '/') {
            return (
              <a
                key={i}
                className={navClass}
                onClick={() => {
                  history.push(navItem.url);
                }}
              >
                {navItem.label}
              </a>
            );
          } else {
            path = path.replace(/\//g, '*');
            if (path.indexOf('tag') < 0) {
              let toUrl = `/s/article?s=${path}&t=page`;
              return (
                <a
                  key={i}
                  className={navClass}
                  onClick={() => {
                    history.push(toUrl);
                  }}
                >
                  {navItem.label}
                </a>
              );
            } else {
              // 对于tag
              path = path.substring(4);
              console.log('path tag:', path);
              let toUrl = `/s/post?s=${path}&t=post`;
              return (
                <a
                  key={i}
                  className={navClass}
                  onClick={() => {
                    history.push(toUrl);
                    setKey(uuidv4());
                  }}
                >
                  {navItem.label}
                </a>
              );
            }
          }
        }
      })}
    </>
  );
};

export default Navigation;
