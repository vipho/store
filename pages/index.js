import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Product from '../components/Product'

const Index = ({ products }) => {
    return (
        <Layout>
            <div className="px-4">
                <div className="container">
                    <div className="row">
                        {
                          products.map((data) => <Product key={data.id} data={data}/>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch(`${process.env.API_URL}/products`)
    const products = await res.json()

    return {
        products
    }
}

export default Index
