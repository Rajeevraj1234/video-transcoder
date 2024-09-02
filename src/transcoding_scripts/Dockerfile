# Use a Python 3.10 base image
FROM python:3.10-slim AS build

# Install system dependencies and Python packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    zlib1g-dev \
    libblas-dev \
    liblapack-dev \
    python3-dev \
    ffmpeg \
    git \
    bash && \
    pip install --upgrade pip && \
    pip install torch==2.3.1 moviepy git+https://github.com/openai/whisper.git awscli && \
    apt-get purge -y --auto-remove && \
    rm -rf /var/lib/apt/lists/*

# Create a new stage from the slim Python base image
FROM python:3.10-slim

# Install only runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /usr/local /usr/local
COPY transcoding_shell.sh /app/
COPY audio_to_srt.py /app/
COPY video_to_audio.py /app/
COPY embeed_subtitle_into_video.py /app/

# Make the script executable
RUN chmod +x /app/transcoding_shell.sh

# Set the entrypoint
ENTRYPOINT ["/app/transcoding_shell.sh"]