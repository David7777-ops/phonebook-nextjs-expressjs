resource "aws_iam_role" "eks_node_role" {
  name_prefix = "${var.environment}-eks-node-role-"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })

  tags = {
    Environment = var.environment
    Terraform   = "true"
    Project     = "kutt"
  }
}

resource "aws_iam_instance_profile" "eks_node_profile" {
  name = "${var.environment}-eks-node-profile"
  role = aws_iam_role.eks_node_role.name
}

resource "aws_iam_role_policy_attachment" "managed" {
  for_each   = toset(var.policy_arns)
  role       = aws_iam_role.eks_node_role.name
  policy_arn = each.value
}

resource "aws_iam_role_policy" "custom_inline" {
  name   = "${var.environment}-eks-node-custom"
  role   = aws_iam_role.eks_node_role.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["ec2:Describe*"]
        Resource = "*"
      }
    ]
  })
}