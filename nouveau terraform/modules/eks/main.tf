module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.30"

  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  vpc_id          = module.network.vpc_id
  subnet_ids      = module.network.public_subnet_ids

  enable_irsa = true

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = false

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



#################
# OIDC Provider
#################

resource "aws_iam_openid_connect_provider" "eks" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.eks.certificates[0].sha1_fingerprint]
  url             = module.eks.cluster_oidc_issuer_url

  tags = {
    Name        = "${var.cluster_name}-eks-oidc"
    Environment = var.environment
  }
}

data "tls_certificate" "eks" {
  url = module.eks.cluster_oidc_issuer_url
}
