#!/usr/bin/env bash
set -euo pipefail

# Kubernetes deployment script for TechSavanna SaaS frontend apps
# Prerequisites:
#   - kubectl configured with target cluster context
#   - cert-manager installed in the cluster (for TLS)
#   - nginx-ingress controller installed in the cluster
#
# Usage:
#   ./scripts/k8s-deploy.sh                    # Deploy with 'latest' tag
#   ./scripts/k8s-deploy.sh v1.2.3             # Deploy with specific image tag
#   ./scripts/k8s-deploy.sh v1.2.3 --dry-run   # Preview without applying

TAG="${1:-latest}"
DRY_RUN=""
if [ "${2:-}" = "--dry-run" ]; then
  DRY_RUN="--dry-run=client"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="$(dirname "$SCRIPT_DIR")/k8s"

echo "Deploying TechSavanna SaaS frontend apps"
echo "Image tag: $TAG"
echo "K8s dir:   $K8S_DIR"
echo ""

# Apply with kustomize, overriding the image tag
kubectl apply -k "$K8S_DIR" $DRY_RUN \
  --kustomize-image "ghcr.io/yakjunior78/pos:${TAG}" \
  --kustomize-image "ghcr.io/yakjunior78/people:${TAG}" \
  --kustomize-image "ghcr.io/yakjunior78/elimu:${TAG}" \
  --kustomize-image "ghcr.io/yakjunior78/erp:${TAG}" \
  2>/dev/null || \
kubectl kustomize "$K8S_DIR" | \
  sed "s|ghcr.io/yakjunior78/\(.*\):latest|ghcr.io/yakjunior78/\1:${TAG}|g" | \
  kubectl apply $DRY_RUN -f -

echo ""
echo "Deployment complete. Check status with:"
echo "  kubectl -n techsavanna-saas get pods"
echo "  kubectl -n techsavanna-saas get ingress"
