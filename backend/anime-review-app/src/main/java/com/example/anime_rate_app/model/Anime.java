package com.example.anime_rate_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "animes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Anime {

    @Id
    private Long id;

    private String titulo;
    private String descricao;
    private int nota;
    private String imagem;
}
