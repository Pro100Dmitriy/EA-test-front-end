const pageload = preloaderModule()

document.addEventListener( 'DOMContentLoaded', () => {

    pageload.hide()

    /** Timer  */
    const timer = new Timer({
        initialDate: 'Dec 31 2022 00:00:00',
        timerId: 'js-timer'
    })

    /** Subscribe  */
    const subscribeForm = formModule()
    const popup = popupModule()

    subscribeForm.form.addEventListener( 'submit', subscribe )

    function subscribe( event ){
        event.preventDefault()

        const email = event.target[0].value
        
        if( isEmail( email ) ){
            const subsriberData = { email }
            popup.startLoad()
            request( `${window.location.href}api/subscribe/`, 'POST', subsriberData )
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
