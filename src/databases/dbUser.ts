import db from './connect';

interface Database {
  getCustomer: () => Promise<any>;
  addCustomer: (email:string, name:string, password:string ) => Promise<any>;
  findEmail: (email: string) => Promise<any>;
}

const extendedDb: Database = {
  ...db,
  getCustomer: (): Promise<any> => {
    return db.query(`SELECT * FROM user_table`);
  },
  addCustomer: (email:string, name:string, password:string): Promise<any> => {
    return db.query(`INSERT INTO user_table (email,name,password) VALUES ("${email}","${name}","${password}");`);
  },
  findEmail: (email: string): Promise<any> => {
    return db.query(`SELECT * FROM user_table WHERE email = "${email}";`);
  },
};

export default extendedDb;
