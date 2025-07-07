variable "secret_name" {
  description = "Nom du secret dans AWS Secrets Manager"
  type        = string
}

variable "secret_string" {
  description = "Valeur JSON du secret"
  type        = string
}