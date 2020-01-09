export const fullPageTitle = (pageTitle: string) =>
  process.env.REACT_APP_NAME
    ? pageTitle + ' | ' + process.env.REACT_APP_NAME
    : pageTitle;
