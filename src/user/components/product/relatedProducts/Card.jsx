import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./css/Card.module.scss";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  function productClicked(id, permalink) {
    navigate(`/product/${permalink}/${id}`)
  }

  return (
      <Card 
        className={`${styles.card}`} 
        key={product.id} 
        style={{ width: "18rem" }} 
        onClick={() => productClicked(product.id, product.permalink)}
      >
          <div className="position-relative">
            <Card.Img
              variant="top"
              src={product.featuredImage || "/default-product.png"}
              alt={product.title}
            />
            <Badge 
              bg="primary" 
              className="position-absolute top-0 end-0 m-2"
            >
              -25%
            </Badge>
          </div>
          <Card.Body>
            <Card.Title>{product.title || "Untitled"}</Card.Title>
            <Card.Text>
              <strong>${product.price || "0.00"}</strong>{" "}
              <del className="text-muted">$39.95</del>
            </Card.Text>
          </Card.Body>
        </Card>
  )
}

export default ProductCard;