import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Dropdown, DropDown} from 'primereact/dropdown';
import { CategoriaService } from '../../service/cadastros/CategoriaService';

import Axios from 'axios';

const Categoria = () => {

    let objetoNovo = {
        nome: '',
    };

    const [objetos, setObjetos] = useState(null);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [atualizar, setAtualizar] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new CategoriaService();

    useEffect(() => {
        if(objetos == null){
            objetoService.categorias().then(res =>{
                setObjetos(res.data);
            })
        }
    }, [objetos]);

    function listarCategorias() {
        Axios.get("http://localhost:8080/api/categoria/").then(result => {
            setObjetos(result.data);
        });
    }

    const openNew = () => {
        setObjeto(objetoNovo);
        setSubmitted(false);
        setObjetoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setObjetoDialog(false);
    }

    const hideDeleteObjetoDialog = () => {
        setObjetoDeleteDialog(false);
    }

    const saveObjeto = () => {
        setSubmitted(true);

        if(objeto.nome.trim()){
            let _objeto = {...objeto};
            if(objeto.id){
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Alterado"});
                    setObjetos(null);
                })
            }else{
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Cadastrado"});
                    setObjetos(null);
                })
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) =>{
        setObjeto({...objeto});
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Removido"});

            setObjetos(null);
            setObjetoDeleteDialog(false);
        })
    }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _objeto = {...objeto};
        _objeto[`${nome}`] = val;

        setObjeto(_objeto);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editObjeto(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteObjeto(rowData)} />
            </div>
        );
    }

    const leftToolbarTemplate = () => {
        return (
        <React.Fragment>
            <div className='my-2'>
                <Button label="Nova Categoria" icon="pi pi-plus" className='p-button-success' onClick={openNew}/>
            </div>
        </React.Fragment>
        );
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>nome</span>
                {rowData.nome}
            </>
        );
    }

    const header = (
        <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
            <h5 className='m-0'>Categorias Cadastradas</h5>
            <span className='block mt-2 md:mt-0 p-input-icon-left'>
                <i className='pi pi-search'/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquisar..."/>
            </span>
        </div>
    )

    const objetoDialogFooter = (
        <>
            <Button label='Cancelar' icon="pi pi-times" className='p-button-text' onClick={hideDialog}/>
            <Button label='Salvar' icon='pi pi-checks' className='p-button-text' onClick={saveObjeto}/>
        </>
    );

    const deleteObjetoDialogFooter = (
        <>
            <Button label='N??o' icon="pi pi-times" className='p-button-text' onClick={hideDeleteObjetoDialog}/>
            <Button label='Salvar' icon='pi pi-checks' className='p-button-text' onClick={confirmDeleteObjeto}/>
        </>
    )
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={objetos} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="Sem objetos cadastradas" header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="id" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>

                    <Dialog visible={objetoDialog} style={{ width: '450px' }} footer={objetoDialogFooter} header="Cadastro de Categorias" modal className="p-fluid" onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="name" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.nome })} />
                            {submitted && !objeto.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {objeto && <span>Deseja excluir?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Categoria, comparisonFn);
