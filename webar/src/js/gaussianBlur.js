export default function gaussianBlur(context, width, height, radius) {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const pixels = new Uint8Array(data.length);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sumRed = 0, sumGreen = 0, sumBlue = 0, sumAlpha = 0, weightSum = 0;
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const posX = Math.min(width - 1, Math.max(0, x + kx));
            const posY = Math.min(height - 1, Math.max(0, y + ky));
            const index = (posY * width + posX) * 4;
            const weight = Math.exp(-(kx * kx + ky * ky) / (2 * radius * radius)) / (2 * Math.PI * radius * radius);
            sumRed += data[index] * weight;
            sumGreen += data[index + 1] * weight;
            sumBlue += data[index + 2] * weight;
            sumAlpha += data[index + 3] * weight;
            weightSum += weight;
          }
        }
        const outputIndex = (y * width + x) * 4;
        pixels[outputIndex] = sumRed / weightSum;
        pixels[outputIndex + 1] = sumGreen / weightSum;
        pixels[outputIndex + 2] = sumBlue / weightSum;
        pixels[outputIndex + 3] = sumAlpha / weightSum;
      }
    }

    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0);
  }