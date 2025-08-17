import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class AnimeLocalService {

    listarTodos() {
        return axiosInstance.get("/anime");
    }

    listarPorId(id: string) {
        return axiosInstance.get(`/anime/${id}`);
    }

    inserir(anime: {id : string, titulo: string; descricao: string; nota: string; imagem?: string}) {
        return axiosInstance.post("/anime", anime);
    }

    alterar(id : number , anime: {titulo: string; descricao: string; nota: string; imagem?: string}) {
        return axiosInstance.put(`/anime/${id}`, anime);
    }

    deletar(id: number) {
        return axiosInstance.delete(`/anime/${id}`);
    }
}