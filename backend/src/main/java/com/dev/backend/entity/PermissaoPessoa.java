package com.dev.backend.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Entity
@Table(name="cidade")
@Data
public class PermissaoPessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAtualizacao;
    private String excluir_logico;
    
    @ManyToOne
    @JoinColumn(name="idPessoa")
    @JsonIgnore
    private Pessoa pessoa;
    
    @ManyToOne
    @JoinColumn(name="idPermissao")
    private Permissao permissao;
    

}
