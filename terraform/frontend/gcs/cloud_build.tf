resource "google_cloudbuild_trigger" "github_push_trigger" {
  name = var.cloud_build_name
  filename = var.cloud_build_filename
  trigger_template {
    branch_name = "master"
    repo_name = var.cloud_build_repo_name
  }
}