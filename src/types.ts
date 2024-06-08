export type Item = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export type PastOrderItem = {
  id: number;
  quantity: number;
};
export type PastOrderCard = {
  orderDate: string;
  orderId: number;
  items: PastOrderItem[];
};
