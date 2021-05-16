export const getIsAcitve = (href: string, pathname: string): boolean =>
  href.toString() === "/"
    ? pathname === "/"
    : pathname.includes(href.toString());
