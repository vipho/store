export default ({ data }) => {
    const prices = data.prices.map(({ price }) => price)
    const minPrice = Math.min(...prices)

    const images = data.images || []
    const image = images[0] || {}
    const imageURL = image.url ? `${process.env.API_URL}/${image.url}` : './assets/teddy-bear.png'

    return (
        <div className="col-sm-4 col-md-3 py-4">
            <div className="product">
                <a href="#"><div className="product__image"/></a>
                <a href="#" className="product__title">{data.title}</a>
                <p className="product__price text-nowrap">
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
                    font-size: 18px;
                    display: block;
                    color: $body-color;
                }
                .product__price {
                    margin: 4px 0 0 0;
                    text-align: right;
                }
            `}</style>
        </div>
    )
}
