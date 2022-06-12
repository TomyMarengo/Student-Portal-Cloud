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
  description = "Selected region"
  type        = string
  default     = "southamerica-east1"
}