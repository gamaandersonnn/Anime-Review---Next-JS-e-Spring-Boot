package com.example.anime_rate_app.controller;

import com.example.anime_rate_app.model.Anime;
import com.example.anime_rate_app.service.AnimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/anime")
@CrossOrigin
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @GetMapping
    public List<Anime> listarAnimes(){
        return animeService.listarAnimes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarAnime(@PathVariable Long id){
        Anime anime = animeService.buscarPorId(id);
        return ResponseEntity.ok(anime);
    }

    @PostMapping
    public Anime salvarAnime(@RequestBody Anime anime){
        return animeService.salvarAnime(anime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAnime(@PathVariable Long id){
        animeService.deletarAnime(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Anime> atualizarAnime(@PathVariable Long id, @RequestBody Anime anime) {
        Anime atualizado = animeService.atualizarAnime(id, anime);
        return ResponseEntity.ok(atualizado);
    }


}
