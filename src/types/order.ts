import { z } from "zod";

export const eventTypeSchema = z.enum(["CREATED", "CONFIRMED", "DISPATCHED", "READY_FOR_PICKUP", "PICKUP_AREA_ASSIGNED", "CONCLUDED", "CANCELLED", "CANCELLATION_REQUESTED", "CANCELLATION_REQUEST_DENIED", "ORDER_CANCELLATION_REQUEST", "DELIVERED", "CANCELLATION_DENIED"]);
const typeOfPaymentSchema = z.enum(["CREDIT", "DEBIT", "CASH", "OTHER"]);

export const ordersResponseSchema = z.object({
    orderId: z.string(),
    orderCode: z.string(),
    typeOfPayment: typeOfPaymentSchema,
    totalPrice: z.number(),
    status: eventTypeSchema,
    createdAt: z.string(),
});

export const orderResponseSchema = z.object({
    id: z.string(),
    type: z.enum(["DELIVERY", "TAKEOUT"]),
    displayId: z.string(),
    sourceAppId: z.string(),
    createdAt: z.string(),
    lastEvent: z.enum(["CREATED", "CONFIRMED", "DISPATCHED", "READY_FOR_PICKUP", "PICKUP_AREA_ASSIGNED", "CONCLUDED", "CANCELLED", "CANCELLATION_REQUESTED", "CANCELLATION_REQUEST_DENIED", "ORDER_CANCELLATION_REQUEST", "DELIVERED", "CANCELLATION_DENIED"]), // not documented
    orderTiming: z.enum(["INSTANT"]),
    preparationStartDateTime: z.string(),
    merchant: z.object({
        id: z.string(),
        name: z.string(),
    }),
    items: z.array(z.object({
        id: z.string(),
        index: z.number(),
        name: z.string(),
        externalCode: z.string(),
        unit: z.enum(["UNIT"]),
        ean: z.string(),
        quantity: z.number(),
        specialInstructions: z.string(),
        unitPrice: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        optionsPrice: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        totalPrice: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        options: z.array(z.object({})),// not documented
    })),
    otherFees: z.array(z.object({
        name: z.string(),
        type: z.enum(["DELIVERY_FEE", "SERVICE_FEE", "TIP"]),
        receivedBy: z.enum(["MERCHANT", "MARKETPLACE", "LOGISTIC_SERVICES"]),
        receiverDocument: z.string(),
        price: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        observation: z.string(),
    })),
    discounts: z.array(z.object({
        amount: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        target: z.string(),
        targetId: z.string(),
        sponsorshipValues: z.array(z.object({
            name: z.union([z.string(), z.object({})]),
            amount: z.object({
                value: z.number(),
                currency: z.enum(["BRL"]),
            }),
        })),
    })),
    total: z.object({
        itemsPrice: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        otherFees: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        discount: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
        orderAmount: z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
        }),
    }),
    payments: z.object({
        prepaid: z.number(),
        pending: z.number(),
        methods: z.array(z.object({
            value: z.number(),
            currency: z.enum(["BRL"]),
            type: z.enum(["PREPAID", "PENDING"]),
            method: z.enum(["CREDIT", "DEBIT", "CASH", "OTHER"]),
            methodInfo: z.string(),
            changeFor: z.number(),
        })),
    }),
    customer: z.object({
        id: z.string(),
        phone: z.object({
            number: z.string(),
            extension: z.string(),
        }),
        name: z.string(),
        documentNumber: z.string(),
        ordersCountOnMerchant: z.union([z.number(), z.string()]), // inconsistent in the documentation
    }),
    delivery: z.object({
        deliveredBy: z.enum(["MERCHANT", "LOGISTIC_SERVICES"]), // not documented
        deliveryAddress: z.object({
            country: z.string(),
            state: z.string(),
            city: z.string(),
            district: z.string(),
            street: z.string(),
            number: z.string(), // not documented
            complement: z.string(),
            reference: z.string(),
            formattedAddress: z.string(),
            postalCode: z.string(),
            coordinates: z.object({
                latitude: z.number(),
                longitude: z.number(),
            }),
        }),
        estimatedDeliveryDateTime: z.string(),
        deliveryDateTime: z.string(),
    }),
    extraInfo: z.string(),
    takeout: z.object({}), // not documented
    isSeparated: z.boolean(), // not documented
});

export const cancelOrderSchema = z.object({
    orderId: z.string(),
    reason: z.string(),
    code: z.enum(["SYSTEMIC_ISSUES", "DUPLICATE_APPLICATION", "UNAVAILABLE_ITEM", "RESTAURANT_WITHOUT_DELIVERY_MAN", "OUTDATED_MENU", "ORDER_OUTSIDE_THE_DELIVERY_AREA", "BLOCKED_CUSTOMER", "OUTSIDE_DELIVERY_HOURS", "INTERNAL_DIFFICULTIES_OF_THE_RESTAURANT", "RISK_AREA"]),
    mode: z.enum(["MANUAL", "AUTO"]),
    outOfStockItems: z.union([z.array(z.string()), z.object({})]).optional(),
    invalidItems: z.union([z.array(z.string()), z.object({})]).optional(),
});