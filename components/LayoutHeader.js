import { useState } from 'react'
import { inject, observer } from 'mobx-react'

import Contacts from './Contacts'
import LayoutHeaderMenu from './LayoutHeaderMenu'

import IconMenu from '../assets/IconMenu'
import IconClose from "../assets/IconClose"

export default inject('store')(observer((props) => {
    const [menuActive, setMenuActive] = useState(false)
    const { siteName, contacts, nav } = props.store.generalInfo || {}
    const navLinks = ( nav && nav.links ) || [{ title: 'Главная', path: '/' }]

    return (
        <header>
            <div className="p-4">
                <div className="container">
                    <div className="row align-items-center flex-nowrap">
                        <div className="col d-none d-md-block">
                            { contacts && <Contacts contacts={contacts}/> }
                        </div>
                        <div className="col-auto flex-shrink-1"><span className="site-name text-break">{siteName}</span></div>
                        <div className="col">
                            <i
                                className="menu-icon"
                                onClick={() => setMenuActive(!menuActive)}
                            >
                                { menuActive ? <IconClose/> : <IconMenu/> }
                            </i>
                        </div>
                    </div>
                </div>
            </div>
            <LayoutHeaderMenu
                contacts={contacts}
                links={navLinks}
                opened={menuActive}
                close={() => setMenuActive(false)}
            />
            <style jsx>{`
                @import 'everywhere.scss';
                
                .site-name {
                    font-size: 24px;
                    color: $body-color;
                    font-family: 'Pacifico', cursive;
                }
                .menu-icon {
                    cursor: pointer;
                    fill: $body-color;
                    height: 20px;
                    width: 20px;
                    float: right;
                    display: block;
                }
            `}</style>
        </header>
    )
}))
