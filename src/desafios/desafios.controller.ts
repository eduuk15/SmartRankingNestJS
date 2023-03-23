import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';

@Controller('desafios')
export class DesafiosController {
  constructor(private readonly desafioService: DesafiosService) {}

  private readonly logger = new Logger(DesafiosController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);
    return await this.desafioService.criarDesafio(criarDesafioDto);
  }

  @Put('/:desafio')
  async atualizarDesafio(
    @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('desafio') desafio: string,
  ): Promise<void> {
    await this.desafioService.atualizarDesafio(desafio, atualizarDesafioDto);
  }

  @Post('/:desafio/partida')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('desafio') desafio: string,
  ): Promise<void> {
    return await this.desafioService.atribuirDesafioPartida(
      desafio,
      atribuirDesafioPartidaDto,
    );
  }

  @Delete('/:_id')
  async deletarDesafio(@Param('_id') _id: string): Promise<void> {
    await this.desafioService.deletarDesafio(_id);
  }
}
