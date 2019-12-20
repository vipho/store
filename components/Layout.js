import { inject, observer } from 'mobx-react'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'

export default inject('store')(observer((props) => {
    return (
        <div className="py-4">
            <LayoutHeader/>
            {
                props.store.generalInfo.description && (
                    <div className="container py-4">
                        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 text-center lead">{props.store.generalInfo.description}</div>
                    </div>
                )
            }
            {props.children}
            <LayoutFooter/>
            <style jsx>{`
            `}</style>
        </div>
    )
}))
