/**
 * Utilidades PWA para garantir experiência mobile nativa
 */

/**
 * Detecta se o app está rodando em modo standalone (instalado como PWA)
 */
export const isStandalone = (): boolean => {
  // iOS
  if ('standalone' in window.navigator) {
    return (window.navigator as any).standalone === true;
  }
  
  // Android e outros
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.matchMedia('(display-mode: fullscreen)').matches;
};

/**
 * Previne comportamentos indesejados do navegador mobile
 */
export const preventMobileBehaviors = () => {
  // iOS (Safari/PWA): NUNCA usar document-level touchmove preventDefault.
  // Isso quebra scroll/swipe e causa "toque não responde" em containers com overflow.
  // A estratégia correta fica no CSS + um único container interno de scroll.
  if (isIOS()) {
    // Em modo standalone, ainda bloqueamos pinch-zoom para manter experiência "app-like".
    if (isStandalone()) {
      const prevent = (e: Event) => e.preventDefault();
      document.addEventListener('gesturestart', prevent, { passive: false });
      document.addEventListener('gesturechange', prevent, { passive: false });
      document.addEventListener('gestureend', prevent, { passive: false });
    }
    return;
  }
};

/**
 * Configurações de viewport dinâmico para dispositivos móveis
 */
export const setupDynamicViewport = () => {
  // Corrige problemas de altura de viewport em mobile
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  // Reajusta quando o teclado virtual aparece/desaparece
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVH);
  }
};

/**
 * Esconde a splash screen após o carregamento
 */
export const hideSplashScreen = () => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.remove();
    }, 300);
  }
};

/**
 * Verifica se está no iOS
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

/**
 * Verifica se está no Android
 */
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

/**
 * Adiciona classe ao body baseado no dispositivo e modo PWA
 */
export const setupDeviceClasses = () => {
  const root = document.documentElement;
  
  if (isStandalone()) {
    root.classList.add('pwa-standalone');
  }
  
  if (isIOS()) {
    root.classList.add('ios');
    if (isStandalone()) {
      root.classList.add('ios-standalone');
    }
  }
  
  if (isAndroid()) {
    root.classList.add('android');
    if (isStandalone()) {
      root.classList.add('android-standalone');
    }
  }
};

/**
 * Inicializa todas as configurações PWA
 */
export const initPWA = () => {
  setupDeviceClasses();
  setupDynamicViewport();
  preventMobileBehaviors();
  
  // Log para debug
  if (process.env.NODE_ENV === 'development') {
    console.log('[PWA] Standalone:', isStandalone());
    console.log('[PWA] iOS:', isIOS());
    console.log('[PWA] Android:', isAndroid());
  }
};
