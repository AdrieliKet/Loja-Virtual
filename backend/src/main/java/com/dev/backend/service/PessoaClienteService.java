package com.dev.backend.service;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.repository.PessoaClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PessoaClienteService {
    @Autowired
    private PessoaClienteRepository pessoaClienteRepository;

    @Autowired
    private PermissaoPessoaService permissaoPessoaService;

    @Autowired
    private  EmailService emailService;

    private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);


    public Pessoa registrar(PessoaClienteRequestDTO pessoaCliente) {
        Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaCliente);
        if (!StringUtils.isEmpty(pessoa.getNome()) && validarCPF(pessoa.getCpf())) {
            Matcher matcher = pattern.matcher(pessoa.getEmail());
            if (!matcher.matches())
                pessoa.setEmail("");
//			pessoa.setImagemPerfil(Base64.getEncoder().encode(pessoa.getImagemPerfil()));;
            pessoa.setDataCriacao(new Date());
        }
        Pessoa pessoaNovo = pessoaClienteRepository.saveAndFlush(pessoa);
        permissaoPessoaService.vincularPessoaPermissaoCliente(pessoaNovo);
        emailService.enviarEmailtexto(pessoaNovo.getEmail(), "cadastro na Loja", "O registro na loja foi realizado com sucesso. Em breve você receberá a senha de acesso por e-mail!");
        return pessoaNovo;
    }

//	public Pessoa alterar(Pessoa pessoa) {
//		if (!StringUtils.isEmpty(pessoa.getNome()) && validarCPF(pessoa.getCpf())) {
//			Matcher matcher = pattern.matcher(pessoa.getEmail());
//			if (!matcher.matches())
//				pessoa.setEmail("");
////			pessoa.setImagemPerfil(Base64.getEncoder().encode(pessoa.getImagemPerfil()));;
//			pessoa.setSenha(new BCryptPasswordEncoder().encode(pessoa.getSenha()));
//			pessoa.setDataAtualizacao(new Date());
//		}
//		return pessoaRepository.saveAndFlush(pessoa);
//	}
//
//	public void excluir(Long id) {
//		Pessoa pessoa = pessoaRepository.findById(id).get();
//		pessoaRepository.delete(pessoa);
//	}

    public static boolean validarCPF(String CPF) {

        if (CPF.equals("00000000000") || CPF.equals("11111111111") || CPF.equals("22222222222")
                || CPF.equals("33333333333") || CPF.equals("44444444444") || CPF.equals("55555555555")
                || CPF.equals("66666666666") || CPF.equals("77777777777") || CPF.equals("88888888888")
                || CPF.equals("99999999999") || (CPF.length() != 11))
            return (false);

        char dig10, dig11;
        int sm, i, r, num, peso;

        try {
            sm = 0;
            peso = 10;
            for (i = 0; i < 9; i++) {
                num = (int) (CPF.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso - 1;
            }

            r = 11 - (sm % 11);
            if ((r == 10) || (r == 11))
                dig10 = '0';
            else
                dig10 = (char) (r + 48);

            sm = 0;
            peso = 11;
            for (i = 0; i < 10; i++) {
                num = (int) (CPF.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso - 1;
            }

            r = 11 - (sm % 11);
            if ((r == 10) || (r == 11))
                dig11 = '0';
            else
                dig11 = (char) (r + 48);

            if ((dig10 == CPF.charAt(9)) && (dig11 == CPF.charAt(10)))
                return (true);
            else
                return (false);
        } catch (java.util.InputMismatchException erro) {
            return (false);
        }
    }
}