const toBase64 = (file: Express.Multer.File) => {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

export { toBase64 };
