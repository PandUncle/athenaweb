import React, { useState, useEffect } from 'react';
import { getLocale } from 'umi';
import Pagination from '@/components/common/pagination';
import PostCard from '@/components/common/post-card';
import { $api } from '@/core/api';
import parse from 'url-parse';
import queryString from 'query-string';
import { locale2Tag } from '@/utils/utils';
import { Loading } from '@/components/loading';
import './index.less';

export default function Post(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>();
  const [tag, setTag] = useState<any>();

  let href = window.location.href;
  let url = parse(href);
  let qs = url.hash.substring(9);
  qs = qs.replace(/\*/g, '');
  let query = queryString.parse(qs);

  console.log('post query:', query);

  const fetchData = async () => {
    let lc = locale2Tag(getLocale());
    let slug = query.s;

    console.log('lc+slug', lc, slug);
    let pts = await $api.posts.browse({
      include: ['tags', 'authors'],
      filter: `tag:${slug}+tag:${lc}`,
    });
    setPosts(pts);
    console.log('posts', pts);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="post-feed">
        {posts?.map((pt: any, idx: number) => {
          return <PostCard key={idx} post={pt} />;
        })}
      </section>
      <Pagination pageContext={posts?.meta?.pagination} />
    </div>
  );
}
