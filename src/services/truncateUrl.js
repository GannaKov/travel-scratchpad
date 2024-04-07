export default function truncateUrl(url) {
  const cutLinkFrom = 12;
  const maxLinkLength = 45;
  const cutLinkTo = maxLinkLength + cutLinkFrom;
  const truncatedPart = url.slice(cutLinkFrom, cutLinkTo);

  return url.length > cutLinkTo ? `${truncatedPart}...` : url;
}

// function truncateUrl1(url) {
//   if (url.length > 42) {
//     const truncatedPart = url.slice(12, 42); // Выбираем символы с позиции 12 до позиции 42
//   return `${truncatedPart}...`;
//     return `${url.slice(0, 12)}...${url.slice(12, 42)}`; // Обрезаем первые 12 символов и оставляем следующие 30
//   }
//   return url; // Если URL-адрес короче 42 символов, возвращаем его без изменений
// }
