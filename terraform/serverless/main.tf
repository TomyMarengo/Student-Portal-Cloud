provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_vpc_access_connector" "connector" {
  project = var.project
  name = var.connector_name
  ip_cidr_range = var.ip_cidr_range
  region = var.region
  network = var.network
}