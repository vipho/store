import { inject, observer } from 'mobx-react'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'

export default inject('store')(observer((props) => {
    return (
        <div className="py-4">
            <LayoutHeader/>
            {props.children}
            <LayoutFooter/>
            <style jsx>{`
            `}</style>
        </div>
    )
}))
