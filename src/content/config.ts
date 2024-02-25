import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array( z.string() ).default([]),
    description: z.string(),
    publishedAt: z.date(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = { posts: postsCollection };
