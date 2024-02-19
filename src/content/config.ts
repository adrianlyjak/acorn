// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { getPostSchema } from "../types/Post";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: "content",
  schema: getPostSchema,
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
