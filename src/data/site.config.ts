interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	site: 'https://popurridecositas.blog/',
	author: 'Auristela Diaz Luna',
	title: 'AuriOS',
	description:
		'Blog de Auristela: programación, recetas, lecturas y pensamientos desde la Patagonia.',
	lang: 'es-AR',
	ogLocale: 'es-AR',
	shareMessage: 'Share this post',
	paginationSize: 6
}
