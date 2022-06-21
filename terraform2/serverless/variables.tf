variable "project" {
  description = "Project name"
  type        = string
  default     = "cloud-student-system"
}

variable "region" {
  description = "Selected region"
  type        = string
  default     = "southamerica-east1"
}

variable "zone" {
  description = "Default zone"
  type = string
  default = "southamerica-east1-a"
}

variable "connector_name" {
  description = "Serverless VPC Access Connector name"
  type        = string
  default     = "vpc-connector"
}

variable "ip_cidr_range" {
  description = "CIDR range"
  type        = string
  default     = "10.0.1.0/28"
}

variable "network" {
  description = "Serverless VPC Access Connector network"
  type        = string
  default     = "default"
}


