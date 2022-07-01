import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // AppModule를 호출한다.
  await app.listen(3000); // 3000번의 port를 리스닝한다.
}
bootstrap();

