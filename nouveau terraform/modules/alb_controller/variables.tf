variable "cluster_name" {
  description = "Nom du cluster EKS sur lequel déployer l'AWS Load Balancer Controller"
  type        = string
}

variable "aws_region" {
  description = "Région AWS où se trouve le cluster EKS"
  type        = string
}

variable "vpc_id" {
  description = "ID du VPC associé au cluster EKS"
  type        = string
}


variable "oidc_provider" {
  description = "URL du fournisseur OIDC du cluster EKS (ex: https://oidc.eks.ap-northeast-1.amazonaws.com/id/XXXXX)"
  type        = string
}

variable "environment" {
  description = "Environnement de déploiement (ex: dev, staging, prod)"
  type        = string
}

variable "aws_account_id" {
  description = "Ton ID de compte AWS"
  type        = string
}