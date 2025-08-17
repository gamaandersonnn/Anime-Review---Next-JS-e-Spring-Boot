export interface AnimeBDEstrutura {
    id: string;
    titulo: string;
    descricao: string;
    nota: number;
    imagem?: string;
}

export interface AnimeApiEstrutura {
  id: string;
  attributes: {
    canonicalTitle: string;
    posterImage: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
    };
  };
};

export interface AnimeDoResponse {
  data: Animes[];
};