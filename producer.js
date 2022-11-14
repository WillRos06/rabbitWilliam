const amqp = require("amqplib");

const rabbitSettings = [{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
},{
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5673,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']}]

connect();

async function connect(){

    const queue = "Tarea";
    const newQueue = "Materias";

    const msgs = [
        {   "name":"Wiliam Del Rosario", "Universidad":"UTESA"},
        {   "name":"Wiliam Del Rosario", "Profesor":"Ivan Mendoza"},
        {   "name":"Wiliam Del Rosario", "Edad":"22"},
        {   "name":"Wiliam Del Rosario", "Materia":"Algoritmo Paralelos"},
    ]

    for(i=0;i<rabbitSettings.length;i++){
        try{

            const conn = await amqp.connect(rabbitSettings[i]);
            console.log("Connection Created...");
    
            const channel = await conn.createChannel();
            console.log("Channel Created...");
    
            const res = await channel.assertQueue(queue);
            console.log("Queue Created...");
    
            for(let msg in msgs){
                await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
                console.log('Mensaje enviado a la cola ${queue}');
            }
    
    
            break;
        } catch(err){
            console.error(`Error -> ${err}`);
        }
    }


}