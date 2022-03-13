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
        loaded(){
            loader.classList.remove('loader-open')
            message.classList.add('message-open')
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

async function request( url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} ){
    try{
        const response = await fetch( url, { method, body: JSON.stringify( body ), headers } )
        if( !response.ok ) throw new Error( 'Error' )

        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( response.json() )
            }, 500 )
        } )
    }catch( error ){
        console.log( error )
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
            request( 'http://localhost:5000/api/subscribe/', 'POST', subsriberData )
                .then( data => {
                    console.log( data )
                    popup.startLoad()
                } )
                .then( data => {
                    console.log( data )
                    popup.loaded()
                } )
                .catch( error => console.log( error ) )
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
