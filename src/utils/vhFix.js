const isSupported = () => !(!!window.MSInputMethodContext && !!document.documentMode);

const setProp = () => {
  document.documentElement.style.setProperty('--vh', `${innerHeight}px`);
};

const resize = () => {
  if (!isSupported()) {
    return;
  }

  setProp();
};

const init = () => {
  if (!isSupported()) {
    return;
  }

  setProp();

  setTimeout(setProp, 1000);

  window.addEventListener('load', setProp);
  window.addEventListener('resize', resize);
};

export default {
  init,
  resize
};
