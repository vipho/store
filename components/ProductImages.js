import { useState } from 'react'
import classNames from 'classnames'

export default ({ product }) => {
    const images = product.images || []
    const [activeImage, setActiveImage] = useState(images[0])
    const imageSrc = activeImage ? ( process.env.API_URL + activeImage.url ) : '/assets/teddy-bear.png'

    return (
        <>
            <div className="p-4">
                <a
                    href={imageSrc}
                    target="_blank"
                >
                    <img
                        className="image"
                        src={imageSrc}
                        alt={product.title}
                    />
                </a>
            </div>
            {
                images.length !== 0 && (
                    <div className="container">
                        <div className="row">
                            {
                                product.images.map((item) => (
                                    <div
                                        key={item.id}
                                        className="col-sm-3 col-4 py-4"
                                    >
                                        <div onClick={() => setActiveImage(item)} className={classNames('mini-image mini-image_mini', { 'mini-image_active': activeImage === item })}>
                                            <div
                                                className="mini-image__image"
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
                
                .image {
                    max-width: 100%;
                    max-height: 400px;
                    margin: 0 auto;
                    display: block;
                    border-radius: 4px;
                }
                .mini-image {
                    margin: 0 auto;
                    max-width: 128px;
                    cursor: pointer;
                    padding: 1px;
                    border-radius: 4px;
                }
                .mini-image_active {
                    border: 1px solid #93b5b3;
                }
                .mini-image__image {
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