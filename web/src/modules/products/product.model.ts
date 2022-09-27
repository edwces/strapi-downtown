interface ImageFormat {
  url: string;
}

interface Image {
  id: number;
  attributes: {
    caption: string;
    url: string;
    formats: {
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
      thumbnail: ImageFormat;
    };
  };
}

export interface Product {
  id: number;
  attributes: {
    label: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: Image;
    };
  };
}
