import React from "react";
import { assets } from "../../assets/assets";

interface AssetIconProps {
  /** The key of the SVG/icon in the assets object, e.g., 'person_icon' */
  name: keyof typeof assets;
  /** The alt text for the image */
  alt: string;
  /** Optional style for the image */
  style?: React.CSSProperties;
  /** Optional className for styling */
  className?: string;
}

/**
 * Renders an SVG or image from the assets object by key.
 */
const AssetIcon: React.FC<AssetIconProps> = ({
  name,
  alt,
  style = { width: 18, height: 18, verticalAlign: "middle" },
  className,
}) => {
  const src = assets[name];
  if (!src) {
    // Optionally, render a fallback or nothing if the asset is missing
    return null;
  }
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      draggable={false}
    />
  );
};

export default AssetIcon;
