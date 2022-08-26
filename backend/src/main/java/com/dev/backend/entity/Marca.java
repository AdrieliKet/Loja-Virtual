package com.dev.backend.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name = "marcas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Data
public class Marca implements Serializable {
    private static final long serialVersionUID = 4048798961366546485L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @CreationTimestamp
    private Timestamp dataCadastro;

    @UpdateTimestamp
    private Timestamp dataModificacao;

}
