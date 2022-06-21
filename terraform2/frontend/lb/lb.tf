# GCP Backend for frontend
resource "google_compute_backend_bucket" "frontend_backend_service" {
  provider    = google
  name        = "frotend-backend-service"
  description = "Contains files needed by the frontend application"
  bucket_name = var.frontend_bucket_name
  enable_cdn  = true
  lifecycle {
    create_before_destroy = false
  }
}

# Create HTTPS certificate
resource "google_compute_managed_ssl_certificate" "frontend_certificate" {
  provider = google-beta
  project = var.project
  name = var.frontend_certificate_name
  managed {
    domains = [var.frontend_domain]
  }
}

# Create URL map
resource "google_compute_url_map" "frontend_url_map" {
  provider        = google-beta
  name            = var.frontend_url_map_name
  default_service = google_compute_backend_bucket.frontend_backend_service.id
}

# Create HTTPs target proxy
resource "google_compute_target_https_proxy" "frontend_https_proxy" {
  provider = google-beta
  name     = var.frontend_https_proxy_name
  url_map  = google_compute_url_map.frontend_url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.frontend_certificate.id]
}

# GCP forwarding rule
resource "google_compute_global_forwarding_rule" "frontend_forwarding_rule" {
  provider              = google
  name                  = var.frontend_forwarding_rule_name
  load_balancing_scheme = var.load_balancing_scheme
  ip_address            = google_compute_global_address.frontend_ip.address
  ip_protocol           = var.ip_protocol
  port_range            = var.port_range
  target                = google_compute_target_https_proxy.frontend_https_proxy.self_link
}