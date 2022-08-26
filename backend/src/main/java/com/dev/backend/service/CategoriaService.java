package com.dev.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Categoria;
import com.dev.backend.repository.CategoriaRepository;


@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    private boolean existsById(Long id) {
        return categoriaRepository.existsById(id);
    }

    public Categoria findById(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElse(null);
        return categoria;
    }

    public Page<Categoria> findAll(Pageable pageable) {
        return categoriaRepository.findAll(pageable);
    }

    public Page<Categoria> findAllByNome(String descricao, Pageable page) {
        Page<Categoria> categorias = categoriaRepository.findByDescricao(descricao, page);
        return categorias;
    }

    public Categoria save(Categoria categoria) {
            Categoria categoriaNova = categoriaRepository.saveAndFlush(categoria);
            return categoriaNova;
            
    }

    public Categoria update(Categoria categoria) {
        return categoriaRepository.saveAndFlush(categoria);
        
    }

    public void deleteById(Long id) {
        Categoria categoria = categoriaRepository.findById(id).get();
        categoriaRepository.delete(categoria);
        
    }


}
