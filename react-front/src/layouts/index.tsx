import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SelectLang from '@/components/select-lang';
import { Link, getLocale } from 'umi';
import Navigation from '@/components/common/navigation';
import { $api } from '@/core/api';
import { Loading } from '@/components/loading';

// Styles
import './index.less';
import './app.css';

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */

const DefaultLayout = (props: any) => {
  const { data, children, bodyClass, isHome } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [site, setSite] = useState<any>();
  const [pages, setPages] = useState<any[]>([]);
  const [key, setKey] = useState<any>(0);

  const fetchData = async () => {
    let settings = await $api.settings.browse();
    setSite(settings);
    console.log('settings', settings);
    // pages
    let pgs = await $api.pages.browse();
    setPages(pgs);
    console.log('pages', pgs);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div
      style={
        {
          // width: '100%',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          // color: '#000',
        }
      }
    >
      <Loading />
    </div>
  ) : (
    <>
      <Helmet>
        <html lang={getLocale()} />
        <style type="text/css">{`${site?.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">
        <div key={key} className="viewport-top">
          <div className="site-header-nav">
            <div>
              <Navigation
                data={site.navigation}
                navClass="site-foot-nav-item"
                setKey={setKey}
              />
            </div>
            <div className="site-mast-right" style={{ marginRight: '10px' }}>
              <SelectLang />
            </div>
          </div>

          <div>
            <img style={{ width: '100%' }} src={site.cover_image} alt="" />
          </div>
          {/* The main header section on top of the screen */}

          {/* <header
            className="site-head"
            // style={{
            //   ...(site.cover_image && {
            //     backgroundImage: `url(${site.cover_image})`,
            //   }),
            // }}
          >
            <div className="container">
              <div className="site-mast">
                <div className="site-mast-left">
                  <Link to="/">
                    {
                      site.logo ? (
                        <img
                          className="site-logo"
                          src={site.logo}
                          alt={site.title}
                        />
                      ) : null
                      // (
                      //   // <Img
                      //   //   fixed={data.file.childImageSharp.fixed}
                      //   //   alt={site.title}
                      //   // />
                      //   // <img
                      //   //   src={data.file.childImageSharp.fixed}
                      //   //   alt={site.title}
                      //   // />
                      // )
                    }
                  </Link>
                </div>
              </div>
              {isHome ? (
                <div className="site-banner">
                  <h1 className="site-banner-title">{site.title}</h1>
                  <p className="site-banner-desc">{site.description}</p>
                </div>
              ) : null}
              <nav className="site-nav"></nav>
            </div>
          </header> */}

          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {React.cloneElement(children, { setKey: setKey })}
          </main>
        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-left">
                {pages.map((pg: any, idx: number) => {
                  return (
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      <Link key={idx} to={`/s/article?s=*${pg.slug}*&t=page`}>
                        {` · ${pg.title}`}
                      </Link>
                    </span>
                  );
                })}
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  <Link to="/">{` · ${site.title}`}</Link> © 2021 &mdash;
                  Published with Athena
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
