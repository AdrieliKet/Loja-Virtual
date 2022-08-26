package com.dev.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dev.backend.entity.Marca;



public interface MarcaRepository extends JpaRepository<Marca, Long> {

    @Query(value = "select a from Marca a where a.descricao like %?1%")
    Page<Marca> findByDescricao(String descricao, Pageable page);

    Page<Marca> findAll(Pageable pageable);

}
