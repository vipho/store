import IconWhatsApp from "../assets/IconWhatsApp"
import IconViber from "../assets/IconViber"
import IconTelegram from "../assets/IconTelegram"

export default (props) => {
    return (
        <>
            {props.contacts.phone && props.contacts.phoneLink && (
                <a href={props.contacts.phoneLink} className="phone">{props.contacts.phone}</a>
            )}
            <div className="pt-2">
                {props.contacts.whatsAppLink && (
                    <a
                        className="messenger-icon messenger-icon_whatsapp"
                        href={props.contacts.whatsAppLink}
                    >
                        <IconWhatsApp/>
                    </a>
                )}
                {props.contacts.viberLink && (
                    <a
                        className="messenger-icon messenger-icon_viber"
                        href={props.contacts.viberLink}
                    >
                        <IconViber/>
                    </a>
                )}
                {props.contacts.telegramLink && (
                    <a
                        className="messenger-icon messenger-icon_telegram"
                        href={props.contacts.telegramLink}
                    >
                        <IconTelegram/>
                    </a>
                )}
            </div>
            <style jsx>{`
                @import 'everywhere.scss';
                
                .phone {
                    font-size: 18px;
                    color: $body-color;
                }
                .messenger-icon {
                    fill: #5C6B73;
                    margin-right: 12px;
                    width: 24px;
                    display: block;
                    float: left;
                }
                .messenger-icon_whatsapp:hover {
                    fill: #25D366;
                }
                .messenger-icon_viber:hover {
                    fill: #7360f2;
                }
                .messenger-icon_telegram:hover {
                    fill: #0088cc;
                }
            `}</style>
        </>
    )
}
