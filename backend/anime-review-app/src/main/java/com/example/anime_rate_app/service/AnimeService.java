package com.example.anime_rate_app.service;

import com.example.anime_rate_app.exceptions.AnimeNaoEncontradoException;
import com.example.anime_rate_app.model.Anime;
import com.example.anime_rate_app.repository.AnimeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimeService {

    private AnimeRepository animeRepository;

    public AnimeService(AnimeRepository animeRepository){
        this.animeRepository = animeRepository;
    }

    public List<Anime> listarAnimes(){
        return animeRepository.findAll();
    }

    public Anime buscarPorId(Long id){
        return animeRepository.findById(id)
                .orElseThrow(() -> new AnimeNaoEncontradoException("Anime com o ID " + id + "não encontrado!"));
    }

    public Anime salvarAnime(Anime anime){
        return animeRepository.save(anime);
    }

    public void deletarAnime(Long id){
        if (!animeRepository.existsById(id)){
            throw new AnimeNaoEncontradoException("Anime com o ID " + id + "não encontrado!");
        }
        animeRepository.deleteById(id);
    }

    public Anime atualizarAnime(Long id, Anime anime) {
        Anime existente = buscarPorId(id);
        existente.setTitulo(anime.getTitulo());
        existente.setDescricao(anime.getDescricao());
        existente.setNota(anime.getNota());
        existente.setImagem(anime.getImagem());
        return animeRepository.save(existente);
    }

}
