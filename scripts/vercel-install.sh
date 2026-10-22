#!/bin/sh
set -e

cat > .npmrc <<EOF
@neos:registry=https://gitlab.neframedicalcare.com/api/v4/groups/162/-/packages/npm/
//gitlab.neframedicalcare.com/api/v4/groups/162/-/packages/npm/:_authToken=${NPM_TOKEN}
//gitlab.neframedicalcare.com/api/v4/projects/114/packages/npm/:_authToken=${NPM_TOKEN}
EOF

pnpm install
