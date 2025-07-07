variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "environment" {
  description = "Deployment environment (ex: dev, prod)"
  type        = string
}
