variable "cluster_name" {
  description = "Name of the EKS Cluster"
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster"
  type        = string
  default     = "1.29"
}

variable "vpc_id" {
  description = "VPC ID for the EKS cluster"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs"
  type        = list(string)
}

variable "ssh_key_name" {
  description = "SSH key name to access nodes"
  type        = string
}

variable "aws_auth_roles" {
  description = "List of roles to add to aws-auth ConfigMap"
  type        = list(map(string))
  default     = []
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "map_users" {
  description = "List of IAM users to add to aws-auth configmap"
  type = list(object({
    userarn  = string
    username = string
    groups   = list(string)
  }))
  default = []
}

