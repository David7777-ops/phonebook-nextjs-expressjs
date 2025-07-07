resource "aws_iam_policy" "alb_controller" {
  name_prefix = "${var.environment}-AWSLoadBalancerControllerIAMPolicy-"
  description = "Policy for ALB Controller"
  policy      = file("${path.module}/iam_policy.json")
}

resource "aws_iam_role" "alb_controller" {
  name = "${var.environment}-eks-alb-controller-role"

  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${var.aws_account_id}:oidc-provider/${replace(var.oidc_provider, "https://", "")}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "alb_controller" {
  role       = aws_iam_role.alb_controller.name
  policy_arn = aws_iam_policy.alb_controller.arn
}

resource "kubernetes_service_account" "alb_controller" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.alb_controller.arn
    }
  }
}

resource "kubernetes_deployment" "alb_controller" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"
    labels = {
      "app.kubernetes.io/name" = "aws-load-balancer-controller"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "app.kubernetes.io/name" = "aws-load-balancer-controller"
      }
    }

    template {
      metadata {
        labels = {
          "app.kubernetes.io/name" = "aws-load-balancer-controller"
        }
      }

      spec {
        service_account_name = kubernetes_service_account.alb_controller.metadata[0].name

        container {
          name  = "aws-load-balancer-controller"
          image = "602401143452.dkr.ecr.${var.aws_region}.amazonaws.com/amazon/aws-load-balancer-controller:v2.7.1"

          args = [
            "--cluster-name=${var.cluster_name}",
            "--ingress-class=alb",
            "--aws-region=${var.aws_region}",
            "--aws-vpc-id=${var.vpc_id}"
          ]
        }
      }
    }
  }
}