import { useState } from 'react'
import classNames from 'classnames'

export default ({ product }) => {
    const images = product.images || []
    const [activeImage, setActiveImage] = useState(images[0])

    return (
        <>
            <div className="product p-4">
                <div
                    className="product__image"
                    style={{ backgroundImage: activeImage ? `url(${process.env.API_URL}/${activeImage.url})` : null }}
                />
            </div>
            {
                images.length !== 0 && (
                    <div className="container">
                        <div className="row">
                            {
                                product.images.map((item) => (
                                    <div
                                        key={item.id}
                                        className="col-4 py-4"
                                    >
                                        <div onClick={() => setActiveImage(item)} className={classNames('product product_mini', { 'product_active': activeImage === item })}>
                                            <div
                                                className="product__image"
                                                style={{ backgroundImage: `url(${process.env.API_URL}/${item.url})` }}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <style jsx>{`
                @import 'everywhere.scss';

                .product {
                    max-width: 400px;
                    margin: 0 auto;
                }
                .product_active {
                    border: 1px solid #93b5b3;
                }
                .product_mini {
                    max-width: 128px;
                    cursor: pointer;
                    padding: 1px;
                    border-radius: 4px;
                }
                .product__image {
                    width: 100%;
                    padding-top: 100%;
                    background: 100% 100% no-repeat;
                    background-image: url(/assets/teddy-bear.png);
                    background-size: cover;
                    border-radius: 4px;
                    position: relative;
                }
            `}</style>
        </>
    )
}