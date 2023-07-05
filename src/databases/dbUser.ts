import db from './connect';

interface Database {
  getUser: () => Promise<any>;
  getUserbyID:(id:number) => Promise<any>;
  addUser: (email:string, name:string, password:string ) => Promise<any>;
  updateUser:(email:string,name:string,id:any) => Promise<any>
  deleteUser:(id:number) => Promise<any>
  findUserbyEmail: (email: string) => Promise<any>;
}

const extendedDb: Database = {
  ...db,
  getUser: (): Promise<any> => {
    return db.query(`SELECT user_id,name,email,role FROM user_table`);
  },
  getUserbyID: (id:number): Promise<any> => {
    return db.query(`SELECT user_id, name, email, role FROM user_table WHERE user_id = ${id}`);
  },
  addUser: (email:string, name:string, password:string): Promise<any> => {
    return db.query(`INSERT INTO user_table (email,name,password,role) VALUES ("${email}","${name}","${password}",role="USER");`);
  },
  updateUser:(email:string,name:string,id:any): Promise<any> => {
    return db.query(`update user_table set email="${email}",name="${name}" where user_id = "${id}";`);
  },
  deleteUser:(id:number): Promise<any> => {
    return db.query(`delete FROM user_table WHERE user_id = ${id};`);
  },
  findUserbyEmail: (email: string): Promise<any> => {
    return db.query(`SELECT * FROM user_table WHERE email = "${email}";`);
  },
};

export default extendedDb;
