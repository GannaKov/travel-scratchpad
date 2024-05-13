export default function truncateUrl(url) {
  const cutLinkFrom = 12;
  const maxLinkLength = 45;
  const cutLinkTo = maxLinkLength + cutLinkFrom;
  const truncatedPart = url.slice(cutLinkFrom, cutLinkTo);

  return url.length > cutLinkTo ? `${truncatedPart}...` : url;
}


