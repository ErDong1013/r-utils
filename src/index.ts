export * from './hooks';

window.onload = () => {
  const logoDom: HTMLElement | null = document.querySelector('.__dumi-default-menu-logo');
  if (logoDom) {
    logoDom.style.width = '163px';
    logoDom.style.height = '150px';
  }
};
