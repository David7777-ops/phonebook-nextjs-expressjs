variable "vpc_id" {
  description = "ID du VPC existant"
  type        = string
  default     = "vpc-0fc97901f1b33de9d" # ton VPC existant
}

variable "cluster_name" {
  description = "Cluster name used for VPC discovery by tag"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC (only used if a new VPC is created)"
  type        = string
}

variable "public_subnets" {
  description = "List of public subnet CIDRs"
  type        = list(string)
}

variable "azs" {
  description = "List of Availability Zones"
  type        = list(string)
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

