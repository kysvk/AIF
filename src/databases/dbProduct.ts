import db from './connect';

interface Database {
  getProduct: () => Promise<any>;
  getProductByID:(id:number) => Promise<any>;
  addProduct: (name:string, price:number,category:number) => Promise<any>;
  updateProduct:(name:string,price:number,id:number) => Promise<any>
  deleteProduct:(id:number) => Promise<any>
  findProductbyEmail: (product_name: string) => Promise<any>;
}

const extendedDb: Database = {
  ...db,
  getProduct: (): Promise<any> => {
    return db.query(`SELECT * FROM product_table`);
  },
  getProductByID: (id:number): Promise<any> => {
    return db.query(`SELECT * FROM product_table WHERE product_id = ${id}`);
  },
  addProduct: (name:string, price:number,category:number): Promise<any> => {
    return db.query(`INSERT INTO product_table (product_name,price,category_id) VALUES ("${name}",${price},"${category}");`);
  },
  updateProduct:(name:string,price:number,id:number): Promise<any> => {
    return db.query(`update product_table set product_name="${name}",price=${price} where product_id = "${id}";`);
  },
  deleteProduct:(id:number): Promise<any> => {
    return db.query(`delete FROM product_table WHERE product_id = ${id};`);
  },
  findProductbyEmail: (name: string): Promise<any> => {
    return db.query(`SELECT * FROM product_table WHERE product_name = "${name}";`);
  },
};

export default extendedDb;
