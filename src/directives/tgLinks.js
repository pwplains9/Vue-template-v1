import openUrl from '@/utils/openUrl';
import InAppSpy from 'inapp-spy';

const { isInApp } = InAppSpy();

const preventLink = (e, el) => {
  e.preventDefault();

  openUrl(el.href);
};

const tgLinks = {
  mounted(el) {
    if (isInApp) {
      el.addEventListener('click', (e) => preventLink(e, el));
    }
  },
  unmounted(el) {
    if (isInApp) {
      el.removeEventListener('click', (e) => preventLink(e, el));
    }
  }
};

export default tgLinks;
