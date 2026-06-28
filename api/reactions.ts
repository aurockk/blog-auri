import type { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient } from 'mongodb'

let client: MongoClient | null = null

async function getDb() {
	if (!client) {
		client = new MongoClient(process.env.MONGODB_URI!, {
			maxPoolSize: 5,
			serverSelectionTimeoutMS: 5000
		})
		await client.connect()
	}
	return client.db('blog')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

	try {
		const db = await getDb()
		const col = db.collection('reactions')

		if (req.method === 'GET') {
			const ids = String(req.query.ids ?? '')
				.split(',')
				.filter(Boolean)
			if (!ids.length) return res.json({})

			const docs = await col.find({ _id: { $in: ids as any } }).toArray()
			const result: Record<string, number> = {}
			for (const id of ids) result[id] = 0
			for (const doc of docs) result[doc._id as string] = (doc.heart as number) ?? 0
			return res.json(result)
		}

		if (req.method === 'POST') {
			const { id, delta } = req.body
			if (!id || ![-1, 1].includes(delta)) {
				return res.status(400).json({ error: 'bad request' })
			}

			const updated = await col.findOneAndUpdate(
				{ _id: id as any },
				{ $inc: { heart: delta } },
				{ upsert: true, returnDocument: 'after' }
			)
			return res.json({ count: Math.max(0, (updated?.heart as number) ?? 0) })
		}

		return res.status(405).end()
	} catch {
		return res.status(500).json({ error: 'db error' })
	}
}
