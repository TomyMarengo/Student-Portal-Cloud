variable "project" {
  description = "Project name"
  type        = string
  default     = "cloud-student-system"
}

variable "bucket_name" {
  description = "Bucket name"
  type        = string
  default     = "cloud-student-system-website-bucket"
}

variable "region" {
  description = "Default region"
  type = string
  default = "southamerica-east1"
}

variable "zone" {
  description = "Default zone"
  type = string
  default = "southamerica-east1-a"
}