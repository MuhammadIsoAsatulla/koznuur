# Deploy KoʻzNur on Vercel

Import the GitHub repository at its root. The container preset in `vercel.json` builds the root Dockerfile. The first stage compiles the React console. The runtime stage installs CPU PyTorch, downloads the five reference checkpoints from the publisher, and starts FastAPI. FastAPI serves the console and the API at the same HTTPS origin. Leave `VITE_API_BASE` empty for this setup.

Verify that `GET /health` reports `model_loaded: true`. Upload a small demo image and check the grade, referral, and heatmap. Vercel Functions limit the entire request body to 4.5 MB, including multipart overhead. For larger original images, deploy the Dockerfile to a host supporting the API’s 20 MB application limit.

## Gallery

The public repository contains gallery metadata. Uploads work independently of the gallery. To enable samples on a hosted API, mount a directory containing images you have permission to serve at /srv/koznur/backend/samples. Include the matching manifest for grade labels. The repository's competition sample photographs are excluded from source uploads and the Docker image.

## Local production build

Follow the local setup in README.md. Leave VITE_API_BASE empty when FastAPI serves frontend/dist from the same origin. The optional gallery fetcher is backend/scripts/fetch_samples.py.
