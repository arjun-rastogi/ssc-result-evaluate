const convertFilesToBase64 = async (files) => {
  const base64Array = [];

  for (const file of files) {
    const base64 = await readFileAsBase64(file);
    base64Array.push(base64);
  }

  return base64Array;
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const base64 = reader.result.toString().split(",")[1];
        resolve(base64);
      } else {
        reject("Failed to read file as base64");
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export default convertFilesToBase64;
