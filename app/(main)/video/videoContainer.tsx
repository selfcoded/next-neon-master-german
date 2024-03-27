"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useIsClient, useEventListener } from "usehooks-ts";
import { PlayIcon, PauseIcon, MaximizeIcon, MinimizeIcon } from "lucide-react";

const VideoContainer = () => {
  const isClient = useIsClient();
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(800);
  const Icon = playing ? PauseIcon : PlayIcon;
  const FullscreenIcon = isFullscreen ? MinimizeIcon : MaximizeIcon;
  const onClick = () => {
    if (playing) {
      setPlaying(!playing);
      videoRef.current?.pause();
    } else {
      setPlaying(!playing);
      videoRef.current?.play();
    }
    //   if (ref.current) ref.current.requestFullscreen();
  };

  const onFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      ref.current?.requestFullscreen();
    }
  };
  const handleFullscreen = () => {
    const isCurrentFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentFullscreen);
  };
  const onfocus = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };
  useEventListener("fullscreenchange", handleFullscreen, ref);
  useEffect(() => {
    if (!parentRef.current || !dragRef.current) return;
    const ele = parentRef.current;
    const childrenEle = dragRef.current;
    const styles = window.getComputedStyle(ele);
    console.log(styles.width);
    let parentWidth = parseInt(styles.width, 10);

    let xCord = 0;
    const onmousemovesize = (event: MouseEvent) => {
      if (parentRef.current) {
        const dx = event.clientX - xCord;
        xCord = event.clientX;
        parentWidth = parentWidth + dx;
        parentRef.current.style.width = `${parentWidth}px`;
      }
    };
    const onmouseup = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onmousemovesize);
    };

    const onmousedown = (event: MouseEvent) => {
      xCord = event.clientX;
      if (parentRef.current) {
        document.addEventListener("mousemove", onmousemovesize);
        document.addEventListener("mouseup", onmouseup);
      }
    };
    childrenEle.addEventListener("mousedown", onmousedown);

    return () => {
      childrenEle.removeEventListener("mousedown", onmousedown);
    };
  }, []);
  return (
    <div className="w-full h-full">
      <div ref={ref} className="bg-black flex h-[400px] justify-between">
        <div
          className="relative flex justify-between items-center "
          //   style={{ width: `${width}px` }}
        >
          <div
            ref={parentRef}
            className="relative w-full h-full flex justify-center items-center"
          >
            <video
              ref={videoRef}
              preload="none"
              width={isFullscreen ? 900 : 600}
              onEnded={() => setPlaying(false)}
              // controls
            >
              <source src="/video.mp4" type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute w-full h-10 bg-white/50 bottom-0 opacity-0 hover:opacity-100 transition-all">
              <Button onClick={onClick} variant={"ghost"}>
                <Icon />
              </Button>
              <Button onClick={onFullscreen} variant={"ghost"}>
                <FullscreenIcon />
              </Button>
            </div>
            <div
              className="w-2 h-full absolute right-0 top-0 bg-green-500 cursor-col-resize"
              ref={dragRef}
            ></div>
          </div>
        </div>
        <div className="bg-slate-300 grow flex flex-col gap-y-3 px-3 py-2">
          <div>what did you hear</div>
          <Input ref={inputRef} onFocus={onfocus} />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
