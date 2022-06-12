# GCP Backend for frontend
resource "google_compute_backend_bucket" "static_site" {
  provider    = google
  name        = "static-site-backend"
  description = "Contains files needed by the website"
  bucket_name = var.bucket_name
  enable_cdn  = false
}

# Static IP
resource "google_compute_global_address" "static_site" {
  provider = google
  name     = "static-site-ip"
}

# http proxy
resource "google_compute_target_http_proxy" "default" {
  name     = "static-site-target-http-proxy"
  provider = google-beta
  url_map  = google_compute_url_map.default.id
}

# url map
resource "google_compute_url_map" "default" {
  name            = "static-site-url-map"
  provider        = google-beta
  default_service = google_compute_backend_bucket.static_site.id
}

# GCP forwarding rule
resource "google_compute_global_forwarding_rule" "default" {
  provider              = google
  name                  = "website-forwarding-rule"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.static_site.address
  ip_protocol           = "TCP"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
}