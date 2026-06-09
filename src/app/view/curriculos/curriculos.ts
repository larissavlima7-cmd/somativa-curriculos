import { Component, OnInit } from '@angular/core';
import { Curriculo } from '../../model/curriculo.model';
import { Apiservice } from '../../service/apiservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curriculos',
  imports: [FormsModule],
  templateUrl: './curriculos.html',
  styleUrl: './curriculos.scss',
})
export class Curriculos implements OnInit {
  //criar um atributo que é um vetor para receber todos os curriculos que vão ser enviados
  public curriculos: Curriculo[] = [];

  public curriculo: Curriculo = new Curriculo(0, '', '', 0, '', '', '', '');

  constructor(private _apiService: Apiservice) {} //vai conectar com a api

  ngOnInit(): void {}

  //metodos
  listarCurriculos(): void {
    //preencher o vetor comas informações da API
    this._apiService.getCurriculos().subscribe(
      // subscribe => Ferramenta do Observable para fazer conexão Assincrona
      //mapeamento de Dados
      (resposta) => {
        //convertendo a Respostas da API em Obj para o Vetor
        this.curriculos = resposta.map((e) => new Curriculo(e.id, e.nome, e.email, e.telefone, e.cidade, e.estado, e.resumo_profissional,e.vaga_interesse));
      },
    );
  }

  cadastrarCurriculos(): void {
    this._apiService.postCurriculos(this.curriculo).subscribe(
      //fazer a conexão de forma assincrona
      //limpar os campos do formulário
      () => {
        this.curriculo = new Curriculo(0, '', '', 0, '', '', '', '');
        this.listarCurriculos(); //atualiza  a lista de vagas
        alert('Curriculo Cadastrado com Sucesso');
      },
    );
  }
}
