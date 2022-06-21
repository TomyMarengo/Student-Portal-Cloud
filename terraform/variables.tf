variable "project" {
	description = "Project name"
	type = string
	default = "tpcloud2-354021"
}

variable "location" {
	description = "Project location"
	type = string
	default = "southamerica-east1"
}

variable "region" {
	description = "Project region"
	type = string
	default = "southamerica-east1"
}

variable "zone" {
	description = "Project zone"
	type = string
	default = "southamerica-east1-a"
}

variable "api_domain" {
	description = "API Domain"
	type = string
	default = "api.tomasmarengo.com"
}

variable "frontend_domain" {
	description = "Frontend Domain"
	type = string
	default = "tomasmarengo.com"
}

variable "domain" {
	description = "Domain"
	type = string
	default = "tomasmarengo"
}

variable "repo_suffix" {
	description = "Github repository name"
	type = string
	default = "edamm/TP-Cloud"
}

