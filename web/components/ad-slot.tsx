"use client";

interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
  format?: "horizontal" | "rectangle" | "vertical";
}

export default function AdSlot({ className, style, format = "horizontal" }: AdSlotProps) {
  const getDimensions = () => {
    switch (format) {
      case "horizontal":
        return { width: "100%", minHeight: "120px", maxHeight: "250px" };
      case "rectangle":
        return { width: "100%", minHeight: "250px", maxHeight: "300px" };
      case "vertical":
        return { width: "100%", minHeight: "600px", maxHeight: "600px" };
    }
  };

  const dimensions = getDimensions();

  return (
    <div
      className={`ad-placeholder ${className || ""}`}
      style={{
        ...dimensions,
        backgroundColor: "#f1f5f9",
        border: "1px dashed #cbd5e1",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        margin: "32px 0",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "4px",
        }}
      >
        Reklam Alanı
      </span>
      <span style={{ fontSize: "11px", color: "#cbd5e1" }}>Google AdSense</span>

      {/* Actual AdSense code will go here once the user gets their ad slot IDs */}
      {/* <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-XXXXXX"
           data-ad-slot="XXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
    </div>
  );
}
