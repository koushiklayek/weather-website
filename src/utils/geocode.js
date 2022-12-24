const request=require("request")
const geocode=(address,callback)=>{
    const url = "http://api.positionstack.com/v1/forward?access_key=fb6fe9f89cf5ebb12f78a009b555e3a6&query="+address
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect to location app",undefined)
        }
        else if(body.error)
        {
            callback("Unable to find coordinates",undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude
            })
        }
    })
}

module.exports=geocode