# Deploy KoʻzNur from a new GitHub repository

The repository root contains the Vercel configuration for the React frontend and a Dockerfile for the FastAPI inference service. The five model checkpoints occupy 512 MB before Python or PyTorch is included. Run inference on a separate container host with enough memory for the five models. The browser sends each selected retinal image directly to that service.

1. Upload the source files to your new repository, including dotfiles and the frontend lockfile. The model download script retrieves the weights from the original publisher during the API image build.
2. Deploy the root Dockerfile on your container host and enable HTTPS. The server listens on the host-provided PORT or 8000. Verify that GET /health returns model_loaded set to true. Startup loads all five folds.
3. Import the GitHub repository into Vercel. Keep the root directory at the repository root. Set VITE_API_BASE to the public HTTPS API origin in the deployment environments you intend to use. Deploy. Vercel reads the install command, build command and output directory from vercel.json.
4. Set KOZNUR_CORS_ORIGINS on the API host to the exact Vercel production origin, including https://, and restart the API. Add any permitted preview origins as a comma-separated list. Redeploy the frontend when its API address changes.
5. Open the Vercel site, upload a retinal image, and check the grade, referral and heatmap switch. Check the browser network panel if the model is ready but the website cannot reach it.

## Gallery

The public repository contains gallery metadata. Uploads work independently of the gallery. To enable samples on a hosted API, mount a directory containing images you have permission to serve at /srv/koznur/backend/samples. Include the matching manifest for grade labels. The repository's competition sample photographs are excluded from source uploads and the Docker image.

## Local production build

Follow the local setup in README.md. Leave VITE_API_BASE empty when FastAPI serves frontend/dist from the same origin. The optional gallery fetcher is backend/scripts/fetch_samples.py.
