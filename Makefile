build-lambda:
	cargo lambda build --package lambda --release

deploy-lambda:
	cargo lambda deploy --binary-name lambda image_generator

build-website:
	pnpm run build --filter web

deploy-website:
	npx wrangler pages publish apps/web/dist/

deploy: build-website build-lambda deploy-lambda deploy-website