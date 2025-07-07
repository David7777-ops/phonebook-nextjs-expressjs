resource "kubernetes_daemonset" "cloudwatch_agent" {
  metadata {
    name      = "cloudwatch-agent"
    namespace = "kube-system"
    labels = {
      app = "cloudwatch-agent"
    }
  }

  spec {
    selector {
      match_labels = {
        app = "cloudwatch-agent"
      }
    }

    template {
      metadata {
        labels = {
          app = "cloudwatch-agent"
        }
      }

      spec {
        service_account_name = "cloudwatch-agent"
        container {
          name  = "cloudwatch-agent"
          image = "public.ecr.aws/cloudwatch-agent/cloudwatch-agent:latest"

          volume_mount {
            name       = "cwagentconfig"
            mount_path = "/etc/cwagentconfig"
          }

          env {
            name  = "HOST_IP"
            value_from {
              field_ref {
                field_path = "status.hostIP"
              }
            }
          }
        }

        volume {
          name = "cwagentconfig"

          config_map {
            name = "cwagentconfig"
          }
        }
      }
    }
  }
}

resource "kubernetes_config_map" "cwagent_config" {
  metadata {
    name      = "cwagentconfig"
    namespace = "kube-system"
  }

  data = {
    "cwagentconfig.json" = file("${path.module}/cwagentconfig.json")
  }
}

resource "kubernetes_service_account" "cloudwatch_agent" {
  metadata {
    name      = "cloudwatch-agent"
    namespace = "kube-system"
  }
}

resource "aws_iam_policy" "cloudwatch_agent_policy" {
  name        = "${var.environment}-cloudwatch-agent-policy"
  description = "IAM policy for CloudWatch agent"
  policy      = file("${path.module}/cloudwatch-policy.json")
}

resource "aws_iam_role_policy_attachment" "attach_cloudwatch_agent" {
  role       = var.node_instance_role_name
  policy_arn = aws_iam_policy.cloudwatch_agent_policy.arn
}