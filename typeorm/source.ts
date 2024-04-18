import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'node:path';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [join(__dirname, 'migrations', '*')],
  logging: true,
});
