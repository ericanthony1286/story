import React from "react";
import Head from "next/head";
const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title} </title>
      {/* <meta name="title" content={title} /> */}
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      {/* <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={thumbnailUrl} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />

  <meta property="twitter:image" content={thumbnailUrl}></meta> */}
    </Head>
  );
};

export default Seo;
