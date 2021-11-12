import React, { useState, useEffect } from 'react';
import { getLocale } from 'umi';
import Pagination from '@/components/common/pagination';
import PostCard from '@/components/common/post-card';
import { $api } from '@/core/api';
import { locale2Tag } from '@/utils/utils';
import { Loading } from '@/components/loading';
import './index.less';

export default function Home(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>();

  let tag = locale2Tag(getLocale());

  const fetchData = async () => {
    let pts = await $api.posts.browse({
      include: ['tags', 'authors'],
      filter: `tag:${tag}`,
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
