import { Component, OnInit } from '@angular/core';
import { Curriculo } from '../../model/curriculo.model';
import { Apiservice } from '../../service/apiservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-curriculos',
  imports: [FormsModule],
  templateUrl: './curriculos.html',
  styleUrl: './curriculos.scss',
})
export class Curriculos implements OnInit {
  //criar um atributo que é um vetor para receber todos os curriculos que vão ser enviados
  public curriculos: Curriculo[] = [];

  public curriculo: Curriculo = new Curriculo(0, '', '', '', '', '', '', '');

  constructor(private _apiService: Apiservice) {} //vai conectar com a api

  ngOnInit(): void {
    this.listarCurriculos();
  }

  //metodos
  listarCurriculos(): void {
    //preencher o vetor comas informações da API
    this._apiService.getCurriculos().subscribe(
      // subscribe => Ferramenta do Observable para fazer conexão Assincrona
      //mapeamento de Dados
      (resposta) => {
        //convertendo a Respostas da API em Obj para o Vetor
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

  cadastrarCurriculos(formCurriculo: NgForm): void { //ng Form para que depois de enviar o site limpe os campos
    //transforma a classe em um objeto comum usando o método que você criou
    const dadosParaEnviar = this.curriculo.toMap();

    // Se o ID for 0, deleta a propriedade para o json-server gerar o ID automático
    if (dadosParaEnviar['id'] === 0) {
      delete dadosParaEnviar['id'];
    }

    // Envia os dados tratados para a service
    this._apiService.postCurriculos(dadosParaEnviar).subscribe({
      next: () => {
        formCurriculo.resetForm(); //vai, juntamente com Ng form, resetar o formulário depois que ele for enviado, deixando os campos
        this.curriculo = new Curriculo(0, '', '', '', '', '', '', '');
        alert('Currículo Cadastrado com Sucesso');
      },
      error: (erro) => {
        //caso der erro o sistema irá informar
        console.error('Erro detalhado da API:', erro);
        alert('Erro ao cadastrar currículo. Verifique o console do navegador.');
      },
    });
  }
}
