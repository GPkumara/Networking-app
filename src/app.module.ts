import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Users,contacts,tags } from './app.entity';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'kumaran',
    password:'root',
    database: 'network',
    entities: [Users,contacts,tags],
    synchronize: true,
    autoLoadEntities:true,
}),TypeOrmModule.forFeature([Users,contacts,tags])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
