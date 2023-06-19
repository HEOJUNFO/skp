export default function grayscaleFilter(context, width, height, intensity) {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const pixels = new Uint8Array(data.length);

  intensity = Math.max(0, Math.min(100, intensity)) / 100;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    pixels[i] = avg * intensity + data[i] * (1 - intensity);
    pixels[i + 1] = avg * intensity + data[i + 1] * (1 - intensity);
    pixels[i + 2] = avg * intensity + data[i + 2] * (1 - intensity);
    pixels[i + 3] = data[i + 3];
  }

  imageData.data.set(pixels);
  context.putImageData(imageData, 0, 0);
}