import React, { useState, useEffect } from 'react';
import { getLocale } from 'umi';
import Pagination from '@/components/common/pagination';
import PostCard from '@/components/common/post-card';
import { $api } from '@/core/api';
import { locale2Tag } from '@/utils/utils';
import { Loading } from '@/components/loading';
import './index.less';

const sortTag = (tags: any[]) => {
  if (!tags) return undefined;

  for (let i = 0; i < tags.length; i++) {
    if (tags[i]?.name.indexOf('sort') >= 0) {
      return tags[i].name;
    }
  }

  return undefined;
};

const sortPosts = (posts: any[]) => {
  if (!posts) return [];

  let sTags: any[] = [];
  for (let i = 0; i < posts.length; i++) {
    let stag = sortTag(posts[i].tags);
    sTags.push({ stag: stag, index: i });
  }

  sTags.sort((a, b) => {
    var x = a.stag.toLowerCase();
    var y = b.stag.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  console.log('sTags: ', sTags);

  let sortedPosts: any[] = [];
  sTags.map((tag: any) => {
    sortedPosts.push(posts[tag.index]);
  });

  return sortedPosts;
};

export default function Home(props: any) {
  (document as any).title = 'News';

  const { setKey } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any>([]);
  const [tops, setTops] = useState<any>([]);

  let lc = locale2Tag(getLocale());

  const fetchData = async () => {
    let tps = await $api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
      filter: `tag:hash-top`,
    });

    let sorted = sortPosts(tps);
    setTops(sorted);
    console.log('sorted', sorted);

    let pts = await $api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
      filter: `tag:${lc}+tag:-hash-top`,
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
        {tops?.map((tp: any, idx: number) => {
          return <PostCard key={idx} post={tp} setKey={setKey} />;
        })}
      </section>
      <div style={{ height: '20px' }}></div>
      <section className="post-feed">
        {posts?.map((pt: any, idx: number) => {
          return <PostCard key={idx} post={pt} setKey={setKey} />;
        })}
      </section>
      {/* <Pagination pageContext={posts?.meta?.pagination} /> */}
    </div>
  );
}
