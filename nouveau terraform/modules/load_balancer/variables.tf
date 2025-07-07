variable "subnet_ids" {
  description = "List of subnet IDs for the Load Balancer"
  type        = list(string)
}

variable "lb_sg_id" {
  description = "Load Balancer Security Group ID"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}
