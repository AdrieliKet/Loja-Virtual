import Axios from "axios";

export class EstadoService {
    url = process.env.REACT_APP_URL_API;

    estados(){
        return Axios.get(this.url+"/estado/");
    }

    inserir(objeto){
        return Axios.get(this.url+"/estado/", objeto);
    }

    alterar(objeto){
        return Axios.get(this.url+"/estado/", objeto);
    }

    excluir(id){
        return Axios.get(this.url+"/estado/"+id);
    }
}
