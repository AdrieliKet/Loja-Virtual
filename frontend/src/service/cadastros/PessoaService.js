import Axios from "axios";

export class PessoaService {
    url = "http://localhost:8080/api/pessoa/";

    pessoas(){
        return Axios.get(this.url);
    }

    inserir(objeto){
        return Axios.post(this.url, objeto);
    }

    alterar(objeto){
        return Axios.put(this.url, objeto);
    }

    excluir(id){
        return Axios.delete(this.url+id);
    }
}
