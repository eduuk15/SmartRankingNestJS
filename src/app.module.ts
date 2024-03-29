import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:edu08062004@cluster0.bkfxfuz.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTipology: true,
        // useFindAndModify: false,
      },
    ),
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
