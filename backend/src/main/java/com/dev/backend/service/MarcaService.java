package com.dev.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Marca;
import com.dev.backend.repository.MarcaRepository;


@Service
public class MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> buscarTodos() {
        return marcaRepository.findAll();
    }

    public Marca inserir(Marca marca) {
        Marca marcaNovo = marcaRepository.saveAndFlush(marca);
        return marcaNovo;
    }

    public Marca alterar(Marca marca) {
        return marcaRepository.saveAndFlush(marca);
    }

    public void excluir(Long id) {
        Marca marca = marcaRepository.findById(id).get();
        marcaRepository.delete(marca);
    }
}
