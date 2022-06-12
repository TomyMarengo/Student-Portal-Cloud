provider "google" {
  project = "cloud-student-system"
  region  = "southamerica-east1"
  zone    = "southamerica-east1-a"
}

resource "google_storage_bucket" "static_site" {
  project       = "cloud-student-system"
  provider      = google-beta
  name          = var.bucket_name
  location      = "southamerica-east1"
  force_destroy = true
  storage_class = "STANDARD"

  website {
    main_page_suffix = "index.html"
    not_found_page = "404.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_default_object_access_control" "public_rule" {
  bucket = google_storage_bucket.static_site.name
  role   = "READER"
  entity = "allUsers"
}

resource "google_storage_bucket_object" "main_page" {
  name   = "index.html"
  source = "../../website/html/index.html"
  bucket = google_storage_bucket.static_site.name
}

resource "google_storage_bucket_object" "error_page" {
  name   = "404.html"
  source = "../../website/html/404.html"
  bucket = google_storage_bucket.static_site.name
}