let userscore = 0;
let compscore = 0;
const choices=document.querySelectorAll('.choice');
const msg=document.querySelector('#msg');
const msgcontainer=document.querySelector('.msgcontainer');
const userscoreElement=document.querySelector('#user-score');
const compscoreElement=document.querySelector('#comp-score');


const gencompchoice=()=>{
    const options=['rock','paper','scissors'];
    const ri=Math.floor(Math.random()*3);
    return options[ri];

}

const showWinner=(userwin,userchoice,compchoice)=>{
    if (userwin){
        userscore++;
        userscoreElement.innerText=userscore;
        msg.innerText=`You win! ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
        msg.classList.remove("hide");
        msgcontainer.classList.remove("hide");

    }
    else{
        compscore++;
        compscoreElement.innerText=compscore;
        msg.innerText=`You lose! ${compchoice} beats ${userchoice}`;
        msg.style.backgroundColor="red";
        msg.classList.remove("hide");
        msgcontainer.classList.remove("hide");
    }
}

const playyourgame=(userchoice)=>{
    console.log("User choice =",userchoice);
    const compchoice=gencompchoice();
    console.log("Computer choice =",compchoice);

    if(userchoice===compchoice){
        console.log("It's a tie!");
        msg.innerText="Draw!";
        msg.classList.remove("hide");
        msg.style.backgroundColor="#B89E97";
        msgcontainer.classList.remove("hide");
    }
    else{
        let userwin=true;
        if(userchoice==="rock"){
            userwin=compchoice==="paper"?false:true; 
        }
        else if(userchoice==="paper"){
            userwin=compchoice==="scissors"?false:true;
        }
        else{
            userwin=compchoice==="rock"?false:true;
        }
        showWinner(userwin,userchoice,compchoice);
    }

    
}

choices.forEach((c)=>{
    c.addEventListener('click',()=>{
        const userchoice=c.getAttribute("id");
        playyourgame(userchoice);
  

});
});