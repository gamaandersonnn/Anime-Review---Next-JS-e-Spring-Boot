import React, { useState } from 'react';
import { AnimeLocalService } from '@/app/service/AnimeLocalService';

type AdicionarAnimeProps = {
    animeId: string;
    animeNome: string;
    animeImagem?: string;
    setPesquisar: (value: string) => void;
    
    onAdicionarAnime: (anime: {id : string, titulo: string; descricao: string; nota : string; imagem : string}) => void;
    fechar: () => void;
};

export default function AdicionarAnime({animeId, animeNome, animeImagem, onAdicionarAnime, fechar, setPesquisar }: AdicionarAnimeProps) {
    const [descricao, setDescricao] = useState('');
    const [nota, setNota] = useState('');
    const animeLocalService = new AnimeLocalService();
    
        
    const salvarAnime = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!animeNome.trim()) return;

        const novoAnime = {
            id: animeId,
            titulo: animeNome,
            descricao,
            nota,
            imagem: animeImagem ?? '/fallback-image.png',
        };

        try {
            await animeLocalService.inserir(novoAnime);
            onAdicionarAnime(novoAnime);
            setDescricao('');
            setNota('');
            alert(`Anime adicionado: ${animeNome}`);
            fechar();
            setPesquisar('');
            
        } catch (error) {
            alert('Erro ao adicionar anime. ' + error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={fechar}
            />
            {/* Modal */}
            <form
                onSubmit={salvarAnime}
                className="relative z-10 bg-[#051824] p-8 rounded-xl shadow-xl flex flex-col gap-4 w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-[#00ffbb] text-2xl font-bold mb-2 text-center">Adicionar Anime</h2>
                <label className="text-[#00ffbb] font-medium">Título do Anime</label>
                <h3 className="text-[#00ffbb] font-bold text-xl mb-2">{animeNome}</h3>
                <label className="text-[#00ffbb] font-medium">Nota de 1 a 5:</label>
                <input
                    className="text-[#00ffbb] p-2 rounded"
                    type="number"
                    value={nota}
                    required
                    min={0}
                    max={5}
                    step={1}
                    onChange={e => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                    setNota(value === "" ? "" : String(parseInt(value, 10)));
                }
                }}
                    placeholder="Compartilhe sua nota"
                />
                <label className="text-[#00ffbb] font-medium">Descrição:</label>
                <textarea
                    className="text-[#00ffbb] p-2 rounded"
                    rows={5}
                    value={descricao}
                    required
                    maxLength={200}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder="Compartilhe sua opinião"
                />
                <div className="text-right text-xs text-[#00ffbb] mb-2">
                {descricao.length}/200 caracteres
                </div>
                
                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className="bg-[#00ffbb] text-[#051824] font-bold py-2 px-4 rounded hover:bg-[#00cc99] transition w-full"
                    >
                        Adicionar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition w-full"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}   