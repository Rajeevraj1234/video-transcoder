# Use a Python 3.10 base image
FROM python:3.10

# Install system dependencies including ffmpeg
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    zlib1g-dev \
    libblas-dev \
    liblapack-dev \
    python3-dev \
    ffmpeg \
    git \
    && apt-get clean

# Upgrade pip and install Python packages
RUN pip install --upgrade pip 
RUN pip install torch==2.3.1 
RUN pip install moviepy

RUN pip install git+https://github.com/openai/whisper.git 


# Set working directory
WORKDIR /app

# Copy scripts into the container
COPY transcoding_shell.sh /app/transcoding_shell.sh
COPY audio_to_srt.py /app/audio_to_srt.py
COPY video_to_audio.py /app/video_to_audio.py
COPY embeed_subtitle_into_video.py /app/embeed_subtitle_into_video.py

# Make the script executable
RUN chmod +x /app/transcoding_shell.sh

# Set the entrypoint
ENTRYPOINT ["/app/transcoding_shell.sh"]
