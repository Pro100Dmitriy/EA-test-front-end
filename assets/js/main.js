class Timer{
    constructor( {initialDate, timerId} ){
        this.wrapper = document.querySelector( `#${timerId}` ) ?? null

        if( !this.wrapper ) return

        this.initialDate = Date.parse( initialDate )

        function loop(){
            requestAnimationFrame( loop.bind(this) )
            this.update()
        }
        loop.bind(this)()

        this.windowResize()
    }

    windowResize(){
        this.windowWidth = window.innerWidth
        window.addEventListener( 'resize', () => {
            this.windowWidth = window.innerWidth
            console.log( this.windowWidth )
        } )
    }

    update(){
        this.now = Date.now()
        this.gap = this.initialDate - this.now

        this.days()
        this.hours()
        this.minutes()
        this.seconds()
    }

    days(){
        const daysWrap = this.wrapper.querySelector('#days')
        const daysValue = daysWrap.querySelector('.time-value')
        const daysName = daysWrap.querySelector('.time-name')

        let floor = Math.floor( this.gap / 1000 / 60 / 60 / 24 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Days' : 'DD'

        daysValue.innerHTML = value
        daysName.innerHTML = name
    }

    hours(){
        const hoursWrap = this.wrapper.querySelector('#hours')
        const hoursValue = hoursWrap.querySelector('.time-value')
        const hoursName = hoursWrap.querySelector('.time-name')

        let floor = Math.floor( (this.gap / 1000 / 60 / 60) % 24 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Hours' : 'HH'

        hoursValue.innerHTML = value
        hoursName.innerHTML = name
    }

    minutes(){
        const minutesWrap = this.wrapper.querySelector('#minutes')
        const minutesValue = minutesWrap.querySelector('.time-value')
        const minutesName = minutesWrap.querySelector('.time-name')

        let floor = Math.floor( (this.gap / 1000 / 60) % 60 )
        let name = floor < 10 ? `0${floor}` : floor
        let value = this.windowWidth > 768 ? 'Minutes' : 'MM'

        minutesValue.innerHTML = name
        minutesName.innerHTML = value
    }

    seconds(){
        const secondsWrap = this.wrapper.querySelector('#seconds')
        const secondsValue = secondsWrap.querySelector('.time-value')
        const secondsName = secondsWrap.querySelector('.time-name')

        let floor = Math.floor( (this.gap / 1000) % 60 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Seconds' : 'SS'

        secondsValue.innerHTML = value
        secondsName.innerHTML = name
    }
}

const popupModule = () => {
    const pupup = document.querySelector('#popup')
    const message = popup.querySelector('.message')
    const closeButtonAll = pupup.querySelectorAll('#close-popup')

    closeButtonAll.forEach( item => item.addEventListener( 'click', () => {
        message.classList.remove('message-open')
        setTimeout( () => { pupup.classList.remove('popup-open') }, 200 )
    } ) )

    return {
        open(){
            pupup.classList.add('popup-open')
            setTimeout( () => { message.classList.add('message-open') }, 200 )
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

async function request( url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} ){
    try{
        const response = await fetch( url, {method, body, headers} )
        if( !response.ok ) throw new Error( 'Error' )
        const data = response.json()
        return data
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
            popup.open()
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
