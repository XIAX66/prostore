"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { prismaToObject } from "@/lib/utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((a, c) => a + Number(c.price) * c.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 300 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("未找到购物车");
    }

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in the database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("未找到产品");

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        sessionCartId,
        userId,
        items: [item],
        ...calcPrice([item]),
      });
      console.log(newCart);

      // Add to database
      await prisma.cart.create({ data: newCart });

      // RevalidatePath
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name}已添加到购物车`,
      };
    } else {
      // Check if item already exists
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      // Check if item exists
      if (existItem) {
        // Check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("库存不足");
        }
        // Increase quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty += 1;
      } else {
        // If item does not exist, add it
        // Check stock
        if (product.stock < 1) {
          throw new Error("库存不足");
        }
        // Add item to the cart.items
        cart.items.push(item);
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      console.log(existItem ? "更新" : "添加");

      return {
        success: true,
        message: `${product.name}已${existItem ? "更新" : "添加"}到购物车`,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: formatError(e),
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("未找到购物车");
  }

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return prismaToObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("未找到购物车");
    }

    // Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("未找到产品");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("未找到购物车");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("未找到商品");

    // Check if only 1 in qty
    if (exist.qty === 1) {
      // Remove from the cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find(
        (x) => x.productId === exist.productId
      )!.qty = exist.qty - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name}已从购物车中移除`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
