import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

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
  price: z
    .string()
    .refine(
      (val) => /^\d+(\.\d{2})?¥/.test(formatNumberWithDecimal(Number(val))),
      "价格格式不正确"
    ),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少6个字符"),
});
