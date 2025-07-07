terraform {
  backend "s3" {
    bucket         = "terraform-state-07-bootstrap"
    key            = "prod/terraform.tfstate" # Différent chemin
    region         = "ap-northeast-1"
    dynamodb_table = "terraform-lock-07-bootstrap"
    encrypt        = true
  }
}