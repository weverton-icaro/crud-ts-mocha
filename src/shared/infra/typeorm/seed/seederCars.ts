import { createConnection } from "typeorm";

async function create() {
  const connection = await createConnection();

  await connection.query(
    `INSERT INTO cars(id, license_plate, brand, model, chassis, renamed, year, created_at, updated_at) 
      VALUES('1', 'cba1234', 'Honda', 'Civic', 'KLSAJAHJAKHUA6543', "57215641235", "2020", now(), now())`
  );

  await connection.close();
}

create().then(() => console.log("Car created!"));
