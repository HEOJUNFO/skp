export default async function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image load error')); 
      img.style = 'display: none';
      img.src = src;
    });
  }