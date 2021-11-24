import React, { useState, useEffect } from 'react';
import { getLocale } from 'umi';
import Pagination from '@/components/common/pagination';
import PostCard from '@/components/common/post-card';
import { $api } from '@/core/api';
import { locale2Tag } from '@/utils/utils';
import { Loading } from '@/components/loading';
import parse from 'url-parse';
import queryString from 'query-string';
import './index.less';

export default function Article(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [art, setArt] = useState<any>();

  let href = window.location.href;
  let url = parse(href);
  let qs = url.hash.substring(12);
  qs = qs.replace(/\*/g, '');
  let query = queryString.parse(qs);

  console.log('article query:', query);
  const fetchData = async () => {
    if (query.t === 'page') {
      let slug = query.s;
      let arts = await $api.pages.browse({
        // include: ['tags', 'authors'],
        filter: `slug:${slug}`,
      });
      if (arts?.length > 0) {
        setArt(arts[0]);
        (document as any).title = arts[0]?.title;
        setLoading(false);
      }
    } else if (query.t === 'post') {
      let id = query.s;
      let art = await $api.posts.read({ id: id } as any);
      setArt(art);
      (document as any).title = art?.title;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [qs]);

  return loading ? (
    <div style={{ margin: 'auto' }}>
      <Loading />
    </div>
  ) : (
    <div className="container">
      <article className="content">
        <h1 className="content-title">{art.title}</h1>
        <section
          className="content-body load-external-scripts"
          dangerouslySetInnerHTML={{ __html: art.html }}
        />
      </article>
    </div>
  );
}
