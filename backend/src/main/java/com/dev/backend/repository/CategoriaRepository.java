package com.dev.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dev.backend.entity.Categoria;



public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query(value = "select a from Categoria a where a.descricao like %?1%")
    Page<Categoria> findByDescricao(String descricao, Pageable page);

    Page<Categoria> findAll(Pageable pageable);
}
