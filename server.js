//Setup
const http = require('http');
const pug = require('pug');
const fs = require("fs");
//connect to database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("Data/genshin.db");




  const express = require('express');
  //const session = require('express-session');
  let app = express();
  //app.use(session({ secret: 'some secret here'}))
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.set("view engine", "pug");
  app.use(express.static('views/css'));
  app.use(express.static('views/image'));

  //signals
  app.get("/", sendHomePage);
  app.get("/mainPage.js", sendHomeJS);
  app.get("/artifacts", sendArtifcats);
  app.get("/characters", sendCharacters);
  app.get("/weapons", sendWeapons);
  app.get("/characters/:c_name", sendCharacter);
  app.get("/weapons/:w_name", sendWeapon);
  app.get("/artifacts/:a_type", sendArtifcat);
  app.get("/w_substatus/:status", sendWSubstatus);
  app.get("/a_substatus/:status", sendASubstatus);
  app.get("/weaponType/:w_type", sendWeaponType);
  //app.get("/views/common.css", sendCommonCSS);
  


  //functions
  function sendHomePage(req,res,next){
    fs.readFile("mainPage.html", function(err, data){
      if(err){
        res.statusCode = 500;
        res.write("Server error.");
        res.end();
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    })
  }

  function sendHomeJS(req,res,next){
    fs.readFile("mainPage.js", function(err, data){
      if(err){
        res.statusCode = 500;
        res.write("Server error.");
        res.end();
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
      res.end();
    })
  }
  
  function sendArtifcats(req,res,next){
    let artifacts = []
    db.all('SELECT * FROM artifact NATURAL JOIN ArtifactSubstatus NATURAL JOIN substatus', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        for(i=0;i<result.length;i++){
            artifacts.push(result[i]);
        }
        
        let list = JSON.stringify(artifacts);
        res.statusCode = 200;
        res.end(list);       
      }
    })
  }

  function sendCharacters(req,res,next){
    let characters = []
    db.all('SELECT * FROM character', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        for(i=0;i<result.length;i++){
          characters.push(result[i]);
        }
        
        let list = JSON.stringify(characters);
        res.statusCode = 200;
        res.end(list);       
      }
    })
  }

  function sendWeapons(req,res,next){
    let weapons = []
    db.all('SELECT * FROM weapon NATURAL JOIN WeaponSubstatus NATURAL JOIN substatus', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        for(i=0;i<result.length;i++){
          weapons.push(result[i]);
        }
        
        let list = JSON.stringify(weapons);
        res.statusCode = 200;
        res.end(list);       
      }
    })
  }

  function sendCharacter(req,res,next){
    let character = []
    db.all('SELECT * FROM character NATURAL JOIN UseWeapon;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let name = req.params.c_name;
        for(i=0;i<result.length;i++){
          if(result[i].c_name.localeCompare(name)==0){
            character.push(result[i]);
          }
        }
        if(character!=[]){
          let sample = character[0];
          let content = pug.renderFile("views/character.pug",{sample:sample,character:character});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find character.");
          res.end();
        }
      }
    })
  }

  function sendWeapon(req,res,next){
    let weapon = []
    db.all('SELECT * FROM weapon NATURAL JOIN WeaponSubstatus NATURAL JOIN substatus NATURAL JOIN UseWeapon;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let name = req.params.w_name;
        for(i=0;i<result.length;i++){
          if(result[i].w_name.localeCompare(name)==0){
            weapon.push(result[i]);
          }
        }
        if(weapon!=[]){
          let sample = weapon[0];
          let content = pug.renderFile("views/weapon.pug",{sample:sample,weapon:weapon});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find weapon.");
          res.end();
        }
      }
    })
  }
  
  function sendArtifcat(req,res,next){
    let artifact = []
    db.all('SELECT * FROM artifact NATURAL JOIN ArtifactSubstatus NATURAL JOIN substatus;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let type = req.params.a_type;
        for(i=0;i<result.length;i++){
          if(result[i].a_type.localeCompare(type)==0){
            artifact.push(result[i]);
          }
        }
        if(artifact!=[]){
          let sample = artifact[0];
          let content = pug.renderFile("views/artifact.pug",{sample:sample,artifact:artifact});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find artifact.");
          res.end();
        }
      }
    })
  }

  function sendWSubstatus(req,res,next){
    let substatus = []
    db.all('SELECT * FROM WeaponSubstatus NATURAL JOIN substatus;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let status = req.params.status;
        for(i=0;i<result.length;i++){
          if(result[i].status.localeCompare(status)==0){
            substatus.push(result[i]);
          }
        }
        if(substatus!=[]){
          let sample = substatus[0];
          let content = pug.renderFile("views/substatus.pug",{sample:sample,substatus:substatus,isWeapon:true});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find substatus.");
          res.end();
        }
      }
    })
  }

  function sendASubstatus(req,res,next){
    let substatus = []
    db.all('SELECT * FROM substatus NATURAL JOIN ArtifactSubstatus;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let status = req.params.status;
        for(i=0;i<result.length;i++){
          if(result[i].status.localeCompare(status)==0){
            substatus.push(result[i]);
          }
        }
        if(substatus!=[]){
          let sample = substatus[0];
          let content = pug.renderFile("views/substatus.pug",{sample:sample,substatus:substatus,isWeapon:false});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find substatus.");
          res.end();
        }
      }
    })
  }

  function sendWeaponType(req,res,next){
    let weapons = []
    db.all('SELECT * FROM weapon;', (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let type = req.params.w_type;
        for(i=0;i<result.length;i++){
          if(result[i].w_type.localeCompare(type)==0){
            weapons.push(result[i]);
          }
        }
        if(weapons!=[]){
          let sample = weapons[0];
          let content = pug.renderFile("views/weaponType.pug",{sample:sample,weapons:weapons});
          res.statusCode = 200;
          res.end(content);
          return;
        }else{
          res.statusCode = 404;
          res.write("Can't find that type of weapon.");
          res.end();
        }
      }
    })
  }

  app.listen(3005);
  console.log("Server listening at http://localhost:3005");