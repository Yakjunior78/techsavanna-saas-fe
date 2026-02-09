#!/usr/bin/env bash
set -euo pipefail

# Docker image build and push script for TechSavanna SaaS frontend apps
# Usage:
#   ./scripts/docker-build.sh                    # Build all apps with 'latest' tag
#   ./scripts/docker-build.sh v1.2.3             # Build all apps with specific tag
#   ./scripts/docker-build.sh v1.2.3 pos         # Build only pos with specific tag
#   ./scripts/docker-build.sh latest pos people   # Build pos and people

REGISTRY="${DOCKER_REGISTRY:-ghcr.io/yakjunior78}"
TAG="${1:-latest}"
shift || true

APPS=("${@:-pos people elimu erp}")
if [ ${#APPS[@]} -eq 0 ] || [ "${APPS[0]}" = "pos people elimu erp" ]; then
  APPS=(pos people elimu erp)
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Registry: $REGISTRY"
echo "Tag:      $TAG"
echo "Apps:     ${APPS[*]}"
echo ""

for APP in "${APPS[@]}"; do
  IMAGE="${REGISTRY}/${APP}:${TAG}"
  echo "==> Building ${IMAGE}"
  docker build \
    -f "${ROOT_DIR}/apps/${APP}/Dockerfile" \
    -t "${IMAGE}" \
    --target production \
    "${ROOT_DIR}"

  if [ "${PUSH:-false}" = "true" ]; then
    echo "==> Pushing ${IMAGE}"
    docker push "${IMAGE}"
  fi

  echo ""
done

if [ "${PUSH:-false}" != "true" ]; then
  echo "Images built locally. To push, run with PUSH=true:"
  echo "  PUSH=true ./scripts/docker-build.sh ${TAG}"
fi
