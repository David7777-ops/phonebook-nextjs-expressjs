output "eks_cluster_name" {
  description = "The name of the EKS cluster"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "The endpoint of the EKS cluster"
  value       = module.eks.cluster_endpoint
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.network.vpc_id
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = module.network.public_subnet_ids
}

output "node_group_role_arn" {
  description = "The ARN of the IAM role used by the node group"
  value       = module.iam.role_arn
}

output "rds_endpoint" {
  description = "Endpoint de la base de données RDS"
  value       = module.rds.rds_endpoint
}

output "db_secret_arn" {
  description = "ARN du secret contenant les credentials de la BDD"
  value       = module.db_credentials_secret.secret_arn
}


