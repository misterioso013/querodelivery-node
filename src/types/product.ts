import { z } from "zod";

const statusSchema = z.enum(["ATIVO", "OCULTO", "EM_FALTA"]);

export const productGetSchema = z.object({
    produtoId: z.string().optional(),
    codigoBarras: z.string().optional(),
    codigoInterno: z.string().optional(),
    limit: z.number().min(1).max(50).optional(),
    offset: z.number().optional(),
});

export const productResponse = z.object({
    r: z.boolean(),
    data: z.object({
        produtos: z.array(
        z.object({
            _id: z.string(),
            placeId: z.string(),
            produtoCategoriaId: z.string(),
            nome: z.string(),
            descricao: z.string(),
            status: statusSchema,
            preco: z.number(),
            precoAntigo: z.number(),
            qtdEstoque: z.number(),
            isPromocao: z.boolean(),
            isSazonal: z.boolean(),
            isPesavel: z.boolean(),
            isAgendado: z.boolean(),
            isLimitedPromotionalProduct: z.boolean(),
            isRestrictedToStaff: z.boolean(),
            hasFreeDelivery: z.boolean(),
            isFirstPurchase: z.boolean(),
            controlaEstoque: z.boolean(),
            codigoInterno: z.string(),
            codigoBarras: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
            imagem: z.object({
                publicId: z.string(),
                src: z.string(),
                version: z.union([z.string(), z.number()]),
            }),
            variacoes: z.array(z.object({
                _id: z.string(),
            escolhaMax: z.number(),
            escolhaMin: z.number(),
            isAtivo: z.boolean(),
            nome: z.string(),
            tipoCalculo: z.string(), // SOMA_TOTAL
            opcoes: z.array(z.object({
                _id: z.string(),
                nome: z.string(),
                ordemExibicao: z.number(),
                preco: z.number(),
                status: statusSchema,
              })),
            }).optional()),
            valorCashback: z.number(),
            cashbackAtivo: z.boolean(),
        }),
    )
}),
});

// cadastrar produto
export const productCreateSchema = z.object({
    nome: z.string().min(3),
    categoriaId: z.string(),
    descricao: z.string().min(3).optional(),
    status: statusSchema,
    preco: z.number().min(0.01),
    precoAntigo: z.number(),
    codigoBarras: z.string().optional(),
    codigoInterno: z.string().optional(),
    isPesavel: z.boolean(),
    isPromocao: z.boolean(),
    isSazonal: z.boolean(),
    variacoes: z.array(z.object({
        nome: z.string(),
        escolhaMin: z.number(),
        escolhaMax: z.number(),
        tipoCalculo: z.string(),
        opcoes: z.array(z.object({
            nome: z.string(),
            preco: z.number(),
        })),
    })).optional(),
})

// atualizar produto
export const productUpdateSchema = z.object({
    produtoId: z.string().optional(),
    nome: z.string().min(3).optional(),
    categoriaId: z.string().optional(),
    descricao: z.string().min(3).optional(),
    status: statusSchema.optional(),
    preco: z.number().min(0.01).optional(),
    precoAntigo: z.number().optional(),
    codigoBarras: z.string().optional(),
    codigoInterno: z.string().optional(),
    isPesavel: z.boolean().optional(),
    isPromocao: z.boolean().optional(),
    isSazonal: z.boolean().optional(),
    variacoes: z.array(z.object({
        nome: z.string(),
        escolhaMin: z.number(),
        escolhaMax: z.number(),
        tipoCalculo: z.string(),
        opcoes: z.array(z.object({
            nome: z.string(),
            preco: z.number(),
        })),
    })).optional(),
    qtdMinimaParaVendaEmGramas: z.number().optional(),
})