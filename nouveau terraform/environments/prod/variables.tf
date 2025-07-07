variable "environment" {
  description = "Deployment environment (ex: dev, prod)"
  type        = string
}

variable "ssh_public_key_path" {
  description = "Path to the SSH public key"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC (used only if a new VPC is created)"
  type        = string
  default     = "10.0.0.0/16" # Valeur par défaut si jamais tu veux en créer un
}

variable "vpc_id" {
  description = "ID of the existing VPC to use. If empty, a new VPC will be created."
  type        = string
  default     = ""
}

variable "public_subnets" {
  description = "List of public subnet IDs (if using an existing VPC)"
  type        = list(string)
  default     = []
}

variable "azs" {
  description = "List of availability zones corresponding to the public subnets"
  type        = list(string)
  default     = []
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair used to access EC2 instances"
  type        = string
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "engine_version" {
  description = "PostgreSQL version"
  type        = string
  default     = "14.9"
}

variable "rds_allocated_storage" {
  description = "RDS allocated storage in GB"
  type        = number
  default     = 20
}

variable "rds_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "master_username" {
  description = "RDS master username"
  type        = string
}

variable "master_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "cluster_service_cidr" {
  description = "The CIDR block for Kubernetes service IPs."
  type        = string
}

variable "oidc_provider" {
  description = "OIDC Provider URL de ton cluster EKS (sans https://)"
  type        = string
}

variable "aws_account_id" {
  description = "Ton ID de compte AWS"
  type        = string
}

variable "aws_region" {
  description = "La région AWS dans laquelle les ressources seront créées"
  type        = string
}
