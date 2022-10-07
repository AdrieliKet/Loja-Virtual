package com.dev.backend.service;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.repository.PessoaClienteRepository;
import com.dev.backend.repository.PessoaRepository;
import net.bytebuddy.build.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PessoaGerenciamentoService {
	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private EmailService emailService;

	public String solicitarCodigo(String email) {
		Pessoa pessoa = pessoaRepository.findByEmail(email);
		pessoa.setCodigoRecuperacaoSenha(getCodigoRecuperacaoSenha(pessoa.getId()));
		pessoa.setDataEnvioCodigo(new Date());
		pessoaRepository.saveAndFlush(pessoa);
		emailService.enviarEmailTexto(pessoa.getEmail(), "Código de recuperação de senha",
				"Olá, este é o seu código para recuperação de senha: " + pessoa.getCodigoRecuperacaoSenha());
		return "Código enviado!";
	}

	private String getCodigoRecuperacaoSenha(Long id) {
		DateFormat format = new SimpleDateFormat("ddMMyyyyHHmmss");
		return format.format(new Date()) + id;
	}

	public String alterarSenha(Pessoa pessoa) {
		Pessoa pessoaBanco = pessoaRepository.findByEmailAndCodigoRecuperacaoSenha(pessoa.getEmail(),
				pessoa.getCodigoRecuperacaoSenha());
		if (pessoaBanco != null && pessoaBanco.getEmail() != null && pessoaBanco.getCodigoRecuperacaoSenha() != null) {
			Date diferenca = new Date(new Date().getTime() - pessoaBanco.getDataEnvioCodigo().getTime());
			if (diferenca.getTime() / 1000 < 900) {
				pessoaBanco.setSenha(pessoa.getSenha());
				pessoaBanco.setCodigoRecuperacaoSenha(null);
				pessoaRepository.saveAndFlush(pessoaBanco);
				return "Senha alterada com sucesso!";
			} else {
				return "Tempo expirado, solicite um novo código";
			}
		} else {
			return "Email ou código não encontrado";
		}
	}

}