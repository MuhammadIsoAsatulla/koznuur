FROM python:3.12-slim
WORKDIR /srv/koznur
RUN apt-get update && apt-get install -y --no-install-recommends curl unzip libgomp1 libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir torch==2.8.0 torchvision==0.23.0 --index-url https://download.pytorch.org/whl/cpu && pip install --no-cache-dir -r backend/requirements.txt
COPY scripts/fetch_reference_model.sh scripts/
RUN bash scripts/fetch_reference_model.sh && rm backend/models/aptos_winner/se_resnext50_32x4d.zip
COPY backend/app backend/app
COPY backend/samples/*.json backend/samples/
WORKDIR /srv/koznur/backend
EXPOSE 8000
CMD ["sh", "-c", "exec uvicorn app.main:app --host 0.0.0.0 --port \"${PORT:-8000}\""]
