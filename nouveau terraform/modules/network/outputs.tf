output "vpc_id" {
  value = local.vpc_id
}

output "public_subnet_ids" {
  value = var.vpc_id != "" ? [for s in data.aws_subnet.existing : s.id] : [for s in aws_subnet.public : s.id]
}
