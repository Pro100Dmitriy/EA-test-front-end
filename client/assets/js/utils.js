function isEmail( initialValue ){
    const regExEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g
    const testEmail = initialValue.match( regExEmail )

    if( testEmail ){
        return true
    }else{
        return false
    }
}

function request( url, method='GET', body=null, headers={ 'Content-Type': 'application/json' } ){
    return new Promise( async ( resolve, reject ) => {
        try{
            const response = await fetch( url, { method, body: JSON.stringify( body ), headers } )
            if( response.ok ){
                const data = response.json()
                resolve( data )
            }else{
                reject( {
                    title: 'Error',
                    message: 'An unexpected error occurred!'
                } )
            }
        }catch( error ){
            reject( {
                title: 'Error',
                message: 'An unexpected error occurred!'
            } )
        }
    } )
}

function css( html, style ){
    Object.assign( html.style, style )
}