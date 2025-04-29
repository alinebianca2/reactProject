// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './login'

describe('Login Component', () => {
  test('deve exibir mensagem de sucesso ao inserir email e senha corretos', () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'eduardo.lino@pucpr.br' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Acessar'));

    expect(screen.getByText('Acessado com sucesso!')).toBeInTheDocument();
  });

  test('deve exibir mensagem de erro ao inserir email ou senha incorretos', () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Senha'), {
      target: { value: 'senhaerrada' },
    });
    fireEvent.click(screen.getByText('Acessar'));

    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
  });

  test('não deve exibir mensagem inicialmente', () => {
    render(<Login />);
    expect(screen.queryByText('Acessado com sucesso!')).not.toBeInTheDocument();
    expect(screen.queryByText('Usuário ou senha incorretos!')).not.toBeInTheDocument();
  });

  
  test('deve permitir digitar email e senha', () => {
    render(<Login />);
    
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputSenha = screen.getByPlaceholderText('Senha');
  
    fireEvent.change(inputEmail, { target: { value: 'teste@teste.com' } });
    fireEvent.change(inputSenha, { target: { value: '123456' } });
  
    expect(inputEmail.value).toBe('teste@teste.com');
    expect(inputSenha.value).toBe('123456');
  });

  test('deve exibir erro se email correto e senha incorreta', () => {
    render(<Login />);
  
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'eduardo.lino@pucpr.br' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'senhaerrada' } });
    
    fireEvent.click(screen.getByText('Acessar'));
  
    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
  });

  test('deve exibir erro se email incorreto e senha correta', () => {
    render(<Login />);
  
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'outroemail@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '123456' } });
  
    fireEvent.click(screen.getByText('Acessar'));
  
    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
  });
  
  
});
