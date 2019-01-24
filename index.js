var express= require('express')
var bodyParser= require('body-parser')
var http= require('http')
var fs= require('fs')

var port =4000

app= express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(bodyParser.json())
server=http.createServer(app);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})
app.get('/api',(req,res)=>{
    res.send('api info v1')
})

app.get('/api/city',(req,res)=>{
    fs.readFile(__dirname+'/public/data.json', 'utf8', function(err, contents) {
        data =JSON.parse(contents)
        cities= new Array();
        for(i=0; i< data.length; i++){
            micity=data[i].Ciudad
            
            findcity= null
            for(j=0; j<cities.length; j++){
                temp= cities[j]
                if(micity== temp){
                    findcity=temp
                }
            }
            if(findcity==null){
                cities.push(micity)
            }
        }
        res.send(cities)
    });
})

app.get('/api/type',(req,res)=>{
    fs.readFile(__dirname+'/public/data.json', 'utf8', function(err, contents) {
        data =JSON.parse(contents)
        types= new Array();
        for(i=0; i< data.length; i++){
            mitipo=data[i].Tipo
            findtipo= null
            for(j=0; j<types.length; j++){
                temptype= types[j]
                if(mitipo== temptype){
                    findtipo=temptype
                }
            }
            if(findtipo==null){
                types.push(mitipo)
            }
        }
        res.send(types)
    });
})

app.get('/api/process/:ciudad/:tipo/:from/:to',(req,res)=>{
    fs.readFile(__dirname+'/public/data.json', 'utf8', function(err, contents) {
        data =JSON.parse(contents)
        retorno= data;
        ciudad=req.params.ciudad
        tipo= req.params.tipo
        from= req.params.from
        to= req.params.to
        if(ciudad!='null'){
            temp= Array();
            for(i=0; i<retorno.length; i++){
                if(retorno[i].Ciudad==ciudad){
                    temp.push(retorno[i])
                }
            }
            retorno=temp
        }

        if(tipo!='null'){
            temp= Array();
            for(i=0; i<retorno.length; i++){
                if(retorno[i].Tipo==tipo){
                    temp.push(retorno[i])
                }
            }
            retorno=temp
        }

        if(from!='null'&& to!='null'){
            temp= Array();
            for(i=0; i<retorno.length; i++){
                compare=retorno[i].Precio
                compare=compare.slice(1)
                compare=compare.split(',').join('')
                numcomp=parseInt(compare)
                
                if(numcomp>=from && numcomp<=to){                    
                    temp.push(retorno[i])
                }
            }            
            retorno=temp
        }
        res.send(retorno)
    });
})

app.get('/api/data',(req,res)=>{
    fs.readFile(__dirname+'/public/data.json', 'utf8', function(err, contents) {
        res.send(JSON.parse(contents))
    });
})
server.listen(port,()=>{console.log("the server is running by the port: "+port)})

