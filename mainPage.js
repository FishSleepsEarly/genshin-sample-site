let item = document.getElementById("item_type");
if (item.value.localeCompare('Artifact')==0){
    item.style.visibility = "hidden";
}

function targetChange(){
	let item = document.getElementById("item_type").value;
    let rarity = document.getElementById("rarity").value;
    let element = document.getElementById("element").value;
    let weapon_type = document.getElementById("weapon_type").value;
    let substatus = document.getElementById("substatus").value;

    if (item.localeCompare('Artifact')==0){
        //document.getElementById("substatus").value = "defult";
        document.getElementById("rarity").value = "defult";
        document.getElementById("element").value = "defult";
        document.getElementById("weapon_type").value = "defult";

        document.getElementById("rarity").style.visibility = "hidden";
        document.getElementById("element").style.visibility = "hidden";
        document.getElementById("weapon_type").style.visibility = "hidden";
        document.getElementById("substatus").style.visibility = "visible";
        loadArtifact(substatus);
    }else if(item.localeCompare('Character')==0){
        document.getElementById("substatus").value = "defult";
        //document.getElementById("rarity").value = "defult";
        //document.getElementById("element").value = "defult";
        //document.getElementById("weapon_type").value = "defult";

        document.getElementById("rarity").style.visibility = "visible";
        document.getElementById("element").style.visibility = "visible";
        document.getElementById("weapon_type").style.visibility = "visible";
        document.getElementById("substatus").style.visibility = "hidden";
        loadCharacter(rarity,element,weapon_type);
    }else if(item.localeCompare('Weapon')==0){
        //document.getElementById("substatus").value = "defult";
        //document.getElementById("rarity").value = "defult";
        document.getElementById("element").value = "defult";
        //document.getElementById("weapon_type").value = "defult";

        document.getElementById("rarity").style.visibility = "visible";
        document.getElementById("element").style.visibility = "hidden";
        document.getElementById("weapon_type").style.visibility = "visible";
        document.getElementById("substatus").style.visibility = "visible";
        loadWeapon(substatus,rarity,weapon_type);
    }else{
        document.getElementById("substatus").value = "defult";
        document.getElementById("rarity").value = "defult";
        document.getElementById("element").value = "defult";
        document.getElementById("weapon_type").value = "defult";

        document.getElementById("rarity").style.visibility = "visible";
        document.getElementById("element").style.visibility = "visible";
        document.getElementById("weapon_type").style.visibility = "visible";
        document.getElementById("substatus").style.visibility = "visible";
        loadClean();
    }
}


function loadArtifact(substatus){
    loadClean();
    let artifacts = [];
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = JSON.parse(xhttp.responseText);
            if(substatus.localeCompare('defult')!=0){
                for(i=0;i<response.length;i++){
                    if(response[i].status.localeCompare(substatus)==0){
                        artifacts.push(response[i].a_type);
                    }
                }
            }else{
                for(i=0;i<response.length;i++){
                    if(!artifacts.includes(response[i].a_type)){
                        artifacts.push(response[i].a_type);
                    }
                }
            }

            for(i=0;i<artifacts.length;i++){
                /*
                let para = document.createElement("a");
                let br = document.createElement('br');
                para.innerText = artifacts[i];
                para.href='http://localhost:3005/artifacts/'+artifacts[i];
                document.getElementById("list").appendChild(para);
                document.getElementById("list").appendChild(br);
                */

                var img = new Image();
                let type = artifacts[i];
                img.src =  "/artifact/"+type+".png";
                img.onclick = function() {
                    window.location.href = 'http://localhost:3005/artifacts/'+ type;
                };
                document.getElementById("list").appendChild(img);
            }  
        }
    }
    
    let myURL = "http://localhost:3005/artifacts";
    xhttp.open("GET",myURL,true);
    xhttp.send();
}

function loadCharacter(rarity,element,weapon_type){
    loadClean();
    let characters = [];
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = JSON.parse(xhttp.responseText);
            for(i=0;i<response.length;i++){
                characters.push(response[i]);      
            }

            if(rarity.localeCompare('defult')!=0){
                for(i=0;i<characters.length;i++){
                    if(characters[i].c_rarity.localeCompare(rarity)!=0){
                        characters.splice(i,1);
                        i--;
                    }
                }
            }
            if(element.localeCompare('defult')!=0){
                for(i=0;i<characters.length;i++){
                    if(characters[i].element.localeCompare(element)!=0){
                        characters.splice(i,1);
                        i--;
                    }
                }
            }
            if(weapon_type.localeCompare('defult')!=0){
                for(i=0;i<characters.length;i++){
                    if(characters[i].equip_type.localeCompare(weapon_type)!=0){
                        characters.splice(i,1);
                        i--;
                    }
                }
            }

            for(i=0;i<characters.length;i++){
                var img = new Image();
                let char = characters[i].c_name;
                img.src =  "/character/"+char+".png";
                img.onclick = function() {
                    window.location.href = 'http://localhost:3005/characters/'+ char;
                };
                document.getElementById("list").appendChild(img);
            }  
        }
    }
    
    let myURL = "http://localhost:3005/characters";
    xhttp.open("GET",myURL,true);
    xhttp.send();
}

function loadWeapon(substatus,rarity,weapon_type){
    loadClean();
    let weapons = [];
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let response = JSON.parse(xhttp.responseText);
            for(i=0;i<response.length;i++){
                weapons.push(response[i]);      
            }

            if(rarity.localeCompare('defult')!=0){
                for(i=0;i<weapons.length;i++){
                    if(weapons[i].w_rarity.localeCompare(rarity)!=0){
                        weapons.splice(i,1);
                        i--;
                    }
                }
            }
            if(substatus.localeCompare('defult')!=0){
                for(i=0;i<weapons.length;i++){
                    if(weapons[i].status.localeCompare(substatus)!=0){
                        weapons.splice(i,1);
                        i--;
                    }
                }
            }
            if(weapon_type.localeCompare('defult')!=0){
                for(i=0;i<weapons.length;i++){
                    if(weapons[i].w_type.localeCompare(weapon_type)!=0){
                        weapons.splice(i,1);
                        i--;
                    }
                }
            }

            let br = document.createElement('br');
            document.getElementById("list").appendChild(br);
            for(i=0;i<weapons.length;i++){
                var img = new Image();
                let weapon = weapons[i].w_name;
                img.src =  "/weapon/"+weapon+".png";
                img.onclick = function() {
                    window.location.href = 'http://localhost:3005/weapons/'+ weapon;
                };
                document.getElementById("list").appendChild(img);
            }  
        }
    }
    
    let myURL = "http://localhost:3005/weapons";
    xhttp.open("GET",myURL,true);
    xhttp.send();
}

function loadClean(){
    let list = document.getElementById("list");
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

document.getElementById("item_type").addEventListener("change",targetChange);
document.getElementById("substatus").addEventListener("change",targetChange);
document.getElementById("weapon_type").addEventListener("change",targetChange);
document.getElementById("element").addEventListener("change",targetChange);
document.getElementById("rarity").addEventListener("change",targetChange);