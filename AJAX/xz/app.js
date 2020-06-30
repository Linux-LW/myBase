const express =require('express');
const proRouter =require('./router/pro.js');
const app =express();
const bodyParser =require('body-parser');

app.listen(8080);

app.use(express.static('project'));

app.use(bodyParser.urlencoded({
	extended:false
}))
app.use('/pro',proRouter);