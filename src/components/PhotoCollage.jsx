import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PhotoCollage.css";
import Dialog from "./Dialog";
import LetterDialog from "./LetterDialog";

// 🖼️ Replace src values with your actual image paths
const photos = [
  { id: 1, src: "/images/photo1.jpg", caption: "my fav 🤍", rotate: -4.5, top: "4%",  left: "4%",  zIndex: 3 },
  { id: 2, src: "/images/photo2.jpg", caption: "hehe 🌸",   rotate:  3.2, top: "6%",  left: "38%", zIndex: 5 },
  { id: 3, src: "/images/photo3.jpg", caption: "us 💜",     rotate: -2.8, top: "7%",  left: "68%", zIndex: 2 },
  { id: 4, src: "/images/photo4.jpg", caption: "bestie 🎀", rotate:  5.1, top: "46%", left: "6%",  zIndex: 4 },
  { id: 5, src: "/images/photo5.jpg", caption: "memories ✨",rotate: -3.6, top: "47%", left: "36%", zIndex: 6 },
  { id: 6, src: "/images/photo6.jpg", caption: "love u 🌷", rotate:  2.4, top: "46%", left: "67%", zIndex: 1 },
];

// Washi tape color strips per photo
const tapeColors = [
  "#f6c5c5", "#c5ddf6", "#f6ecc5",
  "#d4c5f6", "#c5f6d4", "#f6c5e8",
];

function PhotoCollage() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  const handlePhotoClick = (id) => {
    setClickedId(id);
    setTimeout(() => {
      navigate("/gallery");
    }, 350);
  };

  const handleOpenLetter = () => setShowDialog(true);
  const handleYes = () => { setShowDialog(false); setShowLetter(true); };
  const handleNo  = () => setShowDialog(false);
  const handleCloseLetter = () => setShowLetter(false);

  return (
    <div className="collage-main">
      {showDialog && <Dialog onYes={handleYes} onNo={handleNo} />}
      {showLetter  && <LetterDialog onClose={handleCloseLetter} />}

      {/* Grain overlay for paper texture */}
      <div className="collage-grain" aria-hidden="true" />

      {/* Top header strip */}
      <div className="collage-header">
        <span className="collage-header-text">✦ our moments ✦</span>
      </div>

      {/* Scrapbook board */}
      <div className="collage-board">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className={`polaroid ${hoveredId === photo.id ? "polaroid-hovered" : ""} ${clickedId === photo.id ? "polaroid-clicked" : ""}`}
            style={{
              top: photo.top,
              left: photo.left,
              zIndex: hoveredId === photo.id ? 20 : photo.zIndex,
              "--rotate": `${photo.rotate}deg`,
              animationDelay: `${i * 0.1}s`,
            }}
            onClick={() => handlePhotoClick(photo.id)}
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Washi tape */}
            <div
              className="washi-tape"
              style={{ background: tapeColors[i] }}
              aria-hidden="true"
            />

            {/* Photo */}
            <div className="polaroid-img-wrap">
              <img src={photo.src} alt={photo.caption} draggable={false} />
              <div className="polaroid-shimmer" aria-hidden="true" />
            </div>

            {/* Caption strip */}
            <div className="polaroid-caption">{photo.caption}</div>
          </div>
        ))}

        {/* Decorative stickers */}
        <span className="sticker sticker-star"  style={{ top: "36%", left: "50%"  }}>⭐</span>
        <span className="sticker sticker-heart" style={{ top: "88%", left: "22%"  }}>🌸</span>
        <span className="sticker sticker-bow"   style={{ top: "3%",  left: "55%"  }}>🎀</span>
        <span className="sticker sticker-gem"   style={{ top: "90%", left: "70%"  }}>💜</span>
        <span className="sticker sticker-star"  style={{ top: "42%", left: "28%"  }}>✨</span>
      </div>

      {/* Bottom letter button */}
      <div className="collage-footer">
        <button className="letter-btn" onClick={handleOpenLetter}>
          <span className="letter-btn-icon">💌</span>
          <span>read my letter</span>
        </button>
        <p className="collage-hint">tap any photo to see more ↗</p>
      </div>
    </div>
  );
}

export default PhotoCollage;