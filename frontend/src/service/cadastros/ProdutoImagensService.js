
import {ServiceBase} from "./ServiceBase";

export class ProdutoImagensService extends ServiceBase{
   constructor() {
       super("produtoImagens");
   }

    uploadImagens(objeto){
        const formData = new FormData();
        formData.append('idProduto', objeto.idProduto);
        formData.append('file', objeto.file);

        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        };

        return Axios.post(this.url, formData, config);
    }
}
