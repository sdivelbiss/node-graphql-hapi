const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting')


mongoose.connect('mongodb://sdivelbiss:testing123@ds231070.mlab.com:31070/powerful-api')

mongoose.connection.once('open', () => {
    console.log('Connected to database')
})
const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async () => {
server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply){
            return `<h1> Hello there</h1>`
        }
    },
    {
        method: 'GET',
        path: '/api/v1/paintings',
        handler: (req, res) => {
            return Painting.find()
        }    
    },
    {
        method: 'POST',
        path: '/api/v1/paintings',
        handler: (req, res) => {
            const {name, url, techniques} = req.payload;
            const painting = new Painting({
                name,
                url,
                techniques
            });
            return painting.save();
        }
    }

])

    await server.start();
    console.log(`Server is running at : ${server.info.uri}`)
};

init();