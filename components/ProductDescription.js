import { useState, useEffect } from 'react'
import classNames from 'classnames'
import ProductDescriptionForm from "./ProductDescriptionForm";

import find from 'lodash/find'

export default ({ product, colors, sizes, setActiveImage }) => {
    const [color, setColor] = useState(colors[0] || null)
    const [size, setSize] = useState(sizes[0] || null)
    const [price, setPrice] = useState(size && find(product.prices, { size: { id: size.id } }))

    useEffect(() => {
        const activeImage = size && color && find(product.images, { color: { id: color.id }, size: { id: size.id } })
        setActiveImage(activeImage)

        const newPrice = size && find(product.prices, { size: { id: size.id } })
        setPrice(newPrice)
    }, [size, color])

    return (
        <>
            <h1 className="h4">{ product.title }</h1>

            { product.description && (
                <p className="description">{product.description}</p>
            )}

            { colors.length !== 0 && (
                <div className="option-group">
                    <h2 className="option-group__heading">Цвет</h2>
                    { colors.map((item) => (
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

            { sizes.length !== 0 && (
                <div className="option-group">
                    <h2 className="option-group__heading">Размер</h2>
                    { sizes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSize(item)}
                            className={classNames('option-group__button', { 'option-group__button_active': size === item })}
                        >
                            {item.value}
                        </button>
                    ))}
                </div>
            )}

            <div className="option-group">
                <h2 className="option-group__price">{price ? price.price : 0} &#8372;</h2>
            </div>

            <ProductDescriptionForm productId={product.id} color={color} price={price}/>

            <style jsx>{`
                @import 'everywhere.scss';
                
                .description {
                    margin: 24px 0 0 0;
                }
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
