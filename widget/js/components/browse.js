import React from 'react';
import ProductList from './component-list';
import { products } from '../constants/routes';
import { Link } from 'react-router-dom';
import { getProductMediaUrl } from '../utilities/media-utils';
import '../../css/browse.css';

const Browse = ({
  products,
  categoryName,
  imageAttributeKey,
  onClickAddToCart,
  shortDescriptionAtName
}) => (
  <div className="Browse">
    <h1 className="Browse-title">{categoryName}</h1>
    <ProductList
      items={products.map(({ sku, ...rest }) => ({
        ...rest,
        sku,
        imageAttributeKey,
        shortDescriptionAtName,
        uniqueKey: sku
      }))}
      onClickAddToCart={onClickAddToCart}
      renderedElement={BrowseProductCard}
    />
  </div>
);

const BrowseProductCard = ({
  sku,
  name,
  price,
  custom_attributes,
  onClickAddToCart,
  imageAttributeKey,
  shortDescriptionAtName
}) => (
  <div className="Browse-card">
    <div className="Browse-card-left">
      {imageAttributeKey &&
        custom_attributes.find(
          attribute => attribute.attribute_code === imageAttributeKey
        ).value && (
          <Link to={`${products}/${sku}`}>
            <img
              className="Browse-card-image"
              src={getProductMediaUrl(
                custom_attributes.find(
                  attribute => attribute.attribute_code === imageAttributeKey
                ).value
              )}
            />
          </Link>
        )}
    </div>
    <div className="Browse-card-right">
      <div className="Browse-card-right-top">
        <Link to={`${products}/${sku}`} className="text-primary">
          <p className="Browse-card-name clamp-one">{name}</p>
        </Link>
        {shortDescriptionAtName &&
          custom_attributes.find(
            attribute => attribute.attribute_code === shortDescriptionAtName
          ).value && (
            <p className="Browse-card-description clamp-two">
              {
                custom_attributes.find(
                  attribute =>
                    attribute.attribute_code === shortDescriptionAtName
                ).value
              }
            </p>
          )}
      </div>
      <div className="Browse-card-right-bottom">
        <div className="Browse-card-price">
          <p>${price}</p>
        </div>
        <div className="Browse-card-button">
          <button
            className="Browse-atc btn btn-primary"
            name={sku}
            onClick={onClickAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Browse;
