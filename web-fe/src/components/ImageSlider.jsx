"use client";
import ReactImageGallery from "react-image-gallery";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

export default function ImageSlider({ pictures }) {
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;
  const images = pictures?.map((item) => ({
    original: `${imageBase}/${item}`,
    thumbnail: `${imageBase}/${item}`,
  }));
  return (
    <div className="space-y-2">
      <ReactImageGallery thumbnailPosition="left" items={images} />
    </div>
  );
}
