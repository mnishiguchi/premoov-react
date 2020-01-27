import React from 'react';

const OutboundLink: React.FC<{
  [key: string]: any;
}> = ({ href, children, ...rest }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default OutboundLink;
