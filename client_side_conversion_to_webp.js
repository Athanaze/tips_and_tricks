// Converted to plain js from this : https://github.com/Andriy1221/webp-converter-clientside/blob/master/src/index.ts

function convertToWebp(file, quality) {
    return new Promise((res, rej) => {
      // Convert file into image
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        // Create canvas and draw image
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(image, 0, 0);
        }
        // Convert image to webp
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Remove extension from file name
              const fullFileName = file.name;
              const trimmedFileName = fullFileName.replace(/\..+$/, "");
              // Create webp file
              const webpFile = new File([blob], `${trimmedFileName}.webp`);
              res(webpFile);
            } else {
              rej("blob is null");
            }
          },
          "image/webp",
          quality
        );
      };
    });
  }

// Usage example:

/*


function convertToWebPAndUpload(file) {
    convertToWebp(file, 80).then(x=>{
        uploadImageHelper(x);
    }, _err=>{console.log(_err);})
}

*/
