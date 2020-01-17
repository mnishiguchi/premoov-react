import React from 'react';
import Helmet from 'react-helmet';

const defaultTitle = process.env.REACT_APP_NAME;

const SEO: React.FC<{
  title?: string;
  description?: string;
  lang?: string;
  meta?: [];
}> = ({ title, description = '', lang = 'en', meta = [] }) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
      defaultTitle={defaultTitle}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        ...meta,
      ]}
    />
  );
};

export default SEO;
