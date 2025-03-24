import InAppSpy from 'inapp-spy';
import parseShortUrl from '@/utils/parseShortUrl';

const { isInApp } = InAppSpy();

const openUrl = (url) => {
  if (isInApp) {
    const parsedUrl = parseShortUrl(url);

    window.Telegram.WebApp.openLink(parsedUrl);
  } else {
    window.open(url, '_blank');
  }
};

export default openUrl;
