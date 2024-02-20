import { z } from "astro/zod";
import { ImageFunction } from "astro:content";

export const getPostSchema = (input: { image: ImageFunction }) =>
  z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    featuredimage: input.image().optional(),
    published: z.boolean().default(true),
    // author: z.string(),
    // image: z.object({
    //   url: z.string(),
    //   alt: z.string()
    // }),
    tags: z.array(z.string()).default([]),
  });

export type Post = z.infer<ReturnType<typeof getPostSchema>>;

export interface ContentWrapper<T> {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: T;
}
