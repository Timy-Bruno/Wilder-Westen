// Rejoining after a deployment must not keep an older running game interface.
window.attachGameUpdates=socket=>{
 const current=document.documentElement.dataset.build;if(!current)return;
 let updating=false;
 socket.on('appVersion',version=>{
  if(updating||typeof version!=='string'||version===current||!/^[a-f0-9]{16}$/.test(version))return;
  updating=true;const url=new URL(location.href);url.searchParams.set('v',version);location.replace(url.href);
 });
};
