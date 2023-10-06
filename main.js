import axios from "axios";
import * as cheerio from 'cheerio';
import fs from 'fs';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 
    await delay(1000);

  

    let url = 'https://www.grrlpowercomic.com/archives/comic/grrl-power-1194/';
    for(let i = 1; i<10; i++){
    let data;
    let response;
    if(!fs.existsSync('./cache/' + i + '.html')){
        response = await axios.get(url);
        await delay(1000);
        console.log('NOT CACHE!!!!');
        data = response.data;
        fs.writeFileSync('./cache/' + i + '.html', data);
    } else {
        console.log('CACHE!!!!');
        data = fs.readFileSync('./cache/' + i + '.html');
    }
    const $ = cheerio.load(data);
    let img = $('#comic>img')
    console.log(img.attr('title'));
    console.log(img.attr('src'));
    url = $('.comic-nav-previous').eq(0).attr('href');
    console.log(url);
}