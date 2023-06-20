const handleMultipleUpload = (files, MAX_COUNT) => {
  if (!files) {
    return [[], { status: false }];
  }

  const uploaded = Array.from(files);
  let limitExceeded = true;

  Array.from(files).forEach((file) => {
    if (uploaded.findIndex((f) => f.name === file.name) === -1) {
      uploaded.push({ ...file, status: true });
      if (uploaded.length === MAX_COUNT) {
        limitExceeded = true;
        return;
      }
      if (uploaded.length > MAX_COUNT) {
        limitExceeded = false;
        return;
      }
    }
  });

  if (uploaded.length > MAX_COUNT) {
    alert(`You can only add a maximum of ${MAX_COUNT} files`);
    limitExceeded = false;
  }

  return [uploaded, { status: limitExceeded }];
};

export default handleMultipleUpload;
