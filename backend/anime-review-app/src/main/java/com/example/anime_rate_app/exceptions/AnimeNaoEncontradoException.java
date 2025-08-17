package com.example.anime_rate_app.exceptions;

public class AnimeNaoEncontradoException extends RuntimeException {

    public AnimeNaoEncontradoException(String mensagem){
        super(mensagem);
    }
}
