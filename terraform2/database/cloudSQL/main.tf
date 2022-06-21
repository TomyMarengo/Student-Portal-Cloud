provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_sql_database_instance" "main" {
  project = var.project
  name = "cloud-student-system-sql-2"
  database_version = "POSTGRES_14"
  region = var.region
  root_password = "testing1234"

  settings {
    tier = "db-f1-micro"
  }
}