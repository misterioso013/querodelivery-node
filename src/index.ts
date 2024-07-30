import { Category } from "./config/category";
import { Product } from "./config/product";
import { Order } from "./config/order";

export class Quero {
    private authorization: string;
    private placeId: string;
    private url: string;

    constructor(authorization: string, placeId: string, url = "https://api.quero.io") {
        this.authorization = authorization;
        this.placeId = placeId;
        this.url = url;
    }

    category(): Category {
        return new Category(this.authorization, this.placeId, this.url);
    }

    product(): Product {
        return new Product(this.authorization, this.placeId, this.url);
    }

    order(): Order {
        return new Order(this.authorization, this.placeId, this.url);
    }
}