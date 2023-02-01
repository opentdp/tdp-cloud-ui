interface Account {
	id: string
	name: string
}

interface Host {
	name: string
	website: string
}

interface Meta {
	custom_certificate_quota: number
	multiple_railguns_allowed: boolean
	page_rule_quota: number
	phishing_detected: boolean
	step: number
}

interface Owner {
	email: string | null
	id: string | null
	type: string
}

interface Plan {
	can_subscribe: boolean
	currency: string
	externally_managed: boolean
	frequency: string
	id: string
	is_subscribed: boolean
	legacy_discount: boolean
	legacy_id: string
	name: string
	price: number
}

interface Tenant {
	id: string | null
	name: string | null
}

interface Tenant_unit {
	id: string | null
}

export interface ZoneItem {
	account: Account
	activated_on: string
	cname_suffix: string
	created_on: string
	development_mode: number
	host?: Host
	id: string
	meta: Meta
	modified_on: string
	name: string
	name_servers?: string[]
	original_dnshost: string | null
	original_name_servers: string | null
	original_registrar: string | null
	owner: Owner
	paused: boolean
	permissions: string[]
	plan: Plan
	status: string
	tenant: Tenant
	tenant_unit: Tenant_unit
	type: string
	verification_key: string | null
}