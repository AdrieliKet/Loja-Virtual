import Axios from "axios";

export class CidadeService {
    url = "http://localhost:8080/api/cidade/";

    cidades(){
        return Axios.get(this.url);
    }

    inserir(objeto){
        return Axios.get(this.url, objeto);
    }

    alterar(objeto){
        return Axios.get(this.url, objeto);
    }

    excluir(id){
        return Axios.get(this.url+id);
    }
}
