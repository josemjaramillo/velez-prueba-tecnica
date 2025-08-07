import { useEffect, useRef, useState } from "react";
import "./ImgGallery.css"

interface ItemImgs {
    imageUrl: string;
    imageText: string;
}

function ImgGallery({ imgs }: { imgs: ItemImgs[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRunning, setIsRunning] = useState(true);

    const imgGallery = [...imgs, ...imgs];

    useEffect(() => {
        const cont = containerRef.current;
        if (!cont) return;

        let reqId: number;

        const animate = () => {
            const speed = 5;
            if (isRunning) {
                cont.scrollLeft += speed;
                // si llegamos al final de la primera mitad, reinicia:
                // if (cont.scrollLeft >= cont.scrollWidth / 2) {
                //     cont.scrollLeft -= cont.scrollWidth / 2;
                // }

                const half = cont.scrollWidth / 2;
                if (cont.scrollLeft >= half) {
                    cont.scrollLeft = cont.scrollLeft % half;
                }
            }
            reqId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(reqId);
    }, [isRunning]);

    return (
        <div
            ref={containerRef}
            className="gallery-container"
            onMouseEnter={() => setIsRunning(false)}
            onMouseLeave={() => setIsRunning(true)}
        >
            {imgGallery.map((img, index) => (
                <img
                    className="gallery-item"
                    key={index}
                    src={img.imageUrl}
                    alt={img.imageText}
                />
            ))}
        </div>
    );
}

export default ImgGallery;
