import Link from 'next/link'

export default ({ product }) => {
    const prices = product.prices.map(({ price }) => price)
    const minPrice = prices.length !== 0 ? Math.min(...prices) : 0

    const images = product.images || []
    const image = images[0] || {}
    const imageURL = image.image ? `${process.env.API_URL}${image.image.url}` : '/assets/teddy-bear.png'

    return (
        <div className="col-sm-4 col-md-3 py-4">
            <div className="product">
                <Link href={`/product/${product.id}`}><a><div className="product__image"/></a></Link>
                <Link href={`/product/${product.id}`}><a className="product__title">{product.title}</a></Link>
                <p className="product__price">
                    от {minPrice} &#8372;
                </p>
            </div>
            <style jsx>{`
                @import 'everywhere.scss';

                .product {
                    max-width: 320px;
                    margin: 0 auto;
                }
                .product__image {
                    padding-top: 100%;
                    background: url(${imageURL}) 100% 100% no-repeat;
                    background-size: cover;
                    border-radius: 4px;
                    position: relative;
                    
                    &:before {
                        content: '';
                        top: 0;
                        left: 0;
                        position: absolute;
                        width: 100%;
                        padding-top: 100%;
                        transition: background-color ease .1s;
                    }
                    &:hover:before {
                        background: rgba(0, 0, 0, .15);
                    }
                }
                .product__title {
                    margin: 12px 0 0 0;
                    text-align: center;
                    display: block;
                    color: $body-color;
                }
                .product__price {
                    margin: 4px 0 0 0;
                    text-align: center;
                    font-weight: 500;
                }
            `}</style>
        </div>
    )
}
