import db from './connect';

interface Database {
  getCategory: () => Promise<any>;
  getCategoryById:(id:any) => Promise<any>;
  addCategory: (name:string) => Promise<any>;
  updateCategory:(id:number,name:string) => Promise<any>
  deleteCategory:(id:number) => Promise<any>
}

const extendedDb: Database = {
  ...db,
  getCategory: (): Promise<any> => {
    return db.query(`SELECT * FROM category_table`);
  },
  getCategoryById: (id:any): Promise<any> => {
    return db.query(`SELECT * FROM category_table WHERE category_id = ${id}`);
  },
  addCategory: (name:string): Promise<any> => {
    return db.query(`INSERT INTO category_table (category_name) VALUES ("${name}");`);
  },
  updateCategory:(id:number,name:string): Promise<any> => {
    return db.query(`update category_table set category_name="${name}" where category_id = "${id}";`);
  },
  deleteCategory:(id:number): Promise<any> => {
    return db.query(`delete FROM category_table WHERE category_id = ${id};`);
  },
};

export default extendedDb;
