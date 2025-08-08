import { useRef, useState } from "react";
import "./ImgGallery.css";
import useScrollAnimation from "../../utils/useScrollAnimation";

interface ItemImgs {
  imageUrl: string;
  imageText: string;
}

function ImgGallery({ imgs }: { imgs: ItemImgs[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedImg, setSelectedImg] = useState<ItemImgs | null>(null);
  const hasMoved = useRef(false);

  const imgGallery = [...imgs, ...imgs];

  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useScrollAnimation(containerRef, isRunning, isDragging);

  // Mouse event handlers
  function handleMouseDown(e: React.MouseEvent) {
    const cont = containerRef.current;
    if (!cont) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - cont.offsetLeft;
    scrollLeft.current = cont.scrollLeft;
    setIsRunning(false); // pause auto-scroll
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    const cont = containerRef.current;
    if (!cont) return;
    e.preventDefault();
    hasMoved.current = true;
    const x = e.pageX - cont.offsetLeft;
    const walk = (x - startX.current) * 1; // scroll speed
    cont.scrollLeft = scrollLeft.current - walk;
  }

  function endDrag() {
    isDragging.current = false;
    setTimeout(() => setIsRunning(true), 2000);
  }

  function clickImg(img: ItemImgs) {
    if (hasMoved.current) return;
    setSelectedImg(img);
  }

  return (
    <div
      ref={containerRef}
      className="gallery-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {imgGallery.map((img, index) => (
        <img
          className="gallery-item"
          key={index}
          src={img.imageUrl}
          alt={img.imageText}
          draggable={false}
          onClick={() => clickImg(img)}
        />
      ))}
      {selectedImg && (
        <div className="modal-backdrop" onClick={() => setSelectedImg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImg(null)}
            >
              ×
            </button>
            <img src={selectedImg.imageUrl} alt={selectedImg.imageText} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImgGallery;
