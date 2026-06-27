import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string().optional(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image().optional(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

const thoughts = defineCollection({
	schema: z.object({
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		draft: z.boolean().default(false),
		image: z.string().optional(),
		video: z.string().optional(),
		localVideo: z.string().optional(),
		link: z
			.object({
				url: z.string(),
				title: z.string().optional()
			})
			.optional()
	})
})

export const collections = { blog, thoughts }
