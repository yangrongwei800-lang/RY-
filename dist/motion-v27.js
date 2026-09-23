// Reserve profile image geometry before the first project render.
(()=>{const profiles=noodleProfiles;noodleProfiles=function(card=false){return profiles(card).replace(/<img src="media\/noodle-profile-/g,'<img width="1000" height="2174" src="media/noodle-profile-').replace(/loading="lazy"/g,'loading="eager"');};
// Allow older preview handlers to finish before removing their controls.
document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>document.querySelectorAll('.preview-controls').forEach(e=>e.remove()),0);});})();