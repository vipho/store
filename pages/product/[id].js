import fetch from "isomorphic-unfetch"
import Router from 'next/router'
import Head from "next/head";
import { useState } from 'react'
import {inject, observer} from "mobx-react";

import Layout from "../../components/Layout"
import ProductImages from "../../components/ProductImages"
import ProductDescription from "../../components/ProductDescription"

const Index = inject('store')(observer(({ product, store }) => {
    const images = product.images || []
    const image = images[0] || {}
    const imageURL = image.url ? `${process.env.API_URL}${image.image.url}` : '/assets/teddy-bear.png'
    const [activeImage, setActiveImage] = useState(image)

    return (
        <Layout>
            <Head>
                <title>{product.title} - {store.generalInfo.siteName}</title>
                <meta property="og:title" content={product.title}/>
                { imageURL && <meta property="og:image" content={imageURL}/> }
            </Head>
            <div className="px-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 p-0">
                            <ProductImages product={product} activeImage={activeImage}/>
                        </div>
                        <div className="col-md-6 py-4">
                            { product && <ProductDescription product={product} setActiveImage={setActiveImage}/> }
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @import 'everywhere.scss';
                
            `}</style>
        </Layout>
    )
}))

Index.getInitialProps = async (context) => {
    const res = await fetch(`${process.env.API_URL}/products/${context.query.id}`)
    if (res.status !== 200) {
        if (context) {
            context.res.writeHead(302, {
                Location: '/'
            })
            context.res.end()
        } else {
            Router.push('/')
        }
    }
    const product = await res.json()

    return {
        product
    }
}

export default Index
