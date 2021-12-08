import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import appConfig from './common/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
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
        "cli": {
          "migrationsDir": "src/db/migration"
        },
        "migrationsTableName": "migration_item",
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
