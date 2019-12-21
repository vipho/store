import { useState } from 'react'
import InputMask from 'react-input-mask';
import axios from 'axios'

export default (props) => {
    const [error, setError] = useState('')

    const [formStatus, setFormStatus] = useState('closed')

    const [formPhone, setFormPhone] = useState('')
    const [formName, setFormName] = useState('')
    const [formCity, setFormCity] = useState('')
    const [formPost, setFormPost] = useState('')
    const [formComment, setFormComment] = useState('')

    const onSubmit = async e => {
        e.preventDefault()
        setError('')
        if (formPhone === '') {
            setError('Не введён номер телефона')
            return
        }
        try {
            await axios.post(`${process.env.API_URL}/orders`, {
                product: props.productId,
                color: props.color.id,
                size: props.price.size.id,
                price: props.price.price,
                phone: formPhone,
                name: formName,
                city: formCity,
                post: formPost,
                comment: formComment,
            })
            setFormStatus('ordered')
        } catch (e) {
            setError('Произошла ошибка при отправке.')
        }
        return false
    }

    return (
        <>
            { formStatus === 'closed' && (
                <button
                    className="order-button mt-4"
                    onClick={() => setFormStatus('opened')}
                >
                    Хочу купить!
                </button>
            )}
            { formStatus === 'opened' && (
                <form onSubmit={onSubmit} className="mt-4">
                    <div className="form-group">
                        <label>Телефон</label>
                        <InputMask value={formPhone} onChange={({ target }) => setFormPhone(target.value)} mask="+380 (99) 999 99 99" className="form-control"/>
                        <small className="form-text text-muted">Обязательно</small>
                    </div>
                    <div className="form-group">
                        <label>ФИО</label>
                        <input value={formName} onChange={({ target }) => setFormName(target.value)} type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Город</label>
                        <input value={formCity} onChange={({ target }) => setFormCity(target.value)} type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Номер почтового отделения</label>
                        <input value={formPost} onChange={({ target }) => setFormPost(target.value)} type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Комментарий</label>
                        <textarea value={formComment} onChange={({ target }) => setFormComment(target.value)} className="form-control"/>
                    </div>
                    <input type="submit" className="order-button" value="Заказать"/>
                    {
                        error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )
                    }
                </form>
            )}
            { formStatus === 'ordered' && (
                <div className="alert alert-success" role="alert">
                    Спасибо за заказ! Мы скоро свяжемся с Вами.
                </div>
            )}
            <style jsx>{`
                @import 'everywhere.scss';
                
                .order-button {
                    background: $store-color-light;
                    color: $store-color-dark;
                    width: 100%;
                    padding: 8px;
                    border-radius: 4px;
                    border: 1px solid #{$store-color-secondary};
                    outline: none;
                    margin-top: 8px;
                    
                    &:active {
                       border-color: $store-color-primary;
                    }
                }
                
                .alert {
                    margin: 24px 0 0 0;
                }
            `}</style>
        </>
    )
}
