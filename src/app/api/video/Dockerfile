FROM jrottenberg/ffmpeg:4.3-alpine

# Install dependencies
RUN apk update && apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    && pip3 install awscli

# Set working directory
WORKDIR /app

# Copy the transcode script into the container
COPY transcoding_shell.sh /app/transcoding_shell.sh

# Make the script executable
RUN chmod +x /app/transcoding_shell.sh

# Set the entrypoint
ENTRYPOINT ["/app/transcoding_shell.sh"]