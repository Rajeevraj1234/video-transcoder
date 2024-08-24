FROM jrottenberg/ffmpeg:4.3-alpine

# Install dependencies
RUN apk update && apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    python3-dev \
    musl-dev \
    gcc \
    g++ \
    libffi-dev \
    openblas-dev \
    && pip install --upgrade pip \
    && pip3 install awscli

RUN pip3 install moviepy 

RUN pip3 install triton==3.0.0 torch==2.3.1

RUN pip3 install openai-whisper

# Set working directory
WORKDIR /app

# Copy the transcode script into the container
COPY transcoding_shell.sh /app/transcoding_shell.sh
COPY audio_to_srt.py /app/audio_to_srt.py
COPY video_to_audio.py /app/video_to_audio.py
COPY embeed_subtitle_into_video.py /app/embeed_subtitle_into_video.py

# Make the script executable
RUN chmod +x /app/transcoding_shell.sh

# Set the entrypoint
ENTRYPOINT ["/app/transcoding_shell.sh"]
