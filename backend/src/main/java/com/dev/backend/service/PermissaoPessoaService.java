package com.dev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.PermissaoPessoa;
import com.dev.backend.repository.PermissaoPessoaRepository;

@Service
public class PermissaoPessoaService {
    @Autowired
    private PermissaoPessoaRepository permissaoPessoaRepository;

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
