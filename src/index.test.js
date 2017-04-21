import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  })
})

describe('index.html', () => {
  const index = fs.readFileSync('./src/index.html', 'utf-8');
  it('should say dev server is running', (done) => {
    jsdom.env({
      html: index,
      done: function(err, window) {
        const h1 = window.document.getElementsByTagName('h1')[0];
        expect(h1.innerHTML).to.equal("Art");
        window.close();
        done();
      }
    });
  })
})
