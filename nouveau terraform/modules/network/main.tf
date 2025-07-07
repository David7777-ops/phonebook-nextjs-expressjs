########################
# VPC - EXISTING OR NEW
########################

# Récupérer un VPC existant si vpc_id est renseigné
data "aws_vpc" "existing" {
  count = var.vpc_id != "" ? 1 : 0
  id    = var.vpc_id
}

# Créer un VPC uniquement si vpc_id n'est pas renseigné
resource "aws_vpc" "main" {
  count                   = var.vpc_id == "" ? 1 : 0
  cidr_block              = var.vpc_cidr
  enable_dns_hostnames    = true
  enable_dns_support      = true

  tags = {
    Name = "kutt-cluster-${var.environment}-vpc"
  }
}

# Variable locale pour choisir dynamiquement le VPC
locals {
  vpc_id = var.vpc_id != "" ? data.aws_vpc.existing[0].id : aws_vpc.main[0].id
}

#########################
# INTERNET GATEWAY
#########################

# Création de l'IGW uniquement si VPC à créer
resource "aws_internet_gateway" "gw" {
  count  = var.vpc_id == "" ? 1 : 0
  vpc_id = local.vpc_id

  tags = {
    Name = "${var.environment}-igw"
  }
}

#########################
# SUBNETS
#########################

# Si VPC existant → on récupère les subnets passés en variable
data "aws_subnet" "existing" {
  count = var.vpc_id != "" ? length(var.public_subnets) : 0
  id    = var.public_subnets[count.index]
}

# Création des subnets si nouveau VPC
resource "aws_subnet" "public" {
  count                   = var.vpc_id == "" ? length(var.public_subnets) : 0
  vpc_id                  = local.vpc_id
  cidr_block              = var.public_subnets[count.index]
  availability_zone       = var.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.environment}-public-${count.index + 1}"
  }
}

#########################
# ROUTE TABLE
#########################

# Création de la route table uniquement si VPC à créer
resource "aws_route_table" "public" {
  count  = var.vpc_id == "" ? 1 : 0
  vpc_id = local.vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw[0].id
  }

  tags = {
    Name = "${var.environment}-public-rt"
  }
}

# Association des subnets à la route table uniquement si VPC à créer
resource "aws_route_table_association" "public" {
  count          = var.vpc_id == "" ? length(var.public_subnets) : 0
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public[0].id
}