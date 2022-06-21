data "archive_file" "source" {
  type = "zip"
  source_dir = "../../../functions/deleteUserSubject"
  output_path = "/tmp/delete-user-subject.zip"
}

resource "google_storage_bucket" "functions_bucket" {
  name = "${var.project}-delete-user-subject"
  location = var.region
}

resource "google_storage_bucket_object" "function_zip" {
  name = "${data.archive_file.source.output_md5}.zip"
  bucket = google_storage_bucket.functions_bucket.name
  source = data.archive_file.source.output_path
}

resource "google_cloudfunctions_function" "delete_user_subject" {
  name  = "delete-user-subject"
  description = "Cloud function for removing a user from subjects list"
  runtime = "nodejs16"
  available_memory_mb = 128
  trigger_http = true
  entry_point = "deleteUserSubject"
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
  cloud_function = google_cloudfunctions_function.delete_user_subject.name
  role = "roles/cloudfunctions.invoker"
  member = "allUsers"
}