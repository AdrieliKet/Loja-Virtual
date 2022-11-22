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
import { CidadeService } from '../../service/cadastros/CidadeService';
import { PessoaService } from '../../service/cadastros/PessoaService';
import { InputMask } from 'primereact/inputmask';
import { PermissaoService} from "../../service/cadastros/PermissaoService";
import { MultiSelect } from 'primereact/multiselect';

import Axios from 'axios';
import { Formik, useFormik } from 'formik';

const Pessoa = () => {

    let objetoNovo = {
        nome: '',
        cpf: '',
        email: '',
        endereco: '',
        cep: '',
        cidade: '',
        permissaoPessoas: []
    };

    const [objetos, setObjetos] = useState(null);
    const [cidades, setCidades] = useState(null);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [atualizar, setAtualizar] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [permissoes, setPermissoes] = useState(null);

    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new PessoaService();
    const cidadeService = new CidadeService();
    const permissaoService = new PermissaoService();

    useEffect(() => {
        cidadeService.cidades().then(res =>{
            setCidades(res.data);
        });

        permissaoService.listarTodos().then((res =>{
            let permissoesTemporarias = [];
            res.data.forEach(element =>{
                permissoesTemporarias.push({permissao:element});
            });
            setPermissoes(permissoesTemporarias);
        }))
    }, []);

    useEffect(() => {
        if(objetos == null){
            objetoService.listarTodos().then(res =>{
                setObjetos(res.data);
            })
        }
    }, [objetos]);

    function listarPessoas() {
        Axios.get("http://localhost:8080/api/pessoa/").then(result => {
            setObjetos(result.data);
        });
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objeto,
        validate: (data)=>{
            let errors = [];

            if(!data.nome){
                errors.nome = 'Nome é obrigatório';
            }


            if(!data.email){
                errors.nome = 'Email é obrigatório';
            }
            return errors;
        },
        onSubmit: (data)=>{
            saveObjeto();
            formik.resetForm();
        }
    })

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
            let _objeto = formik.values;
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
                <Button label="Nova Pessoa" icon="pi pi-plus" className='p-button-success' onClick={openNew}/>
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

    const cidadeBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>estado</span>
                {rowData.cidade && (rowData.cidade.nome)}
            </>
        );
    }

    const header = (
        <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
            <h5 className='m-0'>Pessoas Cadastradas</h5>
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
            <Button label='Não' icon="pi pi-times" className='p-button-text' onClick={hideDeleteObjetoDialog}/>
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
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="id" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="cidade" header="cidade" sortable body={cidadeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{ width: '450px' }} footer={objetoDialogFooter} header="Cadastrar Pessoa" modal className="p-fluid" onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="name" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.nome })} />
                            {submitted && !objeto.name && <small className="p-invalid">Nome é requerido</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nome">CPF</label>
                            <InputMask id="cpf" mask="999.999.999-99" value={objeto.cpf} onChange={(e) => onInputChange(e, 'cpf')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.cpf })}></InputMask>
                            {submitted && !objeto.cpf && <small className="p-invalid">CPF é requerido</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nome">Email</label>
                            <InputText value={objeto.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.email })} />
                            {submitted && !objeto.email && <small className="p-invalid">Email é requerido</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nome">Endereço</label>
                            <InputText id="endereco" value={objeto.endereco} onChange={(e) => onInputChange(e, 'endereco')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.endereco })} />
                            {submitted && !objeto.endereco && <small className="p-invalid">Endereço é requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="nome">CEP</label>
                            <InputMask id="cep" mask="99999-999" value={objeto.cpf} onChange={(e) => onInputChange(e, 'cpf')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.cpf })}></InputMask>
                            {submitted && !objeto.cep && <small className="p-invalid">CEP é requerido</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <Dropdown optionLabel="nome" value={objeto.cidade} options={cidades} filter onChange={(e) => onInputChange(e, 'cidade')} placeholder="Selecione uma cidade"/>
                        </div>

                        <div className="field">
                            <label htmlFor="permissaoPessoas">Permissões</label>
                            <MultiSelect id="permissaoPessoas" dataKey='permissao.id' value={Formik.values.permissaoPessoas} options={permissoes} onChange={Formik.handleChange} optionLabel="permissao.nome" placeholder='Selecione as Permissões' />
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

export default React.memo(Pessoa, comparisonFn);
