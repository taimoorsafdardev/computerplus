
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  features: { name: string; value: string }[];
};

export const placeHolderImages: ImagePlaceholder[] = data.placeholderImages;
