variable "environment" {
  description = "The environment name (e.g. dev, staging, prod)"
  type        = string
}

variable "node_instance_role_name" {
  description = "The IAM role name attached to EKS worker nodes"
  type        = string
}