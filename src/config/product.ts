import api from '@/utils/api';
import { z } from 'zod';

import { productGetSchema, productResponse, productCreateSchema, productUpdateSchema } from '@/types/product';


export class Product {
    private url: string;
    private authorization: string;
    private placeId: string;

    constructor(authorization: string, placeId: string, url = 'https://api.quero.io') {
        this.url = url;
        this.authorization = authorization;
        this.placeId = placeId;
    }

    async get({
        produtoId,
        codigoBarras,
        codigoInterno,
        limit,
        offset,
    }: z.infer<typeof productGetSchema>): Promise<z.infer<typeof productResponse>> {
        const response = await api(this.url, this.authorization).get('/produto', {
            params: {
                placeId: this.placeId,
                produtoId,
                codigoBarras,
                codigoInterno,
                limit,
                offset,
            },
        });

        return productResponse.parse(response.data);
    }
    async create( data: z.infer<typeof productCreateSchema>): Promise<z.infer<typeof productResponse>> {
        if (data.isSazonal) {
            if (data.preco === undefined || data.precoAntigo === undefined) {
                throw new Error('preco e precoAntigo são obrigatórios para produtos sazonais');
            }
    
            const percent = ((data.preco - data.precoAntigo) / data.precoAntigo) * 100;
            if (Math.abs(percent) < 15) {
                throw new Error('Para o produto entrar no Quero Desconto, o desconto entre o preço antigo e o preço deve ser de no mínimo 15%');
            }
        }
        const response = await api(this.url, this.authorization).post(`/produto?placeId=${this.placeId}`, data);
        return productResponse.parse(response.data);
    }

    async update(data: z.infer<typeof productUpdateSchema>): Promise<boolean> {
        if (!data.produtoId && !data.codigoBarras && !data.codigoInterno) {
            throw new Error('produtoId, codigoBarras ou codigoInterno é obrigatório');
        }
    
        if (data.isSazonal) {
            if (data.preco === undefined || data.precoAntigo === undefined) {
                throw new Error('preco e precoAntigo são obrigatórios para produtos sazonais');
            }
    
            const percent = ((data.preco - data.precoAntigo) / data.precoAntigo) * 100;
            if (Math.abs(percent) < 15) {
                throw new Error('Para o produto entrar no Quero Desconto, o desconto entre o preço antigo e o preço deve ser de no mínimo 15%');
            }
        }
    
        const query = data.produtoId ? `produtoId=${data.produtoId}` : data.codigoBarras ? `codigoBarras=${data.codigoBarras}` : `codigoInterno=${data.codigoInterno}`;
    
        const response = await api(this.url, this.authorization).put(`/produto?placeId=${this.placeId}&${query}`, data);
    
        return z.object({ r: z.boolean() }).parse(response.data).r;
    }

    async delete({ produtoId, codigoBarras, codigoInterno }: z.infer<typeof productGetSchema>): Promise<boolean> {
        if (!produtoId && !codigoBarras && !codigoInterno) {
            throw new Error('produtoId, codigoBarras ou codigoInterno é obrigatório');
        }

        const query = produtoId ? `produtoId=${produtoId}` : codigoBarras ? `codigoBarras=${codigoBarras}` : `codigoInterno=${codigoInterno}`;

        const response = await api(this.url, this.authorization).delete(`/produto?placeId=${this.placeId}&${query}`);
        return response.status === 204;
    }
}