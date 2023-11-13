module.exports = async (request) => {
    return new Promise((resolve,reject)=>{
        try{
           let body = "";
            //create an event to get the stream of data to parse it since the chunk of request are in string and we need to parse it in json so that it don't give undefined as "Request body:"
            request.on("data",(chunk)=>{
                body+=chunk;
            });
            request.on("end",()=>{
                resolve(JSON.parse(body));
            })
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
}