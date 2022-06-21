data "archive_file" "source" {
  type = "zip"
  source_dir = "../../../functions/test_function_terraform"
  output_path = "/tmp/test_function_terraform.zip"
}

resource "google_storage_bucket" "functions_bucket" {
  name = "${var.project}-test-function-terraform"
  location = var.region
}

resource "google_storage_bucket_object" "function_zip" {
  name = "${data.archive_file.source.output_md5}.zip"
  bucket = google_storage_bucket.functions_bucket.name
  source = data.archive_file.source.output_path
}

resource "google_cloudfunctions_function" "test_function_terraform" {
  name  = "test_function_terraform"
  description = "Test function created from Terraform file"
  runtime = "nodejs16"
  available_memory_mb = 128
  trigger_http = true
  entry_point = "testFunction"
  max_instances = 10
  source_archive_bucket = google_storage_bucket.functions_bucket.name
  source_archive_object = "${data.archive_file.source.output_md5}.zip"
  ingress_settings    = "ALLOW_ALL"
  vpc_connector = "sql-connector"
  vpc_connector_egress_settings = "ALL_TRAFFIC"
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project = "cloud-student-system"
  region  = "southamerica-east1"
  cloud_function = google_cloudfunctions_function.test_function_terraform.name
  role = "roles/cloudfunctions.invoker"
  member = "allUsers"
}