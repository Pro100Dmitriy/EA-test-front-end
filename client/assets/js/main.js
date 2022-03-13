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

const isEmail = ( initialValue ) => {
    const regExEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g
    const testEmail = initialValue.match( regExEmail )

    if( testEmail ){
        return true
    }else{
        return false
    }
}




document.addEventListener( 'DOMContentLoaded', () => {

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
            fetch( 'http://localhost:5000/api/subscribe/', { method: 'POST', body: JSON.stringify( subsriberData ), headers: {'Content-Type': 'application/json'} } )
                .then( data => {
                    subscribeForm.inputClear()
                    popup.startLoad()
                    return data.json()
                } )
                .then( response => {
                    setTimeout( () => { popup.loaded( response ) }, 200 )
                } )
                .catch( error => {
                    popup.startLoad()
                    setTimeout( () => { popup.loaded( {
                        title: 'Error',
                        message: 'An unexpected error occurred!'
                    } ) }, 200 )
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
