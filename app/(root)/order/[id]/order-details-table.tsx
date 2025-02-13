"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  createPayPalOrder,
  approvePayPalOrder,
} from "@/lib/actions/order.actions";

const OrderDetailsTable = ({
  order,
  paypalClientId,
}: {
  order: Order;
  paypalClientId: string;
}) => {
  const { toast } = useToast();

  const {
    shippingAddress,
    orderitems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "加载PayPal中...";
    } else if (isRejected) {
      status = "加载PayPal失败";
    }
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }

    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);

    toast({
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });
  };

  return (
    <>
      <h1 className="py-4 text-2xl"> Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="overflow-x-auto md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">支付方法</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  支付时间 {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">未支付</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">收货地址</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}{" "}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">未配送</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">订单详情</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商品</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>单价</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 space-y-4 gap-4">
              <h2 className="text-xl pb-4">Order Summary</h2>
              <div className="flex justify-between">
                <div>商品价</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>税费</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>运送费</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>总价</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/* PayPal Payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
