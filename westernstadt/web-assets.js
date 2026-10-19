// Fingerprinted entry assets and an explicit build identity prevent mixed phone versions.
const fs=require('fs'),path=require('path'),{createHash}=require('crypto');
const digest=content=>createHash('sha256').update(content).digest('hex').slice(0,16);
function install(app,root){
 const publicDir=path.join(root,'public'),files=fs.readdirSync(publicDir).filter(f=>/\.(?:html|js|css)$/.test(f)).sort();
 const buildHash=createHash('sha256');
 for(const file of ['server.js','hunt.js','campaign.js','data.js','web-assets.js','repairs.js','shop.js'])buildHash.update(file).update(fs.readFileSync(path.join(root,file)));
 for(const file of files)buildHash.update(file).update(fs.readFileSync(path.join(publicDir,file)));
 const version=buildHash.digest('hex').slice(0,16);
 for(const page of ['phone.html','screen.html']){
  const html=fs.readFileSync(path.join(publicDir,page),'utf8').replace('<html ',`<html data-build="${version}" `).replace(/(src|href)=(["']?)(\/[^"' >?]+\.(?:js|css))\2/g,(match,attribute,quote,url)=>{
   const file=path.join(publicDir,url);if(!fs.existsSync(file)||!fs.statSync(file).isFile())return match;
   return `${attribute}="${url}?v=${digest(fs.readFileSync(file))}"`;
  });
  app.get('/'+page,(req,res)=>{res.set('Cache-Control','no-store, max-age=0, must-revalidate');res.set('X-Game-Version',version);res.type('html').send(html)});
 }
 return version;
}
function cacheHeaders(res,file){if(/\.(?:html|js|css)$/.test(file))res.setHeader('Cache-Control','no-store, max-age=0, must-revalidate');}
module.exports={install,cacheHeaders};
