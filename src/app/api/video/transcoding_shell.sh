#!/bin/sh

# Download the video from S3
aws s3 cp $INPUT_URL input.mp4

# adding subtitle to the input video file
echo "conversion and addition of audio file is started"

python3 video_to_audio.py 
python3 audio_to_srt.py 
python3 embeed_subtitle_into_video.py

echo "conversion and addition of audio file is done"

# Transcode to 360p, 480p, and 720p
ffmpeg -i input_with_subtitle.mp4 -vf "scale=640:360" -c:v libx264 -crf 23 -preset fast -c:a aac output_360p.mp4
ffmpeg -i input_with_subtitle.mp4 -vf "scale=854:480" -c:v libx264 -crf 23 -preset fast -c:a aac output_480p.mp4
ffmpeg -i input_with_subtitle.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -preset fast -c:a aac output_720p.mp4

# Upload the transcoded videos to S3
aws s3 cp output_360p.mp4 s3://$AWS_S3_BUCKET_NAME/$OUTPUT_KEY_360P
aws s3 cp output_480p.mp4 s3://$AWS_S3_BUCKET_NAME/$OUTPUT_KEY_480P
aws s3 cp output_720p.mp4 s3://$AWS_S3_BUCKET_NAME/$OUTPUT_KEY_720P

sleep 3000

# Clean up
rm input.mp4 output_360p.mp4 output_480p.mp4 output_720p.mp4 audio.wav subtitles.srt input_with_subtitle.mp4