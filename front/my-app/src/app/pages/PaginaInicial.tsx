'use client';
import '../../app/globals.css';
import React from 'react';
import { ApiAnimeUrl } from '../api/ApiAnimeUrl';
import { useState, useEffect} from 'react';
import { AnimeBDEstrutura } from '../types/AnimeType';
import { AnimeDoResponse } from '../types/AnimeType';
import { AnimeLocalService } from '../service/AnimeLocalService';
import { useRouter } from 'next/navigation';
import PesquisarInput from '../components/BarraDePesquisa/component';
import AdicionarAnime from '../components/AdicionarAnime/component';

export default function PaginaInicial() {

  const animeLocalService = new AnimeLocalService();
  const [animeBancoDados, setAnimeBancoDados] = useState<AnimeBDEstrutura[]>([]);
  const [pesquisar, setPesquisar] = useState("");
  const [responseAnime, setResponseAnime] = useState<AnimeDoResponse>({data: []});
  const router = useRouter();
  const [animeNome, setAnimeNome] = useState("");
  const [animeId, setIdAnime] = useState("");
  const [animeImagem, setAnimeImagem] = useState("");
  const [mostrarAdicionarAnime, setMostrarAdicionarAnime] = useState(false);

  const handleAdicionarAnime = (anime: {id: string, titulo: string; descricao: string, nota : string }) => {
    
  };

  useEffect(() => {

    fetch(`${ApiAnimeUrl}anime?filter[text]=${pesquisar}`)
      .then((response) => response.json())
      .then((response) => {
        setResponseAnime(response);
      })

  }, [pesquisar]);

  useEffect(() => {
    animeLocalService.listarTodos()
      .then((response) => {
        setAnimeBancoDados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao listar animes:", error);
        setAnimeBancoDados([] as AnimeBDEstrutura[]);
      }
    );
  }, [animeBancoDados]);

  return (<div>

    {/* Header */}
      <div className="flex justify-between items-center h-28 p-10 bg-[#051824]">
        <div><button onClick={() => setPesquisar("")} className='cursor-pointer w-30'><h1 className="text-[#00ffbb] font-medium text-center">A N I M E S</h1></button></div>
        <div><PesquisarInput pesquisar={pesquisar} setPesquisar={setPesquisar} /></div>
      </div>

    {/* Conteúdo Principal */}
      <div className='flex'>
        {animeBancoDados.length === 0 ?
          <div className='pt-20 mr-auto ml-auto text-center'>
            <p className='text-[#00ffbb] text-6xl font-bold'>Nenhum Anime Encontrado!</p>
            <p className='text-[#00ffbb] pt-5'>Pesquise um Anime para classificar.</p>
          </div>
          :
          <div className='text-[#00ffbb] font-medium w-full'>
          <p className='text-[#00ffbb] ml-30 pt-5 mb-4'>Seus Animes Avaliados:</p>
          <div className="flex flex-wrap gap-6 justify-start px-5 py-5">
            {animeBancoDados.map(anime => (
              <div
                key={anime.id}
                className="bg-slate-800 ml-20 rounded-xl p-2 shadow flex flex-col items-center w-[240px] transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={() => router.push(`/pages/${anime.id}`)}
              >
                <img
                  src={anime.imagem}
                  alt={anime.titulo}
                  width={300}
                  className="mb-3 rounded"
                  onError={e => (e.currentTarget.src = '/fallback-image.png')}
                />
                <h3 className="text-[#00ffbb] text-lg font-bold mb-1 text-center">{anime.titulo}</h3>
                <p className="text-[#00ffbb] mb-1 text-center">Sua nota: <span className="font-bold">{anime.nota}</span></p>
              </div>
            ))}
          </div>
        </div>}
          {/* Barra de Pesquisa */}
          {pesquisar.length > 0 && (
              <div className="absolute top-26 p-4 bg-slate-800 text-[#00ffbb] w-[80%] rounded-xl left-1/2 -translate-x-1/2 gap-2">
                <p className='text-2xl text-start pb-4'>Resultados para: <span className='text-[#00ffbb] font-bold'>{pesquisar}</span></p>
                {
                  responseAnime.data.map((animes) => (
                    <div className="flex pb-3 gap-2" key={animes.id}>
                      <img className="pr-2"
                        src={animes.attributes.posterImage.small}
                        alt={animes.attributes.canonicalTitle}
                        width={100}
                      />
                      <button onClick={() => {
                        setAnimeNome(animes.attributes.canonicalTitle);
                        setIdAnime(animes.id);
                        setAnimeImagem(animes.attributes.posterImage.medium);
                        setMostrarAdicionarAnime(true);
                      }}
                      ><span>{animes.attributes.canonicalTitle}</span> </button>
                    </div>
                  ))
                }
              </div>
            )}
            {mostrarAdicionarAnime && (
              <AdicionarAnime
                animeNome={animeNome}
                animeId={animeId}
                animeImagem={animeImagem}
                setPesquisar={setPesquisar}
                onAdicionarAnime={handleAdicionarAnime}
                fechar={() => setMostrarAdicionarAnime(false)}
              />
            )}
      </div>
  </div>)
}