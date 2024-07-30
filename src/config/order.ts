import { cancelOrderSchema, eventTypeSchema, orderResponseSchema, ordersResponseSchema } from "@/types/order";
import api from "@/utils/api";
import { z } from "zod";

export class Order {
    private url: string;
    private authorization: string;
    private placeId: string;

    constructor(authorization: string, placeId: string, url = "https://api.quero.io") {
        this.url = url;
        this.authorization = authorization;
        this.placeId = placeId;
    }

    async getAll(eventType: z.infer<typeof eventTypeSchema>): Promise<z.infer<typeof ordersResponseSchema>[]> {
        const response = await api(this.url, this.authorization).get(`/orders/events:polling?placeId=${this.placeId}&eventType=${eventType}`);
        return ordersResponseSchema.array().parse(response.data);
    }

    async get(orderId: string): Promise<z.infer<typeof orderResponseSchema>> {
        const response = await api(this.url, this.authorization).get(`/orders?placeId=${this.placeId}&orderId=${orderId}`);

        return orderResponseSchema.parse(response.data);
    }

    async accept(orderId: string): Promise<boolean> {
        try {
        const res = await api(this.url, this.authorization).post(`/orders/${orderId}/confirm`, { placeId: this.placeId });
        return res.status === 202;
        } catch (error: any) {
            throw new Error('Erro ao aceitar o pedido: ' + orderId);
        }
    }

    async deliveryCompleted(orderId: string): Promise<boolean> {
        try {
        const res = await api(this.url, this.authorization).post(`/orders/${orderId}/delivery-completed`, { placeId: this.placeId });
        return res.status === 202;
        } catch (error: any) {
            throw new Error('Erro ao confirmar a entrega do pedido: ' + orderId);
        }
    }

    async dispatch(orderId: string): Promise<boolean> {
        try {
        const res = await api(this.url, this.authorization).post(`/orders/${orderId}/dispatch`, { placeId: this.placeId });
        return res.status === 202;
        } catch (error: any) {
            throw new Error('Erro ao despachar o pedido: ' + orderId);
        }
    }

    async readyForPickup(orderId: string): Promise<boolean> {
        try {
        const res = await api(this.url, this.authorization).post(`/orders/${orderId}/ready-for-pickup`, { placeId: this.placeId });
        return res.status === 202;
        } catch (error: any) {
            throw new Error('Erro ao confirmar o pedido para retirada: ' + orderId);
        }
    }

    async requestCancellation({ orderId, reason, code, mode, outOfStockItems, invalidItems }: z.infer<typeof cancelOrderSchema>): Promise<boolean> {
        try {
        const res = await api(this.url, this.authorization).post(`/orders/${orderId}/request-cancellation?placeId=${this.placeId}`, {
            reason,
            code,
            mode,
            outOfStockItems,
            invalidItems,
        });
        return res.status === 202;
        } catch (error: any) {
            throw new Error('Erro ao solicitar o cancelamento do pedido: ' + orderId);
        }
    }
}