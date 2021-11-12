import React from 'react';
import { Link } from 'umi';
import { $T } from '@/utils/locale-utils';

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
  const { data, navClass } = props;
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
          return (
            <Link className={navClass} to={navItem.url} key={i}>
              {navItem.label}
            </Link>
          );
        }
      })}
    </>
  );
};

export default Navigation;
