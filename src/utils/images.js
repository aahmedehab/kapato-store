export const getImages = (imagesMap, product, variant) => {
  if (!product || !variant) return [];

  const key = `${product.folder_path}/${variant.folder_name}`;

  return (imagesMap[key] || []).map(
    (file) => `/images/${key}/${file}`
  );
};

export const getFirstImage = (imagesMap, product) => {
  if (!product?.variants?.length) return "";

  return getImages(imagesMap, product, product.variants[0])[0] || "";
};