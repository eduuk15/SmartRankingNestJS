import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafioService: DesafiosService) {}

  private readonly logger = new Logger(DesafiosController.name);

  @Get()
  async consultarDesafios(): Promise<Array<Desafio>> {
    return await this.desafioService.consultarTodosDesafios();
  }

  @Get('/desafio/:idDesafio')
  async consultarDesafioPeloId(
    @Param('idDesafio') idDesafio: string,
  ): Promise<Desafio> {
    return await this.desafioService.consultarDesafioPeloId(idDesafio);
  }

  @Get('/:idJogador')
  async consultarDesafiosDeUmJogador(
    @Param('idJogador') idJogador: string,
  ): Promise<Array<Desafio>> {
    return await this.desafioService.consultarDesafiosDeUmJogador(idJogador);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`);
    return await this.desafioService.criarDesafio(criarDesafioDto);
  }

  @Put('/:idDesafio')
  async atualizarDesafio(
    @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('idDesafio') idDesafio: string,
  ): Promise<void> {
    await this.desafioService.atualizarDesafio(idDesafio, atualizarDesafioDto);
  }

  @Post('/:idDesafio/partida')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('idDesafio') idDesafio: string,
  ): Promise<void> {
    return await this.desafioService.atribuirDesafioPartida(
      idDesafio,
      atribuirDesafioPartidaDto,
    );
  }

  @Delete('/:idDesafio')
  async deletarDesafio(@Param('idDesafio') idDesafio: string): Promise<void> {
    await this.desafioService.deletarDesafio(idDesafio);
  }
}
