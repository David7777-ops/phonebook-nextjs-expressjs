resource "aws_db_subnet_group" "default" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "${var.environment}-db-subnet-group"
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "${var.environment}-kutt-db"
  allocated_storage       = 20
  engine                  = "postgres"
  engine_version          = "15.12" # ✅ version existante sur AWS, remplace la 15.7
  instance_class          = "db.t3.micro"
  username                = var.db_username
  password                = var.db_password
  db_name                 = var.db_name
  vpc_security_group_ids  = [var.rds_sg_id]
  multi_az                = false
  publicly_accessible     = false
  skip_final_snapshot     = true
  db_subnet_group_name    = aws_db_subnet_group.default.name

  tags = {
    Name = "${var.environment}-kutt-db"
  }
}
