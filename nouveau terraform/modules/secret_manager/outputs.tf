output "secret_arn" {
  description = "ARN du secret"
  value       = aws_secretsmanager_secret.this.arn
}

output "secret_name" {
  description = "Nom du secret"
  value       = aws_secretsmanager_secret.this.name
}
