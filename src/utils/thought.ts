import { getCollection } from 'astro:content'

export const getThoughts = async (max?: number) => {
	return (await getCollection('thoughts'))
		.filter((thought) => !thought.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}
