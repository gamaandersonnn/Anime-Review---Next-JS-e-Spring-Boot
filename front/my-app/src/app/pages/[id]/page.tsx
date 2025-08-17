'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimeBDEstrutura } from '../../types/AnimeType';
import { AnimeLocalService } from '../../service/AnimeLocalService';

type AnimeDetalhe = {
  id: string;
  titulo: string;
  imagem: string;
  descricao: string;
  nota: string;
};

export default function AnimeDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [anime, setAnime] = useState<AnimeDetalhe | null>(null);
  const [editando, setEditando] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [nota, setNota] = useState('');
  const animeLocalService = new AnimeLocalService();

  useEffect(() => {
  if (!id) return; // evita chamada com id inválido

  animeLocalService.listarPorId(id)
    .then((response) => {
      setAnime(response.data);
      setDescricao(response.data.descricao);
      setNota(response.data.nota);
    })
    .catch((error) => {
      console.error("Erro ao listar animes:", error);
    });
    }, [id]);

    const excluirAnime = async () => {
      await animeLocalService.deletar(Number(id));
      alert(`Anime ${anime?.titulo} excluído com sucesso!`);
      router.push('/');
    };

    const alterarAnime = async () => {
      if (anime) {
        await animeLocalService.alterar(id as unknown as number, {
          titulo: anime.titulo,
          descricao,
          nota,
          imagem: anime.imagem,
        });
        setAnime({ ...anime, descricao, nota });
      }
      setEditando(false);
    };


  return (
    <div className="min-h-screen bg-[#051824] flex flex-col items-center">
      {/* Header */}
      <header className="w-full mt-30 max-w-2xl flex items-center py-6 px-4">
        <button
          className="bg-slate-800 text-[#00ffbb] font-bold py-2 px-6 rounded hover:bg-slate-600 transition"
          onClick={() => router.push('/')}
        >
          ← Voltar para lista
        </button>
        <h1 className="flex-1 text-center text-[#00ffbb] text-2xl font-bold">Detalhes do Anime</h1>
      </header>

      {/* Card principal */}
      <div className="bg-slate-800 rounded-xl shadow-xl h-127 w-full max-w-2xl flex flex-col items-center p-8">
        <div className="flex flex-row w-full gap-8 items-start">
          {/* Imagem */}
          <img
            src={anime?.imagem || '/fallback-image.png'}
            alt={anime?.titulo}
            width={200}
            className="rounded-xl shadow-lg border-4 border-[#00ffbb]"
            onError={e => (e.currentTarget.src = '/fallback-image.png')}
          />
          {/* Descrição e nota */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-[#00ffbb] text-3xl font-bold mb-2">{anime?.titulo}</h2>
            {editando ? (
              <>
                <label className="text-[#00ffbb]  font-medium mt-2">Nota:</label>
                <input
                  className="text-[#00ffbb] bg-slate-700 p-2 rounded mb-2 w-full border border-[#00ffbb] focus:outline-none focus:ring-2 focus:ring-[#00ffbb]"
                  type="number"
                  min={0}
                  max={5}
                  value={nota}
                  onChange={e => setNota(e.target.value)}
                />
                <label className="text-[#00ffbb]  font-medium">Descrição:</label>
                <textarea
                  className="text-[#00ffbb] break-words whitespace-pre-line bg-slate-700 p-2 rounded mb-2 w-full border border-[#00ffbb] focus:outline-none focus:ring-2 focus:ring-[#00ffbb] focus:text-[#00ffbb]"
                  value={descricao}
                  maxLength={200}
                  rows={5}
                  onChange={e => setDescricao(e.target.value)}
                  
                />
                <div className="text-right text-xs text-[#00ffbb] -mb-20">
                {descricao.length}/200 caracteres
                </div>
              </>
            ) : (
              <>
                <p className="text-[#00ffbb] mb-2">Sua nota: <span className="font-bold">{anime?.nota}</span></p>
                <div className="rounded-lg  mb-2">
                  <p className="text-[#00ffbb] font-medium">Descrição:</p>
                  <p className="text-[#00ffbb] break-all whitespace-pre-line">{anime?.descricao}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Botões */}
        <div className="flex gap-4 w-full mt-20">
          {editando ? (
            <>
              <button
                className="bg-[#00ffbb] text-[#051824] font-bold py-2 px-4 rounded hover:bg-[#00cc99] transition w-full "
                onClick={alterarAnime}
              >
                Salvar
              </button>
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition w-full"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-[#00ffbb] text-[#051824] font-bold py-2 px-4 rounded hover:bg-[#00cc99] transition w-full"
                onClick={() => setEditando(true)}
              >
                Alterar
              </button>
              <button
                className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition w-full"
                onClick={excluirAnime}
              >
                Excluir Anime
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}