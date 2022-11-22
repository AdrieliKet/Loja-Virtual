package com.dev.backend.controller;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.service.PessoaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cliente")
public class PessoaClienteController {

    @Autowired
    private PessoaClienteService pessoaClienteService;

    @PostMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Pessoa inserir(@RequestBody PessoaClienteRequestDTO pessoaCliente) {
        return pessoaClienteService.registrar(pessoaCliente);
    }

//    @PutMapping("/")
//    public Pessoa alterar(@RequestBody Pessoa pessoa) {
//        return pessoaService.alterar(pessoa);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
//        pessoaService.excluir(id);
//        return ResponseEntity.ok().build();
//    }
}
