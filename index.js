#! /usr/bin/env node

console.log("Hello World!");
const utils = require('./utils.js');
const yargs = require("yargs");




const translate = require('@vitalets/google-translate-api');
const { boolean } = require('yargs');

const usage = "\nUsage: tran <lang_name> sentence to be translated";
const options = yargs  
      .usage(usage)  
      .option("l", {alias:"languages", describe: "List all supported languages.", type: "boolean", demandOption: false }) 
      .option("gd",{alias:"gitdownload",describe:"clone git repository",type:"boolean",demandOption:false})                                                                                                   
      .help(true)  
      .argv;
if(yargs.argv._[0] == null){  
      utils.showHelp();  
      return;  
  }
  if(yargs.argv.l == true || yargs.argv.languages == true){  
      utils.showAll();  
      return;  
  }
  if(yargs.argv._[0]) { 
  var language = yargs.argv._[0].toLowerCase(); // stores the language.
  //parsing the language specified to the ISO-639-1 code.                                                                                              
  language = utils.parseLanguage(language);
  }
  var sentence = utils.parseSentence(yargs.argv._);
  if(sentence == ""){                                                                                          
    console.error("\nThe entered sentence is like John Cena, I can't see it!\n")  
    console.log("Enter tran --help to get started.\n")  
    return;
  } else{
    translate(sentence, {to: language})
    .then(res => {console.log("\n" + "\n" + res.text + "\n" + "\n");})
    .catch(err => {                                                                                                     
        console.error(err);  
    });
  }
