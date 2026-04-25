import { QRCodeSVG } from "qrcode.react";
import "../styles/QRCodeComponent.css";

function QRCodeComponent() {
  return (
    <div className="main-container">
      <div className="qr-container">
        <QRCodeSVG
          value="https://respartinez.github.io/hbd/#/envelope"
          size={190}
          fgColor="#4B0082"
          bgColor="#fff1f2"
        />
        <h2>SCAN TO OPEN</h2>
      </div>
    </div>
  );
}

export default QRCodeComponent;