provider "google" {
  project = "cloud-student-system"
  region  = "southamerica-east1"
  zone    = "southamerica-east1-a"
}

provider "google-beta" {
  project = "cloud-student-system"
  region  = "southamerica-east1"
}