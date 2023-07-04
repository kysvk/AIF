import db from './connect';

interface Database {
  getProduct: () => Promise<any>;
  getProductByID:(product_id:any) => Promise<any>;
  addProduct: (product_name:string, price:number ) => Promise<any>;
  updateProduct:(product_name:string,price:number,product_id:any) => Promise<any>
  deleteProduct:(product_id:any) => Promise<any>
  findProductbyEmail: (product_name: string) => Promise<any>;
}

const extendedDb: Database = {
  ...db,
  getProduct: (): Promise<any> => {
    return db.query(`SELECT * FROM product_table`);
  },
  getProductByID: (product_id:any): Promise<any> => {
    return db.query(`SELECT * FROM product_table WHERE product_id = ${product_id}`);
  },
  addProduct: (product_name:string, price:number): Promise<any> => {
    return db.query(`INSERT INTO product_table (product_name,price) VALUES ("${product_name}",${price});`);
  },
  updateProduct:(product_name:string,price:number,product_id:any): Promise<any> => {
    return db.query(`update product_table set product_name="${product_name}",price=${price} where product_id = "${product_id}";`);
  },
  deleteProduct:(product_id:any): Promise<any> => {
    return db.query(`delete FROM product_table WHERE product_id = ${product_id};`);
  },
  findProductbyEmail: (product_name: string): Promise<any> => {
    return db.query(`SELECT * FROM product_table WHERE product_name = "${product_name}";`);
  },
};

export default extendedDb;
