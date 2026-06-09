//arquivo para ter o controle da API (Adicionar, Ler, Deletar e Alterar)
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculo } from '../model/curriculo.model';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  //caminho para API que colocamos lá na pasta backend no arquivo db.json
  private apiUrl = 'http://localhost:3022/vagas';

  constructor(private http: HttpClient) {}//para na hora do cadastro de um novo curriculo ele aparecer na nossa api, ou seja, no arquivo db.json

  //Metodos da API (GET, PUT, DELETE, POST)

  //get- para visualizar os curriculos
  getCurriculos(): Observable<Curriculo[]>{//o observable vai permitir as conexões assincronas com a API
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  //post- para adicionar curriculos
  postCurriculos(curriculo:Curriculo): Observable<Curriculo[]>{
    return this.http.post<Curriculo[]>(this.apiUrl, curriculo); //depois que criamos, ele vai passar o link da api e do obj
  }

  //put- para fazer alterações nos curriculos
  putCurriculos(id: any, curriculo: Curriculo): Observable<Curriculo[]>{ //vai precisar passar o id, para modificar exatamente o curriculo que queremos
    const urlUpdate = `${this.apiUrl}/${id}`; //com o id informado ele vai adicionar ao link para modificar apenas aquele curriculo
    return this.http.put<Curriculo[]>(urlUpdate, curriculo);
  }

  //delete- para apagar um curriculo
  deleteCurriculos(id:any):Observable<Curriculo[]> {//também é necessário passar o id para não correr o risco de excluir outro curriculo, por isso também terá o link da api com o id na frente (http://localhost:3022/vagas/id)
    const urlDelete= `${this.apiUrl}/${id}`;
    return this.http.delete<Curriculo[]>(urlDelete);
  }
}
