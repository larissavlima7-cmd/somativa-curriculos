import { Component, OnInit } from '@angular/core';
import { Curriculo } from '../../model/curriculo.model';
import { Apiservice } from '../../service/apiservice';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todos-curriculos',
  imports: [CommonModule],
  templateUrl: './todos-curriculos.html',
  styleUrl: './todos-curriculos.scss',
})
export class TodosCurriculos implements OnInit {
  //atributos
  //vetor que vai receber todos os curriculos cadastrados
  public curriculos: Curriculo[] = [];

  constructor(private _apiService: Apiservice) {} //quando a página abrir, o sistema vai conectar com a nossa api(db)

  // metodo para conectar com a api
  listarcurriculos(): void {
    //pegar as informaçõe da API e colocar no vetor
    this._apiService.getCurriculos().subscribe(
      // subscribe => Ferramenta do Observable para fazer conexão Assincrona
      //mapeamento de Dados
      (resposta) => {
        //convertendo a resposta da Api em obj para o Vetor
        this.curriculos = resposta.map(
          (e) =>
            new Curriculo(
              e.id,
              e.nome,
              e.email,
              e.telefone,
              e.cidade,
              e.estado,
              e.resumo_profissional,
              e.vaga_interesse,
            ),
        );
      },
    );
  }

  ngOnInit(): void {
    this.listarcurriculos();
  }
}
