apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: ${node_group_role_arn}
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes

  mapUsers: |
%{ for user in map_users ~}
    - userarn: ${user.userarn}
      username: ${user.username}
      groups:
%{ for group in user.groups ~}
        - ${group}
%{ endfor ~}
%{ endfor ~}

