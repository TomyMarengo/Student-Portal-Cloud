provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_storage_bucket" "cloud_student_system_file_storage" {
  project       = var.project
  provider      = google-beta
  name          = var.bucket_name
  location      = var.region
  force_destroy = true
  storage_class = var.storage_class
}

resource "google_storage_default_object_access_control" "public_rule" {
  bucket = google_storage_bucket.cloud_student_system_file_storage.name
  role   = "READER"
  entity = "allUsers"
}