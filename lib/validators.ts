import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})/.test(formatNumberWithDecimal(Number(val))),
    "价格格式不正确"
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "商品名称至少3个字符"),
  slug: z.string().min(3, "商品slug至少3个字符"),
  category: z.string().min(3, "商品类别至少3个字符"),
  brand: z.string().min(3, "商品品牌至少3个字符"),
  description: z.string().min(10, "商品描述至少10个字符"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "至少上传一张图片"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少6个字符"),
});

// Schema for signing up users
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "名字至少3个字符"),
    email: z.string().email("邮箱格式不正确"),
    password: z.string().min(6, "密码至少6个字符"),
    confirmPassword: z.string().min(6, "密码至少6个字符"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不匹配",
    path: ["confirmPassword"],
  });

// Cart
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Sesstion cart id is required"),
  userId: z.string().optional().nullable(),
});

// Schema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "名称不能为空"),
  streetAddress: z.string().min(1, "地址不能为空"),
  city: z.string().min(1, "城市不能为空"),
  postalCode: z.string().min(1, "邮编码不能为空"),
  country: z.string().min(1, "国家不能为空"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment methods
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "支付方法不能为空"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "无效支付方法",
  });

// Shcema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "用户不能为空"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "无效支付方法",
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Schema for payment result
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Schema for update profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});

// Schema for updating a product
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

// Schema for update user
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, "Id is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  role: z.string().min(1, "Role is required"),
});

// Insert Review Schema
export const insertReviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  productId: z.string().min(1, "Product is required"),
  userId: z.string().min(1, "User is required"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});
