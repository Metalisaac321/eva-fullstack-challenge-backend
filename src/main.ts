import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(SeederService)
  await userService.seedBookings();
  await userService.seedExplorations();

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
