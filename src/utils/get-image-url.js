export const getImageUrl = (url) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/thumbnails/${url}`;
};
