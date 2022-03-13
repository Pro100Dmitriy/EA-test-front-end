const Subscriber = require('../models/Subscriber')

module.exports.subscribe = async function( req, res ){
    try{
        const email = await Subscriber.findOne( { email: req.body.email } )
        if( email ){
            res.status( 200 ).json({
                title: 'Oy!',
                message: 'This email already added!'
            })
        }else{
            const candidate = new Subscriber({
                email: req.body.email
            })
            await candidate.save()
            res.status( 201 ).json({
                title: 'Success!',
                message: 'You have successfully subscribed to the email newsletter.'
            })
        }
    }catch( error ){
        console.log( error )
    }
}