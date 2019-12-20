import classNames from 'classnames'
import Link from 'next/link'
import Contacts from "./Contacts"

export default (props) => {
    return (
        <>
            <div className={classNames('menu d-none d-md-flex justify-content-center', { 'menu_opened': props.opened })}>
                <ul className='menu__nav menu__nav_horizontal'>
                    {
                        props.links.map(({ title, path }) => (
                            <li key={title}>
                                <Link href={path}>
                                    <a>{title}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={classNames('menu d-flex d-md-none flex-column align-items-center', { 'menu_opened': props.opened })}>
                <ul className='menu__nav menu__nav_vertical'>
                    {
                        props.links.map(({ title, path }) => (
                            <li
                                onClick={props.close}
                                key={title}
                            >
                                <Link href={path}>
                                    <a>{title}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                { props.contacts && (
                    <div className='menu__contacts d-flex flex-column align-items-center'>
                        <Contacts contacts={props.contacts}/>
                    </div>
                )}
            </div>
            <style jsx>{`
                .menu {
                    background: #f2f6f5;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height .3s ease-out;
                }
                .menu_opened {
                    max-height: 500px;
                    transition: max-height .3s ease-in;
                }
                .menu__nav {
                    list-style: none;
                    margin: 0;
                    padding-inline-start: 0;
                }
                .menu__nav_vertical {
                      padding: 16px 0;
                }
                .menu__nav_horizontal > li {
                    float: left;
                    padding: 0 16px;
                }
                .menu__nav {
                  > li {
                    padding: 16px;
                    text-align: center;
                    
                    > a {
                        color: #93b5b3;
                    }
                  }
                }
                .menu__contacts {
                    padding-bottom: 32px;
                }
            `}</style>
        </>
    )
}