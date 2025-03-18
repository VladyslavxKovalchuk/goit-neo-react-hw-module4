import ImageCard from "./ImageCard";
import css from "./css/ImageGallery.module.css";

export default function ImageGallery({ photos, onImageClick }) {
  return (
    <ul className={css.ImageGallery}>
      {photos.map((photo) => (
        <li
          key={photo.id}
          className={css.ImageGalleryItem}
        >
          <ImageCard
            thumb={photo.urls.small}
            alt={photo.alt_description}
            onClick={() => onImageClick(photo)}
          />
        </li>
      ))}
    </ul>
  );
}