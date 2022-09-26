interface Image {
  id: number;
  attributes: {
    label: string;
    url: string;
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
