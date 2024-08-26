interface ProductData {
    "screen size"?: number;
    color?: string;
    capacity?: string;
    "capacity gb"?: number;
    price?: number;
    generation?: string;
    year?: number;
    "cpu model"?: string;
    "hard disk size"?: string;
    "strap colour"?: string;
    "case size"?: string;
    description?: string;
  }
  
 export  interface IProduct {
    id: string;
    name: string;
    data: ProductData | null;
  }