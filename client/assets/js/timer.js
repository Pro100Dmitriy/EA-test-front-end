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