data "aws_eks_cluster" "cluster" {
  name = var.cluster_name
}

data "aws_caller_identity" "current" {}


#################
# IAM : création du rôle IAM et de l'instance profile pour les nodes
#################

module "iam" {
  source      = "../../modules/iam"
  environment = var.environment

  policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
    "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy",
    "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
  ]
}

#################
# Network : création du VPC et des subnets
#################

module "network" {
  source         = "../../modules/network"
  vpc_cidr       = var.vpc_cidr
  public_subnets = var.public_subnets
  azs            = var.azs
  environment    = var.environment
  cluster_name   = var.cluster_name
}

#################
# Cluster EKS + Node Group
#################

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.30"

  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  vpc_id          = module.network.vpc_id
  subnet_ids      = module.network.public_subnet_ids

  enable_irsa = true

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  eks_managed_node_groups = {
    default = {
      desired_size   = 2
      max_size       = 3
      min_size       = 1
      instance_types = ["t3.medium"]
      iam_role_arn   = module.iam.role_arn
      labels = {
        Environment = var.environment
      }
      tags = {
        Environment = var.environment
        Terraform   = "true"
      }
    }
  }

  tags = {
    Environment = var.environment
    Terraform   = "true"
  }
}

module "aws_auth" {
  source  = "terraform-aws-modules/eks/aws//modules/aws-auth"
  version = "~> 20.37.1"

  depends_on = [module.eks]

  aws_auth_users = [
    {
      userarn  = "arn:aws:iam::645860290752:user/david-tavernier"
      username = "david-tavernier"
      groups   = ["system:masters"]
    }
  ]

  aws_auth_roles = [
    {
      rolearn  = module.eks.eks_managed_node_groups["default"].iam_role_arn
      username = "system:node:{{EC2PrivateDNSName}}"
      groups   = ["system:bootstrappers", "system:nodes"]
    }
  ]
}


#################
# Security Groups
#################

module "security_groups" {
  source = "../../modules/security_groups"

  vpc_id      = module.network.vpc_id
  environment = var.environment
}

#################
# RDS PostgreSQL
#################

module "rds" {
  source = "../../modules/rds"

  environment = var.environment
  subnet_ids  = module.network.public_subnet_ids

  db_username = var.db_username
  db_password = var.db_password
  db_name     = var.db_name
  rds_sg_id   = module.security_groups.rds_sg_id
}

module "db_credentials_secret" {
  source      = "../../modules/secret_manager"
  secret_name = "${var.environment}-rds-credentials"
  secret_string = jsonencode({
    username = var.db_username
    password = var.db_password
    host     = module.rds.rds_endpoint
    port     = "5432"
    dbname   = var.db_name
  })
}


module "alb_controller" {
  source         = "../../modules/alb_controller"
  cluster_name   = var.cluster_name
  vpc_id         = var.vpc_id
  aws_region     = var.aws_region
  environment    = var.environment
  oidc_provider  = data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer
  aws_account_id = data.aws_caller_identity.current.account_id
}

module "cloudwatch_agent" {
  source = "../../modules/cloudwatch_agent"

  node_instance_role_name = module.iam.role_name
  environment             = var.environment
}


