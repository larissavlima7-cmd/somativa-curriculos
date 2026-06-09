export class Curriculo {
  //atributos e construtor- modelo encurtado
  //aqui declarei as variaveis e os campos que vão ter nos curriculos
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public telefone: number,
    public cidade: string,
    public estado: string,
    public resumo_profissional: string,
    public vaga_interesse: string){}

    //metodos
    // do objeto para a Api(json)
    toMap() : {[key:string]:any}{
      return{
        id: this.id,
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        cidade: this.cidade,
        estado: this.estado,
        resumo_profissional: this.resumo_profissional,
        vaga_interesse: this.vaga_interesse
      }
    }

//informações da Api para o objeto
    fromMap(map:any): Curriculo{
      return new Curriculo(
        map.id,
        map.nome,
        map.email,
        map.telefone,
        map.cidade,
        map.estado,
        map.resumo_profissional,
        map.vaga_interesse
      )
    }

}
