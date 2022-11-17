package com.dev.backend.controller;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.service.PessoaClienteService;
import com.dev.backend.service.PessoaGerenciamentoService;

import lombok.extern.java.Log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/pessoa-gerenciamento")
public class PessoaGerenciamentoController {

    @Autowired
    private PessoaGerenciamentoService pessoaGerenciamentoService;

    @PostMapping("/senha-codigo")
    public String recuperarCodigo(@RequestBody Pessoa pessoa) {
    	try {
    		 return pessoaGerenciamentoService.solicitarCodigo(pessoa.getEmail());
    	} catch (Exception e){
    		return e.getMessage();
    	}
       
    }
    
    @PostMapping("/senha-alterar")
    public String alterarSenha(@RequestBody Pessoa pessoa ) {
        return pessoaGerenciamentoService.alterarSenha(pessoa);
    }

}
