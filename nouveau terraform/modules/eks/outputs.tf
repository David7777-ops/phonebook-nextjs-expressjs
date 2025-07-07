output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_oidc_issuer_url" {
  description = "OIDC Issuer URL"
  value       = module.eks.cluster_oidc_issuer_url
}

output "node_group_names" {
  description = "Nom des node groups"
  value       = module.eks.eks_managed_node_groups["default"].node_group_name
}

output "debug_cluster_name" {
  value = var.cluster_name
}