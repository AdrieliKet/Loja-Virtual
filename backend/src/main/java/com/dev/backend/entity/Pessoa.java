package com.dev.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pessoa")
@Data
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private String endereco;
    private String cep;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAtualizacao;
    private String excluir_logico;

    @ManyToOne
    @JoinColumn(name = "idCidade")
    private Cidade cidade;

    @OneToMany(mappedBy = "pessoa", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Setter(AccessLevel.NONE)
    private List<PermissaoPessoa> permissaoPessoas;

    public void setPermissaoPessoas(List<PermissaoPessoa> permissaoPessoaList) {
        for (PermissaoPessoa pessoa : permissaoPessoaList) {
            pessoa.setPessoa(this);
        }
    }

}
