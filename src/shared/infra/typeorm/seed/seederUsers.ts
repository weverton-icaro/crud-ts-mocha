import { hash } from "bcryptjs";
import { createConnection } from "typeorm";

async function create() {
  const connection = await createConnection();

  const password = await hash("12345678", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, created_at, updated_at) 
      VALUES('1', 'Alguem', 'teste@teste.com', '${password}', 'xxxxxxxxxxxxx' ,now(), now())`
  );

  await connection.close();
}

create().then(() => console.log("User created!"));
