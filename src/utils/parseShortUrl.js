const parseShortUrl = (url) => {
  if (url.includes('sirena.world')) {
    return url.replace('sirena.world/', 'sirena.sports.ru/short#');
  }

  return url;
};

export default parseShortUrl;
