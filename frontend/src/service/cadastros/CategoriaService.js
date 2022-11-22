import Axios from "axios";

export class CategoriaService {
    url = "http://localhost:8080/api/categoria/";

    categorias(){
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
