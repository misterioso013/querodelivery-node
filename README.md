# Quero Delivery API Client

Este projeto é uma biblioteca TypeScript para interagir com a API do Quero Delivery, permitindo operações com categorias, produtos e pedidos.

> Você pode consultar a documentação da API do Quero Delivery em [https://api.quero.io/documentation](https://api.quero.io/documentation).

## Instalação

Para instalar a biblioteca, use o npm, yarn ou outro gerenciador de pacotes de sua preferência.:

```bash
npm install querodelivery
```

## Uso

### Inicialização

Para utilizar a biblioteca, você precisa inicializar a classe `Quero` com seu token de autorização, `placeId`, e opcionalmente a URL da API.

```typescript
import { Quero } from 'querodelivery';

const authorization = 'YOUR_AUTHORIZATION_TOKEN';
const placeId = 'YOUR_PLACE_ID';

const quero = new Quero(authorization, placeId);
```

> O token de autorização e o `placeId` precisam ser solicitados ao suporte do Quero Delivery.

### Categorias

#### Listar Categorias

```typescript
const categories = await quero.category().list({ limit: 10, offset: 0 });
console.log(categories);
```

#### Obter Categoria por ID

```typescript
const category = await quero.category().get('CATEGORY_ID');
console.log(category);
```

#### Criar Categoria

```typescript
const newCategory = await quero.category().create({
    nome: 'Nova Categoria',
    isAtivo: true,
    parentId: 'PARENT_ID_OPTIONAL'
});
console.log(newCategory);
```

#### Atualizar Categoria

```typescript
const updated = await quero.category().update('CATEGORY_ID', {
    nome: 'Categoria Atualizada',
    isAtivo: false
});
console.log(updated);
```

#### Deletar Categoria

```typescript
const deleted = await quero.category().delete('CATEGORY_ID');
console.log(deleted);
```

### Produtos

#### Obter Produto

```typescript
const product = await quero.product().get({ produtoId: 'PRODUCT_ID' });
console.log(product);
```

#### Criar Produto

```typescript
const newProduct = await quero.product().create({
    nome: 'Novo Produto',
    categoriaId: 'CATEGORY_ID',
    preco: 10.0,
    precoAntigo: 12.0,
    isPesavel: false,
    isPromocao: true,
    isSazonal: false
});
console.log(newProduct);
```

#### Atualizar Produto

```typescript
const updated = await quero.product().update({
    produtoId: 'PRODUCT_ID',
    nome: 'Produto Atualizado',
    preco: 9.0
});
console.log(updated);
```

#### Deletar Produto

```typescript
const deleted = await quero.product().delete({ produtoId: 'PRODUCT_ID' });
console.log(deleted);
```

### Pedidos

#### Obter Todos os Pedidos

```typescript
const orders = await quero.order().getAll('CREATED');
console.log(orders);
```

#### Obter Pedido por ID

```typescript
const order = await quero.order().get('ORDER_ID');
console.log(order);
```

#### Aceitar Pedido

```typescript
const accepted = await quero.order().accept('ORDER_ID');
console.log(accepted);
```

#### Confirmar Entrega

```typescript
const deliveryCompleted = await quero.order().deliveryCompleted('ORDER_ID');
console.log(deliveryCompleted);
```

#### Despachar Pedido

```typescript
const dispatched = await quero.order().dispatch('ORDER_ID');
console.log(dispatched);
```

#### Confirmar Pedido para Retirada

```typescript
const readyForPickup = await quero.order().readyForPickup('ORDER_ID');
console.log(readyForPickup);
```

#### Solicitar Cancelamento

```typescript
const cancellationRequested = await quero.order().requestCancellation({
    orderId: 'ORDER_ID',
    reason: 'Motivo do Cancelamento',
    code: 'SYSTEMIC_ISSUES',
    mode: 'MANUAL'
});
console.log(cancellationRequested);
```

Todos os retornos foram tratados com [zod](https://zod.dev/) para garantir a integridade dos dados, então você pode confiar que os dados estão no formato correto. Mas lembre-se de consultar a documentação da API para entender melhor o que cada método faz e quais são os parâmetros necessários. E em caso de erros não previstos, você pode considerar contribuir com a biblioteca para melhorar a experiência de uso.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.