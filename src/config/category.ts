import { categoryResponse, listResponse } from "@/types/category";
import api from "@/utils/api";
import { z } from "zod";

export class Category {
    private url: string;
    private authorization: string;
    private placeId: string;

    constructor(authorization: string, placeId: string, url = "https://api.quero.io") {
        this.url = url;
        this.authorization = authorization;
        this.placeId = placeId;
    }
    
    async list({ limit, offset }: { limit?: number, offset?: number }): Promise<z.infer<typeof listResponse>> {
        const response = await api(this.url, this.authorization).get(`/categoria`, {
            params: {
                placeId: this.placeId,
                limit,
                offset
            }
        });
        return listResponse.parse(response.data);
    }

    async get(id: string): Promise<z.infer<typeof categoryResponse>> {
        const response = await api(this.url, this.authorization).get('/categoria/search', {
            params: {
                placeId: this.placeId,
                categoriaId: id
            }
        });

        return categoryResponse.parse(response.data);
    }

    async create({nome, isAtivo, parentId}: { nome: string, isAtivo: boolean, parentId?: string }): Promise<z.infer<typeof categoryResponse>> {
        const response = await api(this.url, this.authorization).post(`/categoria?placeId=${this.placeId}`, {
            nome,
            isAtivo,
            parentId
        });

        return categoryResponse.parse(response.data);
    }

    async update(id: string, { nome, isAtivo, parentId }: { nome?: string, isAtivo?: boolean, parentId?: string }): Promise<boolean> {
        try {
        const response = await api(this.url, this.authorization).put(`/categoria?placeId=${this.placeId}`, {
            nome,
            isAtivo,
            parentId
        }, {
            params: {
                categoriaId: id,
            }
        });

        return response.status === 204;
    } catch (e: any) {
        throw new Error('Erro ao atualizar categoria');
    }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const res = await api(this.url, this.authorization).delete(`/categoria/${id}?placeId=${this.placeId}`);

        return res.status === 204;
        } catch (e: any) {
            throw new Error('Erro ao deletar categoria');
        }
    }
}