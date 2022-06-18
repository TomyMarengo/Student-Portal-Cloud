resource "google_storage_bucket" "frontend" {
  provider                    = google-beta
  project                     = var.project
  name                        = var.bucket_name
  location                    = var.region
  force_destroy               = true
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  dynamic "cors" {
    for_each = ["cors"]
    content {
      origin          = var.cors_origins
      method          = var.cors_methods
      response_header = var.cors_headers
      max_age_seconds = var.cors_max_age
    }
  }
}