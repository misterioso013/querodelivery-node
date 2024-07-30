import { z } from "zod";

export const listResponse = z.object({
    r: z.literal(true),
    data: z.object({
        totalCount: z.number(),
        list: z.array(z.object({
            _id: z.string(),
            parentId: z.string().optional(),
            ancestors: z.array(z.string()),
            placeId: z.string(),
            nome: z.string(),
            isAtivo: z.boolean(),
            parentNome: z.string().optional(),
            createdAt: z.string(),
            imagem: z.object({
                publicId: z.string(),
                src: z.string(),
                version: z.union([z.string(), z.number()])

            })
        }))
    })
});

export const categoryResponse = z.object({
    r: z.literal(true),
    data: z.object({
        _id: z.string(),
        parentId: z.string().nullable().optional(),
        ancestors: z.array(z.string()),
        placeId: z.string(),
        nome: z.string(),
        isAtivo: z.boolean(),
        parentNome: z.string().optional(),
        createdAt: z.string(),
        imagem: z.object({
            publicId: z.string(),
            src: z.string(),
            version: z.union([z.string(), z.number()])
        }),
        isFolha: z.union([z.boolean(), z.literal(undefined)]),
        hasProdutos: z.union([z.boolean(), z.literal(undefined)]),
    })
});

