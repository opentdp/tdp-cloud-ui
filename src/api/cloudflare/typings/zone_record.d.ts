interface Meta {
	auto_added: boolean
	managed_by_apps: boolean
	managed_by_argo_tunnel: boolean
	source: string
}

export interface ZoneRecordItem {
	comment: string | null
	content: string
	created_on: string
	id: string
	locked: boolean
	meta: Meta
	modified_on: string
	name: string
	proxiable: boolean
	proxied: boolean
	tags: string[]
	ttl: number
	type: string
	zone_id: string
	zone_name: string
	priority?: number
}

export interface ZoneRecordCreate {
	name: string
	type: string
	content: string
	ttl: number
	priority?: number
	proxied?: boolean
	comment?: string
	tags?: string[]
}
