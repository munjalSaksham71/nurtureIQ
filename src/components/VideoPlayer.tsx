import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function VideoPlayer({
  videoUrl,
  onComplete,
  isCompleted,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showComplete, setShowComplete] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&?\n]+)/
    );
    return match?.[1] || '';
  };

  const embedUrl = `https://www.youtube.com/embed/${getYouTubeId(
    videoUrl
  )}?enablejsapi=1`;

  useEffect(() => {
    setShowComplete(!isCompleted);
  }, [isCompleted]);

  const handleComplete = () => {
    onComplete();
    setShowComplete(false);
  };

  return (
    <div className="relative">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-card">
        <iframe
          ref={videoRef}
          width="100%"
          height="100%"
          src={embedUrl}
          title="Course Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {showComplete && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleComplete} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark as Completed
          </Button>
        </div>
      )}
    </div>
  );
}