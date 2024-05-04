var canvas;

const downloadImage = () => {
  const dataURL = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: 'png',
  });
  const link = document.createElement('a');
  link.download = 'image.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const flipImage = () => {
  canvas.getObjects()[0].set('flipX', !canvas.getObjects()[0].flipX);
  canvas.renderAll();
}

const centerCowboyHat = () => {
  canvas.getObjects().map(function(o) {
    o.setLeft(0);
    o.setTop(0);
    
    canvas.renderAll();
  });
}

const initializeCanvas = () => {
    canvas = new fabric.Canvas('cowboyHatInator',  {
      backgroundColor: 'rgba(0,0,0,0)',
      width: 1200, height: 600
    });

    var imgElement = document.getElementById('cowboy');
    var imgInstance = new fabric.Image(imgElement, {
      scaleX: 0.5,
      scaleY: 0.5,
      top: 10,
      left: 300
    });
    canvas.add(imgInstance);

    document.getElementById('uploadedImage').addEventListener("change", (ev) => {
      const selectedFile = document.getElementById("uploadedImage").files[0];
      if (selectedFile !== undefined) {
        var reader = new FileReader();
        reader.onload = function(f) {
           var data = f.target.result;
           fabric.Image.fromURL(data, function(img) {
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
              canvas.setHeight(img.height);
              canvas.setWidth(img.width);
           });
        }
        reader.readAsDataURL(selectedFile);
        centerCowboyHat()
      }
    });
}

document.addEventListener("DOMContentLoaded", initializeCanvas)