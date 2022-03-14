const pageloadModule = () => {
    const pageLoad = document.querySelector('#page-load')
    const pageLoader = pageLoad.querySelector('.page-load-loader')
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
    const popup = document.querySelector('#popup')
    const message = popup.querySelector('#message')
    const loader = popup.querySelector('#loader')
    const messageTitle = popup.querySelector('#message-title')
    const messageInfo = popup.querySelector('#message-info')
    const closeButtonAll = popup.querySelectorAll('#close-popup')

    closeButtonAll.forEach( item => item.addEventListener( 'click', () => {
        message.classList.remove('message-open')
        setTimeout( () => { popup.classList.remove('popup-open') }, 200 )
    } ) )

    return {
        startLoad(){
            popup.classList.add('popup-open')
            loader.classList.add('loader-open')
        },
        loaded( data ){
            loader.classList.remove('loader-open')
            message.classList.add('message-open')
            messageTitle.innerHTML = data.title
            messageInfo.innerHTML = data.message
        },
        open(){
            popup.classList.add('popup-open')
            setTimeout( () => { message.classList.add('message-open') }, 200 )
        }
    }
}

const formModul = () => {
    const subscribeForm = document.querySelector('#subscribe')
    const error = subscribeForm.querySelector('.subscribe__errors')
    const input = subscribeForm.querySelector('.subscribe__input')
    const button = subscribeForm.querySelector('.subscribe__submit')
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
            error.classList.remove('err-hidden')
        },
        hideError(){
            error.classList.add('err-hidden')
        }
    }
}

const pageload = pageloadModule()

document.addEventListener( 'DOMContentLoaded', () => {

    pageload.hide()

    /** Timer  */
    const timer = new Timer({
        initialDate: 'Dec 31 2022 00:00:00',
        timerId: 'timer'
    })

    /** Subscribe  */
    const subscribeForm = formModul()
    const popup = popupModule()

    subscribeForm.form.addEventListener( 'submit', subscribe )

    function subscribe( event ){
        event.preventDefault()

        const email = event.target[0].value
        
        if( isEmail( email ) ){
            const subsriberData = { email }
            popup.startLoad()
            request( `${window.location.href}/api/subscribe/`, 'POST', subsriberData )
                .then( response => {
                    setTimeout( () => {
                        subscribeForm.inputClear()
                        popup.loaded( response )
                    }, 200 )
                } )
                .catch( error => {
                    setTimeout( () => {
                        subscribeForm.inputClear()
                        popup.loaded( error )
                    }, 200 )
                } )
        }else{
            subscribeForm.inputClear()
            subscribeForm.disable()
            subscribeForm.showError()
            setTimeout( () => {
                subscribeForm.enable()
                subscribeForm.hideError()
            }, 5000 )
        }
    }

} )
