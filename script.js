const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const previewCanvas = document.getElementById('previewCanvas');
const previewCtx = previewCanvas.getContext('2d');

let image = new Image();
let isDragging = false;
let startX, startY, endX, endY;

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = event.target.result;
  };
  if (file) reader.readAsDataURL(file);
});

canvas.addEventListener('mousedown', (e) => {
  startX = e.offsetX;
  startY = e.offsetY;
  isDragging = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    endX = e.offsetX;
    endY = e.offsetY;
    const rectW = endX - startX;
    const rectH = endY - startY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, rectW, rectH);

    document.getElementById('x').textContent = startX;
    document.getElementById('y').textContent = startY;
    document.getElementById('w').textContent = rectW;
    document.getElementById('h').textContent = rectH;
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

document.getElementById('applyCrop').addEventListener('click', () => {
  const cropWidth = endX - startX;
  const cropHeight = endY - startY;
  previewCanvas.width = cropWidth;
  previewCanvas.height = cropHeight;

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  previewCtx.drawImage(
    image,
    startX,
    startY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  console.log('Crop Applied:', {
    startX, startY,
    width: cropWidth,
    height: cropHeight
  });
});