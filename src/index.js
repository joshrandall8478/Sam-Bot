
import 'dotenv/config'
import fetch from "node-fetch"
import {Client, IntentsBitField} from 'discord.js'

// Discord API
// Client is the bot
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

// Fetching chuck norris jokes
let url = 'https://api.chucknorris.io/jokes/random';

// api host
const me = '349343589328879619'

// channel ids
const general = '839630552990351411'
const botSpam = '1107806901233795212'

// text channels



async function fetchJokes(){
    let response = await fetch(url)
        .then(res => res.json())
        .then(data => {
                client.on("messageCreate", (message)=> {
                    console.log(message.author.username + " Just sent a message " + message.author.id)
                    if (message.content === "/telljoke") {
                        message.reply(data.value)
                    } 
                })
                
            })
            
        .catch(err => console.log("That api didnt work"))

}
    
    
    
client.on('ready', (c)=> {
    // getting the id for the channel that the messeage gets sent too
    const channel = client.channels.cache.get(general);

    // When chuckie is activated, he will greet everyone
    console.log("I'm Ready! " + c.user.tag);
    channel.send("Hello everyone!")

    
});



client.login(process.env.TOKEN);
fetchJokes();
    
    
