import css from "./ImageCard.module.css";

const ImageCard = ({ images, onImageOpen }) => {
  return (
    <div className={css.image_container}>
      <ul className={css.image_gallery}>
        {images.map(({ id, urls }) => (
          <li key={id}>
            <img
              id={id}
              onClick={onImageOpen}
              className={css.image_card}
              src={urls.small}
              alt="image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageCard;
