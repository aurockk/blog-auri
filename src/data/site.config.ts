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
	site: 'https://popurri-de-cositas.vercel.app/',
	author: 'Auristela Diaz Luna',
	title: 'Popurri de Cositas',
	description: 'Blog about everything and/or everyone',
	lang: 'es-AR',
	ogLocale: 'es-AR',
	shareMessage: 'Share this post',
	paginationSize: 6
}
