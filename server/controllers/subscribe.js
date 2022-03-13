const Subscriber = require('../models/Subscriber')

module.exports.subscribe = async function( req, res ){
    try{
        const email = await Subscriber.findOne( { email: req.body.email } )
        if( email ){
            res.status( 401 ).json({
                message: 'This email already added!'
            })
        }else{
            const candidate = new Subscriber({
                email: req.body.email
            })
            await candidate.save()
            res.status( 201 ).json( candidate )
        }
    }catch( error ){
        console.log( error )
    }
}