export function truncateUrl(url) {
  const cutLinkFrom = 8;
  const maxLinkLength = 40;
  const cutLinkTo = maxLinkLength + cutLinkFrom;
  const truncatedPart = url.slice(cutLinkFrom, cutLinkTo);

  return url.length > cutLinkTo ? `...${truncatedPart}...` : url;
}

export function truncateUrlMobile(url) {
  const cutLinkFrom = 8;
  const maxLinkLength = 20;
  const cutLinkTo = maxLinkLength + cutLinkFrom;
  const truncatedPart = url.slice(cutLinkFrom, cutLinkTo);

  return url.length > cutLinkTo ? `...${truncatedPart}...` : url;
}
