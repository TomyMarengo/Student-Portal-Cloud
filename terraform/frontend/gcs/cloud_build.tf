resource "google_cloudbuild_trigger" "github_push_trigger" {
  name = var.cloud_build_name
  filename = var.cloud_build_filename
  github {
    name = "TP-Cloud"
    owner = "edamm21"
    push {
      branch = "master"
      invert_regex = false
    }
  }
}