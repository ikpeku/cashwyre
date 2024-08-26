import { ProductReponse } from "dummy";

/**
 * @ Convert product
 * @returns // Function to convert object keys to lowercase recursively
 */
export const convertKeysToLowerCase = (obj: any): any => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(convertKeysToLowerCase);
    }
  
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const lowerCaseKey = key.toLowerCase();
      acc[lowerCaseKey] = convertKeysToLowerCase(obj[key]);
      return acc;
    }, {});
  };
  
  /**
   * @ key pair
   * @returns // Function Convert all object keys to lowercase then pair the appropiate items
   */
 export  const asignProduct = (item:ProductReponse[] ) => {
    return item.map((product) => ({
      ...product,
      data: convertKeysToLowerCase(product.data),
    }));
  };
  