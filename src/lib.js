export const fullPageTitle = pageTitle =>
  process.env.REACT_APP_NAME
    ? pageTitle + ' | ' + process.env.REACT_APP_NAME
    : pageTitle;
