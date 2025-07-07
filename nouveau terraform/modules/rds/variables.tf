variable "subnet_ids" {
  description = "List of subnet IDs for the RDS instance"
  type        = list(string)
}

variable "rds_sg_id" {
  description = "Security Group ID for the RDS instance"
  type        = string
}

variable "db_username" {
  description = "Database master username"
  type        = string
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Initial database name to create"
  type        = string
}

variable "environment" {
  description = "Deployment environment (e.g. dev, rec, prod)"
  type        = string
}
