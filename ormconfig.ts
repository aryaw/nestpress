import 'dotenv/config';

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: false,
  synchronize: false,
  entities: [
    "dist/**/entities/*.entity{.ts,.js}"
  ],
  migrations: [
      "dist/src/db/migration/*{.ts,.js}"
  ],
  cli: {
    "migrationsDir": "src/db/migration"
  },
  migrationsTableName: "migration_item",
}