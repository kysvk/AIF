import db from './connect';

interface Database {
  getCustomer: () => Promise<any>;
  getCustomerbyID:(customer_id:any) => Promise<any>;
  addCustomer: (email:string, name:string, password:string ) => Promise<any>;
  updateCustomer:(email:string,name:string,customer_id:any) => Promise<any>
  deleteCustomer:(customer_id:any) => Promise<any>
  findCustomerbyEmail: (email: string) => Promise<any>;
}

const extendedDb: Database = {
  ...db,
  getCustomer: (): Promise<any> => {
    return db.query(`SELECT * FROM customer_table`);
  },
  getCustomerbyID: (customer_id:any): Promise<any> => {
    return db.query(`SELECT * FROM customer_table WHERE customer_id = ${customer_id}`);
  },
  addCustomer: (email:string, name:string, password:string): Promise<any> => {
    return db.query(`INSERT INTO customer_table (email,name,password,role) VALUES ("${email}","${name}","${password}","customer");`);
  },
  updateCustomer:(email:string,name:string,customer_id:any): Promise<any> => {
    return db.query(`update customer_table set email="${email}",name="${name}" where customer_id = "${customer_id}";`);
  },
  deleteCustomer:(customer_id:any): Promise<any> => {
    return db.query(`delete FROM customer_table WHERE customer_id = ${customer_id};`);
  },
  findCustomerbyEmail: (email: string): Promise<any> => {
    return db.query(`SELECT * FROM customer_table WHERE email = "${email}";`);
  },
};

export default extendedDb;
