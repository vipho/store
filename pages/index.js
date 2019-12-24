import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

import Layout from '../components/Layout'
import ListItem from '../components/ListIteam'
import {inject, observer} from "mobx-react"

const Index = inject('store')(observer(({ products, store }) => {
    return (
        <Layout>
            <Head>
                <title>{store.generalInfo.siteName}</title>
            </Head>
            {
                store.generalInfo.description && (
                    <div className="container py-4">
                        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 text-center lead">{store.generalInfo.description}</div>
                    </div>
                )
            }
            <div className="px-4">
                <div className="container">
                    <div className="row">
                        {
                          products.map((product) => <ListItem key={product.id} product={product}/>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}))

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.API_URL}/products`)
    const products = await res.json()

    return {
        products
    }
}

export default Index
