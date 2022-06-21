variable "project" {
  description = "Project name"
  type        = string
  default     = "cloud-student-system"
}

variable "bucket_name" {
  description = "Files bucket name"
  type        = string
  default     = "cloud-student-system-files-bucket"
}

variable "storage_class" {
  description = "Bucket storage class"
  type = string
  default = "NEARLINE"
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