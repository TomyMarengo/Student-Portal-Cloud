variable "project" {
  description = "Main GCP project"
  type        = string
  default     = "cloud-student-system"
}

variable "frontend_static_ip" {
  description = "Static IP set for frontend entry point"
  type        = string
  default     = "frontend-static-ip"
}

variable "frontend_dns_zone_name" {
  description = "DNS zone name created for frontend access"
  type        = string
  default     = "frontend-dns-zone"
}

variable "frontend_domain" {
  description = "Set domain for frontend app access"
  type        = string
  default     = "tpcloud.com.ar"
}

variable "frontend_bucket_name" {
  description = "GCS bucket for frontend static content"
  type        = string
  default     = "cloud-student-system-frontend-bucket"
}

variable "frontend_certificate_name" {
  description = "TLS/SSL certificate name to attach to LB"
  type        = string
  default     = "frontend-ssl-certificate"
}

variable "frontend_url_map_name" {
  description = "URL map attached to frontend LB"
  type        = string
  default     = "frontend-url-map"
}

variable "frontend_https_proxy_name" {
  description = "HTTPs proxy attached to frontend LB"
  type        = string
  default     = "frontend-https-proxy"
}

variable "frontend_forwarding_rule_name" {
  description = "HTTP forwarding rule attached to frontend LB"
  type        = string
  default     = "frontend-forwarding-rule"
}

variable "load_balancing_scheme" {
  description = "Scheme attached to frontend LB"
  type        = string
  default     = "EXTERNAL"
}

variable "ip_protocol" {
  description = "IP protocol attached to frontend LB"
  type        = string
  default     = "HTTP"
}

variable "port_range" {
  description = "Port range attached to frontend LB"
  type        = string
  default     = "443"
}
