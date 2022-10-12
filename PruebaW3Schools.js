const puppeteer = require('puppeteer');
const assert = require('chai').assert;
const addContext = require('mochawesome/addContext');

let browser = null;
let page = null;

const sleep = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};

describe('Comenzando prueba', function() {
	this.timeout(0);
	var text = ""; 
    before(async () => {
       browser = await puppeteer.launch({
          ignoreHTTPSErrors: true,
          headless: false,
         
 
          executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          args: [
             
             '--disable-dev-shm-usage','--start-maximized'],
             
             defaultViewport: null
       }) // opciones de lanzamiento
       page = await browser.newPage();
 
    
 
    });

	it("P1 - Entrar a la pagina", async function(){
		try{
			await page.goto('https://www.w3schools.com/');
			await sleep(2000);
			await page.type('input[id="search2"]', 'Prueba');
			await sleep(2000);
			await page.click('a[title="Tutorials"]');
			await sleep(2000);
			await page.click('a[href="/colors/default.asp"]');
			await sleep(2000);
			await page.screenshot({ path: './mochawesome-report/assets/Paso 1.png'});
			addContext(this, './assets/Paso 1.png');
		}
		catch (err) {
			throw new Error('Conexión retardada' + err);
		}
	})

	it("P2 - Entrar al color picker", async function(){
		try{
			await page.mouse.move(50, 300);	
			await page.mouse.wheel({deltaY: 1000});
			await sleep(2000);
			await page.click('a[href="colors_picker.asp"]');
			await sleep(2000);
			await page.mouse.move(500,200);
			await sleep(2000);
			await page.mouse.wheel({deltaY: 300});
			await sleep(2000);
			await page.screenshot({ path: './mochawesome-report/assets/Paso 2.png'});
			addContext(this, './assets/Paso 2.png');
		}
		catch (err) {
			throw new Error('Conexión retardada' + err);
		}
	})

	it("P3 - Elegir azul", async function(){
		try{
			await page.mouse.click(500,200);
			text = await page.$eval('span[id="colorhexDIV"]', el => el.innerText);
			await sleep(2000);
			await page.screenshot({path: './mochawesome-report/assets/Paso 3.png'});
			if(text==="#6699ff"){
				console.log(text);
				addContext(this, './assets/Paso 3.png');
			}else {
				assert.fail(text);
			}
		} 
		catch (err) {
			throw new Error('Conexión retardada' + err);
		}
	})

	it("P4 - Probar campo", async function(){
		try{
			await page.type('input[id="entercolor"]', '#ff0000');
			await page.click('button[class="btn btn-default"]');
			await sleep(1000);
			await page.type('input[id="entercolor"]', text);
			await page.click('button[class="btn btn-default"]');
			await sleep(2000);
			const errormsj = await page.$eval('div[id="wronginputDIV"]', el => el.innerText);
			await page.screenshot({ path: './mochawesome-report/assets/Paso 4.png'});
			addContext(this, './assets/Paso 4.png');
			if(errormsj==="Wrong Input"){
				console.log(errormsj);
			}else {
				assert.fail(errormsj);
			}
		}
		catch (err) {
			throw new Error('Conexión retardada' + err);
		}
	})

	it("P5 - Introducir color guardado", async function(){
		try{
			await page.click('input[id="entercolor"]', {clickCount: 3});
			await sleep(1000);
			await page.keyboard.press('Backspace');
			await sleep(1000);
			await page.type('input[id="entercolor"]', text);
			await page.click('button[class="btn btn-default"]');
			const color = await page.$eval('span[id="colorhexDIV"]', el => el.innerText);
			await page.screenshot({ path: './mochawesome-report/assets/Paso 5.png'});
			addContext(this, './assets/Paso 5.png');
			if(color===text){
				console.log(color);
			}else {
				assert.fail(color);
			}
		}
		catch (err) {
			throw new Error('Conexión retardada' + err);
		}
	})
});

