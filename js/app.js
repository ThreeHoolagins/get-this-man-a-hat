var canvas;

const initializeCanvas = () => {
    canvas = new fabric.Canvas('cowboyHatInator',  {
      backgroundColor: 'rgb(100,100,200)',
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
}

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

const uploadImage = () => {
  const selectedFile = document.getElementById("uploadedImage").files[0];
  if (selectedFile == undefined) {
    window.alert("ur mom homo but not in a bad way just a homo way")
  }
  else {
    var reader = new FileReader();
    reader.onload = function(f) {
       var data = f.target.result;
       fabric.Image.fromURL(data, function(img) {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
             scaleX: canvas.width / img.width,
             scaleY: canvas.height / img.height
          });
       });
    };
    reader.readAsDataURL(selectedFile);
  }
}

document.addEventListener("DOMContentLoaded", initializeCanvas)