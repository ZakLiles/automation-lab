const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/Week-11-Exercises/automation/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

describe('Movie List', () => {
    
    let movieTitle = 'Arrival'
    test('Adding a movie', async () => {
        await driver.findElement(By.css('input')).sendKeys(`${movieTitle}\n`)
        let movie = await driver.findElement(By.css('ul > li > span')).getText()
        await driver.sleep(2000)
        expect(movie).toBe(movieTitle);
    });

    test('Deleting a movie - list item removed', async () => {
        await driver.findElement(By.id(movieTitle)).click();
        let movie = await driver.findElements(By.xpath(`//ul/li/span[contains(text(), "${movieTitle}" )]`))
        await driver.sleep(2000)
        expect(movie.length).toBe(0);
    });
    
    test('Deleting a movie - delete message', async () =>{
        await driver.findElement(By.css('input')).sendKeys(`${movieTitle}\n`)
        await driver.findElement(By.id(movieTitle)).click();
        let message = await driver.findElement(By.id('message')).getText()
        expect(message).toBe(`${movieTitle} deleted!`)
    })
})
