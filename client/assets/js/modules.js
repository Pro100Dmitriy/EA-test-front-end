const preloaderModule = () => {
    const pageLoad = document.querySelector('#js-preloader')
    const pageLoader = pageLoad.querySelector('.js-loader__spiner')
    return {
        hide(){
            css( pageLoader, {
                opacity: 0
            } )
            setTimeout( () => {
                css( pageLoad, {
                    transform: 'scaleY( 0 )'
                } )
            }, 500 )
        }
    }
}


const popupModule = () => {
    const popup = document.querySelector('.js-popup')
    const message = popup.querySelector('.js-popup__message')
    const loader = popup.querySelector('.js-popup__loader')
    const messageTitle = popup.querySelector('.js-message__title')
    const messageInfo = popup.querySelector('.js-message__info')
    const closeButtonAll = popup.querySelectorAll('.js-close-popup')

    closeButtonAll.forEach( item => item.addEventListener( 'click', () => {
        message.classList.remove('popup__message_open')
        setTimeout( () => { popup.classList.remove('popup_open') }, 200 )
    } ) )

    return {
        startLoad(){
            popup.classList.add('popup_open')
            loader.classList.add('popup__loader_open')
        },
        loaded( data ){
            loader.classList.remove('popup__loader_open')
            message.classList.add('popup__message_open')
            messageTitle.innerHTML = data.title
            messageInfo.innerHTML = data.message
        },
        open(){
            popup.classList.add('popup_open')
            setTimeout( () => { message.classList.add('popup__message_open') }, 200 )
        }
    }
}


const formModule = () => {
    const subscribeForm = document.querySelector('.js-subscribe')
    const error = subscribeForm.querySelector('.js-subscribe__errors')
    const input = subscribeForm.querySelector('.js-subscribe__input')
    const button = subscribeForm.querySelector('.js-subscribe__submit')
    return {
        form: subscribeForm,
        inputClear(){
            input.value = ''
        },
        disable(){
            button.disabled = true
        },
        enable(){
            button.disabled = false
        },
        showError(){
            error.classList.remove('subscribe__errors_hidden')
        },
        hideError(){
            error.classList.add('subscribe__errors_hidden')
        }
    }
}