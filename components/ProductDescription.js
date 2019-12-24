import { useState, useEffect } from 'react'
import classNames from 'classnames'
import ProductDescriptionForm from "./ProductDescriptionForm";

import find from 'lodash/find'

export default ({ product, setActiveImage }) => {
    const [color, setColor] = useState(product.colors[0] || {})
    const [price, setPrice] = useState(product.prices[0] || {})

    useEffect(() => {
        const activeImage = find(product.images, { color, size: price.size })
        setActiveImage(activeImage)
    }, [color, price])


    return (
        <>
            <h1 className="h4">{ product.title }</h1>

            { product.colors.length !== 0 && (
                <div className="option-group">
                    <h2 className="option-group__heading">Цвет</h2>
                    { product.colors.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setColor(item)}
                            className={classNames('option-group__button', { 'option-group__button_active': color === item })}
                        >
                            {item.value}
                        </button>
                    ))}
                </div>
            )}

            { product.prices.length !== 0 && (
                <div className="option-group">
                    <h2 className="option-group__heading">Размер</h2>
                    { product.prices.map((item) => item.size ? (
                        <button
                            key={item.id}
                            onClick={() => setPrice(item)}
                            className={classNames('option-group__button', { 'option-group__button_active': price === item })}
                        >
                            {item.size.value}
                        </button>
                    ) : null)}
                </div>
            )}

            <div className="option-group">
                <h2 className="option-group__price">{price.price || 0} &#8372;</h2>
            </div>

            <ProductDescriptionForm productId={product.id} color={color} price={price}/>

            <style jsx>{`
                @import 'everywhere.scss';
                
                .option-group {
                    margin-top: 24px;
                }
                .option-group__heading {
                    font-size: 18px;
                    margin: 0;
                }
                .option-group__button {
                    background: transparent;
                    border: 1px solid #{$store-color-secondary};
                    color: $store-color-dark;
                    border-radius: 4px;
                    padding: 8px;
                    line-height: normal;
                    outline: none;
                    margin: 16px 16px 0 0;
                    
                    &_active, &:hover {
                        border-color: $store-color-primary;
                    }
                }
                .option-group__price {
                    margin: 0;
                    line-height: normal;
                }
            `}</style>
        </>
    )
}
