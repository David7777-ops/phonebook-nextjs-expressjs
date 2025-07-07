output "cloudwatch_agent_policy_arn" {
  description = "ARN of the CloudWatch agent IAM policy"
  value       = aws_iam_policy.cloudwatch_agent_policy.arn
}

output "cloudwatch_namespace" {
  description = "Namespace used for CloudWatch metrics"
  value       = "EKS/${var.environment}"
}