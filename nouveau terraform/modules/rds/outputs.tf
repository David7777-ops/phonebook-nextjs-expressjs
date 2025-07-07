output "db_endpoint" {
  description = "Endpoint of the RDS PostgreSQL instance"
  value       = aws_db_instance.postgres.endpoint
}

output "db_port" {
  description = "Port used by the RDS PostgreSQL instance"
  value       = aws_db_instance.postgres.port
}

output "db_name" {
  description = "Database name of the RDS PostgreSQL instance"
  value       = aws_db_instance.postgres.db_name
}

output "db_username" {
  description = "Master username for the RDS PostgreSQL instance"
  value       = aws_db_instance.postgres.username
}

output "db_subnet_group" {
  description = "RDS Subnet Group Name"
  value       = aws_db_subnet_group.default.name
}

output "db_engine_version" {
  description = "Version du moteur PostgreSQL"
  value       = aws_db_instance.postgres.engine_version
}

output "rds_endpoint" {
  description = "Endpoint de la base de données RDS pour Kutt"
  value       = aws_db_instance.postgres.endpoint
}
