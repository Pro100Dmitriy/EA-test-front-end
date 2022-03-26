class Timer{
    constructor( {initialDate, timerId} ){
        this.wrapper = document.querySelector( `#${timerId}` ) ?? null
        this.initialDate = Date.parse( initialDate )

        if( !this.wrapper ) return

        this.loop.bind(this)()

        this.windowResize()
    }

    loop(){
        this.reqAnimFrame = requestAnimationFrame( this.loop.bind(this) )
        this.update()
    }

    windowResize(){
        this.windowWidth = window.innerWidth
        window.addEventListener( 'resize', () => {
            this.windowWidth = window.innerWidth
        } )
    }

    update(){
        this.now = Date.now()
        this.gap = this.initialDate - this.now
        
        if( this.initialDate < this.now ){
            cancelAnimationFrame( this.reqAnimFrame )
            return
        }

        this.days()
        this.hours()
        this.minutes()
        this.seconds()
    }

    days(){
        const daysWrap = this.wrapper.querySelector('#js-days')
        const daysValue = daysWrap.querySelector('.js-time__value')
        const daysName = daysWrap.querySelector('.js-time__name')

        let floor = Math.floor( this.gap / 1000 / 60 / 60 / 24 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Days' : 'DD'

        daysValue.innerHTML = value
        daysName.innerHTML = name
    }

    hours(){
        const hoursWrap = this.wrapper.querySelector('#js-hours')
        const hoursValue = hoursWrap.querySelector('.js-time__value')
        const hoursName = hoursWrap.querySelector('.js-time__name')

        let floor = Math.floor( (this.gap / 1000 / 60 / 60) % 24 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Hours' : 'HH'

        hoursValue.innerHTML = value
        hoursName.innerHTML = name
    }

    minutes(){
        const minutesWrap = this.wrapper.querySelector('#js-minutes')
        const minutesValue = minutesWrap.querySelector('.js-time__value')
        const minutesName = minutesWrap.querySelector('.js-time__name')

        let floor = Math.floor( (this.gap / 1000 / 60) % 60 )
        let name = floor < 10 ? `0${floor}` : floor
        let value = this.windowWidth > 768 ? 'Minutes' : 'MM'

        minutesValue.innerHTML = name
        minutesName.innerHTML = value
    }

    seconds(){
        const secondsWrap = this.wrapper.querySelector('#js-seconds')
        const secondsValue = secondsWrap.querySelector('.js-time__value')
        const secondsName = secondsWrap.querySelector('.js-time__name')

        let floor = Math.floor( (this.gap / 1000) % 60 )
        let value = floor < 10 ? `0${floor}` : floor
        let name = this.windowWidth > 768 ? 'Seconds' : 'SS'

        secondsValue.innerHTML = value
        secondsName.innerHTML = name
    }
}