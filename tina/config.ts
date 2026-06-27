import { defineConfig } from 'tinacms'

const CATEGORIES = ['Blog', 'Tech', 'Food', 'Tribute']
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
	branch,
	clientId: null,
	token: null,
	build: {
		outputFolder: 'admin',
		publicFolder: 'public'
	},
	media: {
		tina: {
			mediaRoot: 'src/assets/images',
			publicFolder: 'public'
		}
	},
	schema: {
		collections: [
			{
				name: 'post',
				label: 'Blog Post',
				path: 'src/content/blog',
				format: 'mdx',
				fields: [
					{
						type: 'image',
						label: 'Cover Image',
						required: false,
						name: 'heroImage',
						description: 'The image used for the cover of the post'
					},
					{
						type: 'string',
						required: true,
						name: 'category',
						label: 'Category',
						description: 'Select a category for this post',
						options: CATEGORIES
					},
					{
						type: 'string',
						label: 'Description',
						required: false,
						name: 'description',
						description: 'A short description of the post'
					},
					{
						type: 'datetime',
						name: 'pubDate',
						label: 'Publication Date',
						required: true
					},
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						description: 'If this is checked the post will not be published'
					},
					{
						type: 'string',
						name: 'tags',
						required: true,
						label: 'Tags',
						description: 'Tags for this post',
						list: true
					},
					{
						type: 'string',
						name: 'title',
						label: 'Title',
						isTitle: true,
						required: true
					},
					{
						type: 'rich-text',
						label: 'Body',
						name: 'body',
						isBody: true
					}
				]
			},
			{
				name: 'reading',
				label: 'Leyendo',
				path: 'src/data',
				format: 'json',
				match: {
					include: 'recentlybook'
				},
				ui: {
					allowedActions: {
						create: false,
						delete: false
					}
				},
				fields: [
					{
						type: 'string',
						name: 'isbn',
						label: 'ISBN u OpenLibrary ID (ej: 9788420433424 o OL51729853M)',
						required: true
					},
					{
						type: 'string',
						name: 'progress',
						label: 'Progreso (ej: pág. 142 / 224)',
						required: true
					},
					{
						type: 'string',
						name: 'note',
						label: 'Nota personal',
						ui: {
							component: 'textarea'
						}
					},
					{
						type: 'object',
						name: 'finished',
						label: 'Libros terminados',
						list: true,
						ui: {
							itemProps: (item: { title?: string; date?: string }) => ({
								label: item?.title ? `${item.title} (${item.date ?? ''})` : 'Libro'
							})
						},
						fields: [
							{
								type: 'string',
								name: 'date',
								label: 'Fecha (YYYY-MM)',
								required: true
							},
							{
								type: 'string',
								name: 'title',
								label: 'Título',
								required: true
							},
							{
								type: 'string',
								name: 'author',
								label: 'Autor/a',
								required: true
							},
							{
								type: 'string',
								name: 'stars',
								label: 'Estrellas',
								options: ['★★★★★', '★★★★☆', '★★★☆☆', '★★☆☆☆', '★☆☆☆☆'],
								required: true
							}
						]
					}
				]
			},
			{
				name: 'thought',
				label: 'Thought',
				path: 'src/content/thoughts',
				format: 'md',
				ui: {
					filename: {
						readonly: true,
						slugify: () => `thought-${Date.now()}`
					}
				},
				fields: [
					{
						type: 'datetime',
						name: 'pubDate',
						label: 'Fecha',
						required: true
					},
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						description: 'If this is checked the thought will not be published'
					},
					{
						type: 'rich-text',
						label: 'Pensamiento',
						name: 'body',
						isBody: true
					},
					{
						type: 'image',
						name: 'image',
						label: 'Imagen'
					},
					{
						type: 'string',
						name: 'video',
						label: 'Video URL (YouTube u otro enlace)'
					},
					{
						type: 'image',
						name: 'localVideo',
						label: 'Video local (subir archivo)'
					},
					{
						type: 'object',
						name: 'link',
						label: 'Link',
						fields: [
							{
								type: 'string',
								name: 'url',
								label: 'URL',
								required: true
							},
							{
								type: 'string',
								name: 'title',
								label: 'Título'
							}
						]
					}
				]
			}
		]
	}
})
