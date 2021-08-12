// First selecting all required elements

const selectBox = document.querySelector(".selectbox");
selectBtnX = selectBox.querySelector(".option .pX");
selectBtnO = selectBox.querySelector(".option .pO");
playBoard = document.querySelector(".playboard");
players = document.querySelector(".players");
allBox = document.querySelectorAll("section span");
resultBox = document.querySelector(".resultbox");
wonText = resultBox.querySelector(".wontext");
replayBtn = resultBox.querySelector("button");

// now working on next window means playboard window 

window.onload = () => {
    for(let i = 0; i < allBox.length; i++){ // adding onclick attribute in all span boxes
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
}


//  working on select option button that we are made in selectbox div
selectBtnX.onclick = () =>{
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section 
}
selectBtnO.onclick = ()=>{
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section 
    players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
}

// now set font awesome in playbox

let playerXIcon = "fas fa-times"; //name of font awesome
playerOIcon = "far fa-circle"; //name of font awesome
playerSign = "X" ; //this is global variable we use this variable in multiple functions 
runBot = true; // this is also a global variable with boolen value and we use it to stop the game when someone won the match

// working on user click function 
function clickedBox(element){
    if (players.classList.contains("player")){
        playerSign ="O"; //if player choose (O) then change player sign to O
        element.innerHTML = `<i class= "${playerOIcon}" ></i>`; //adding circle icon tag inside user clicked element box
        players.classList.remove("active"); //add active class in players
        element.setAttribute("id",playerSign); //set id attrbute in span/box with player choosen sign
    }else{
        element.innerHTML = `<i class= "${playerXIcon}" ></i>`; //adding cross icon tag inside user clicked element box
        players.classList.add("active"); //add active class in players
        element.setAttribute("id",playerSign);//set id attribute in span box with player choosen sign
    }

selectWinner(); //calling select winner function
element.style.pointerEvents = "none" ; //(changing css class) once user select any box then that box can'be clicked again
playBoard.style.pointerEvents = "none"; //(changing css class) add pointerEvents none to playBoard so user can't click on any other box until bot select
let randomTimeDelay = ((Math.random()* 1000)+ 200).toFixed(); // generating random number so bot will randomly delay to select unselected box
setTimeout( ()=> {
    bot(runBot);// calling bot function
},randomTimeDelay); //passing random delay value
}

//working on bot select function

function bot(){
    let array = []; //creating empty array here we will store unclicked boxes index
    if(runBot){  //mans run bot is true
        playerSign = "O"; //then change the palyerSign to O  so if player has choosen X then bot will O
        for(let i = 0; i< allBox.length; i++){
            if(allBox[i].childElementCount == 0){ // if the box span has no chidren means <i> tag
                array.push(i); // inserting unclicked boxes number/index inside array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index froom array so bot will select random unselected box
        if(array.length>0){ //if array length is greater than 0
            if(players.classList.contains("player")){ 
                playerSign = "X";//if player has chosen O then bot will X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside bot selected element
                players.classList.add("active"); // remove active class in players
                allBox[randomBox].setAttribute("id", playerSign); // set id attribute  in span box with player choosen sign
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;//adding circle icon tag inside bot selected element
                players.classList.remove("active");// remove active class in players
                allBox[randomBox].setAttribute("id", playerSign); //set id attribute in span box with player choosen sign
            }
            selectWinner(); // calling select winner function
        }
        allBox[randomBox].style.pointerEvents = "none";//once bot select any box then user can'nt click on that box
        playBoard.style.pointerEvents = "auto"; // add pointerEvents auto in playBoard so user can again click on box
        playerSign = "X"; // if player has choosen  X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for Bot
    }
} 

function getIdVal(classname){
    return document.querySelector (".box"+ classname).id; // return id value
}

function checkIdSign(val1, val2 ,val3, sign){// checking all id value is equal to sign (X or O) or not if yes then retrun true
    if(getIdVal(val1)==sign && getIdVal(val2)== sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){ //if the one of the following winning combination match then select the winner
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6,playerSign) || checkIdSign(7,8,9,playerSign) ||
     checkIdSign(1,4,7,playerSign) || checkIdSign(2,5,8,playerSign) || checkIdSign(3,6,9,playerSign)|| checkIdSign(1,5,9,playerSign)|| checkIdSign(3,5,7,playerSign)){
    runBot = false; // passing the false boolen value to runBot so bot won't run again
    bot(runBot); //calling bot function
    setTimeout(()=>{ //after match won by someone then hide the playBoard and show the result box after 700ms
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
    },700);//1s= 1000ms
    wonText.innerHTML = `Player <p>${playerSign} </p> won the game!`;//displaying winning text with passing playerSign(X or O)    
}else{//if all boxes element have id value and still no one win then draw the match
    if(getIdVal(1) !="" && getIdVal(2) !="" && getIdVal(3) !="" && getIdVal(4) !=""
    && getIdVal(5) !="" && getIdVal(6) !="" && getIdVal(7) !="" && getIdVal(8) !="" &&  getIdVal(9) !=""){
        runBot=false;//passing the false boolen value to rinBot so bot won't run again
        bot();//calling bot function
        setTimeout(()=>{//after match drawn then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        },700);//1s=1000ms
        wonText.textcontent="Match has been drawn!";//displaying draw match text
    }
}

}

//working on replay button
replayBtn.onclick=()=>{
    window.location.reload();//reload the current page on replay button click
}