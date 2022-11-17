package com.dev.backend.service;

import java.util.Date;
import java.util.List;

import com.dev.backend.entity.Permissao;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.repository.PermissaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.PermissaoPessoa;
import com.dev.backend.repository.PermissaoPessoaRepository;

@Service
public class PermissaoPessoaService {
    @Autowired
    private PermissaoPessoaRepository permissaoPessoaRepository;

    @Autowired
    private PermissaoRepository permissaoRepository;

    public void vincularPessoaPermissaoCliente(Pessoa pessoa){
        List<Permissao> listaPermissao = permissaoRepository.findByNome("cliente");
        if (listaPermissao.size() > 0) {
            PermissaoPessoa permissaoPessoa = new PermissaoPessoa();
            permissaoPessoa.setPessoa(pessoa);
            permissaoPessoa.setPermissao(listaPermissao.get(0));
            permissaoPessoa.setDataCriacao(new Date());
            permissaoPessoaRepository.save(permissaoPessoa);
        }
    }
    
    public List<PermissaoPessoa> buscarTodos(){
        return permissaoPessoaRepository.findAll();
    }

    public PermissaoPessoa inserir(PermissaoPessoa permissaoPessoa){
        permissaoPessoa.setDataCriacao(new Date());
        PermissaoPessoa permissaoPessoaNovo = permissaoPessoaRepository.saveAndFlush(permissaoPessoa);
        return permissaoPessoaNovo;
    }
    
    public PermissaoPessoa alterar(PermissaoPessoa permissaoPessoa) {
        permissaoPessoa.setDataAtualizacao(new Date());
        return permissaoPessoaRepository.saveAndFlush(permissaoPessoa);
    }
    
    public void excluir(Long id) {
        PermissaoPessoa permissaoPessoa = permissaoPessoaRepository.findById(id).get();
        permissaoPessoaRepository.delete(permissaoPessoa);
    }
}
