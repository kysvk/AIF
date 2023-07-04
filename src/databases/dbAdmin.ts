import db from './connect';

interface Database {
  getAdmin: () => Promise<any>;
  getAdminById:(admin_id:any) => Promise<any>;
  addAdmin: (email:string, name:string, password:string ) => Promise<any>;
  updateAdmin:(email:string,name:string,admin_id:any) => Promise<any>
  deleteAdmin:(admin_id:number) => Promise<any>
  findIdByEmail: (email: string) => Promise<any>;
  
}

const extendedDb: Database = {
  ...db,
  getAdmin: (): Promise<any> => {
    return db.query(`SELECT * FROM admin_table`);
  },
  getAdminById: (admin_id:any): Promise<any> => {
    return db.query(`SELECT * FROM admin_table WHERE admin_id = ${admin_id}`);
  },
  addAdmin: (email:string, name:string, password:string): Promise<any> => {
    return db.query(`INSERT INTO admin_table (email,name,password,role) VALUES ("${email}","${name}","${password}","admin");`);
  },
  updateAdmin:(email:string,name:string,admin_id:any): Promise<any> => {
    return db.query(`update admin_table set email="${email}",name="${name}" where admin_id = "${admin_id}";`);
  },
  deleteAdmin:(admin_id:number): Promise<any> => {
    return db.query(`delete FROM admin_table WHERE admin_id = ${admin_id};`);
  },
  findIdByEmail: (email: string): Promise<any> => {
    return db.query(`SELECT * FROM admin_table WHERE email = "${email}";`);
  },
};

export default extendedDb;
