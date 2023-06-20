function getImageType(string) {
  if (string === null) {
    return "No image";
  } else if (/^data:image\/gif;base64,/i.test(string)) {
    return "Base64 image (gif)";
  } else if (
    /^data:image\/jpeg;base64,/i.test(string) ||
    /^data:image\/jpg;base64,/i.test(string) ||
    /^data:image\/png;base64,/i.test(string)
  ) {
    return "Base64 image (jpeg/jpg/png)";
  } else if (/\.jpeg$|\.jpg$|\.png$/i.test(string)) {
    return "Image";
  } else {
    return "Unknown image type";
  }
}

export default getImageType;
