export = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debugger: process.env.DB_DEBUG,
  synchronize: false,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/shared/infra/typeorm/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
    entitiesDir: "./src/shared/infra/typeorm/entities",
  },
};
