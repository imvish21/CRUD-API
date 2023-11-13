module.exports = (req,res) => {
    //getting the base url and retriving the substring i.e /api/movies/
    let baseUrl = req.url.substring(0,req.url.lastIndexOf("/")+1);
    console.log(baseUrl);
    //then getting the id of requested movie that is at the end of the url
    let id = req.url.split("/")[3];
    console.log(id);
    //Now check if the id passed by user is correct or not.
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );
    // first we are going to fetch all the movies.
    console.log(req.url); // /api/movies/id
    if(req.url === "/api/movies")
    {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json"); //res.setHeader() is a native method of Node.js and res.header() is an alias of res.set() method from Express framework.It set the headers HTTP response.
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(!regexV4.test(id))
    {
        res.writeHead(400,{"Content-Type": "application/json"});
        res.end(JSON.stringify({title:"Validation Failed", message: "UUID is not valid"}));
    }
    else if(baseUrl === "/api/movies/" && regexV4.test(id))
    {
        res.setHeader("Content-Type","application/json");
        let filteredMovie = req.movies.filter((movie)=>{
            return movie.id === id; //return a new array of filtered movies.
        });
        //now after filtering and if the movie is not in file,we have to return movie not found
        if(filteredMovie.length > 0 ){
            res.statusCode = 200;
        res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else{
            res.statusCode = 404;
            res.write(JSON.stringify({title:"Not Found", message: "Movie not found"}));
                res.end();
        }
    }
    else{
        res.writeHead(404,{"Content-Type": "application/json"}); //The response.writeHead() property is an inbuilt property of the ‘http’ module which sends a response header to the request. The status code is a 3-digit HTTP status code, like 404. The last argument, headers, are the response headers. Optionally one can give a human-readable statusMessage as the second argument.
        res.end(JSON.stringify({title:"Not Found", message: "Route not found"}));
    }
}