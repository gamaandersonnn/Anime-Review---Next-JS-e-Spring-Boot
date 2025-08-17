
import React from "react";
import { useState} from "react";
import Image from "next/image";
import '../../globals.css';
import SearchIcon from '../../assets/searchIcon.png'

interface PesquisarInputProps {
    pesquisar: string;
    setPesquisar: (value: string) => void;
}

export default function PesquisarInput({ pesquisar, setPesquisar }: PesquisarInputProps) {

    const [iconePesquisarAtivo, setIconePesquisarAtivo] = useState(false);

    const alternarIcone = () => {
        setIconePesquisarAtivo(!iconePesquisarAtivo);
    };
    

    return (
        <>
            {!iconePesquisarAtivo && (
                <button className="mt-2 mr-7" onClick={alternarIcone}>
                    <Image src={SearchIcon} alt="Pesquisar" width={70} height={70} />
                </button>
            )}

            {iconePesquisarAtivo && (
                <form>
                    <div className="text-[#00ffbb]">
                        <input className="border-0 p-4 w-60 h-10 mr-8 font-medium focus:outline-none focus:ring-2 focus:ring-[#00ffbb] focus:border-transparent bg-[#051824] rounded-md"
                            type='search'
                            autoFocus
                            placeholder="Pesquisar um anime"
                            value={pesquisar}
                            onChange={(e) => setPesquisar(e.target.value)}
                            {...pesquisar.length == 0 ? { onBlur: alternarIcone } : {}}
                        />
                    </div>
                    

                </form>

            )}
        </>
    )
}
