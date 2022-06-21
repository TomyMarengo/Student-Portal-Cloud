# Reserve a static IP
resource "google_compute_global_address" "frontend_ip" {
  provider = google
  name = var.frontend_static_ip
}

# Create DNS managed zone
resource "google_dns_managed_zone" "frontend_dns_zone" {
  provider = google
  name = var.frontend_dns_zone_name
  dns_name = "${var.frontend_domain}."
}

# Add static IP to DNS
resource "google_dns_record_set" "frontend_A_record" {
  provider = google
  name = "${var.frontend_domain}."
  type = "A"
  ttl = 300
  managed_zone = google_dns_managed_zone.frontend_dns_zone.name
  rrdatas = [google_compute_global_address.frontend_ip.address]
  depends_on = [google_dns_managed_zone.frontend_dns_zone]
}

# Add www registry to DNS
resource "google_dns_record_set" "frontend_WWW_record" {
  provider = google
  name = "www.${var.frontend_domain}."
  type = "CNAME"
  ttl = 300
  managed_zone = google_dns_managed_zone.frontend_dns_zone.name
  rrdatas = ["www.${var.frontend_domain}."]
  depends_on = [google_dns_managed_zone.frontend_dns_zone]
}

