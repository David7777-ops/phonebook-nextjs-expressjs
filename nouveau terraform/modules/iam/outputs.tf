output "instance_profile_name" {
  value = aws_iam_instance_profile.eks_node_profile.name
}

output "instance_profile_arn" {
  value = aws_iam_instance_profile.eks_node_profile.arn
}

output "role_arn" {
  value = aws_iam_role.eks_node_role.arn
}

output "role_name" {
  value = aws_iam_role.eks_node_role.name
}


