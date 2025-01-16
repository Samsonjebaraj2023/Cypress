@echo off
SET NODE_TLS_REJECT_UNAUTHORIZED=0
SET CYPRESS_INTERNAL_API_URL=http://localhost:1234
SET CYPRESS_DIRECTOR_URL=http://localhost:1234
SET CYPRESS_API_URL=http://localhost:1234

npx cypress run --record --key any_value --group "test-group-1" --ci-build-id "build-1" --config-file cypress.config.js