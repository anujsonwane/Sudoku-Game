let step= new Audio('step.mp3');
let small_win= new Audio('small_win.mp3');
let wrong_step= new Audio('wrong_step.mp3');
let win= new Audio('Win.mp3');
let game_end= true;

function is_last_move() {
    let data = document.querySelectorAll('.data_box');
    for (let i = 0; i < data.length; i++) {
        if (data[i].textContent == "") {
            return game_end=false;
        }
    }
    return game_end=true;
}

function is_right_step(temp,inde) {
    let data = document.querySelectorAll('.data_box');
    //for bracket checking
    for (let i = Math.floor(inde/9)*9; i < (Math.floor(inde/9)+1)*9; i++) {
        if(inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    //for boundry for row checking
    let k,l,m;
    k=Math.floor(inde/3)*3;
    if((Math.floor(inde/9))%3==0){
        l=k+9;
        m=k+18;
    }else if((Math.floor(inde/9))%3==1){
        l=k-9;
        m=k+9;
    }else{
        l=k-18;
        m=k-9;
    }
    //row checking
    for (let i = k; i < k+3; i++) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    for (let i = l; i < l+3; i++) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    for (let i = m; i < m+3; i++) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    //to get the boundries for column checking
    k=(Math.floor(inde/9)*9) + (inde%3);
    if(Math.floor(inde/27)==0){
        l=k+27;
        m=k+54;
    }else if(Math.floor(inde/27)==1){
        l=k-27;
        m=k+27;
    }else{
        l=k-54;
        m=k-27;
    }
    //for column checking
    for (let i = k; i <= k+6; i+=3) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    for (let i = l; i <= l+6; i+=3) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    for (let i = m; i <= m+6; i+=3) {
        if (inde != i && data[i].textContent == temp) {
            return false;
        }
    }
    return true;
}

function dehighlight(data) {
    data.style.backgroundColor="";
}
function highlight(data) {
    data.style.backgroundColor="rgb(58, 239, 206)";
}
// Handling the click event
function dehighlight1(event) {
    event.target.style.backgroundColor = "";
}

function highlight1(event) {
    event.target.style.backgroundColor = "rgb(203, 237, 230)";
    //here should row and column highlighter    
}
// function handledblClick1(event) {
//     if (event.target.style.color == "rgb(230, 18, 131)") {
//         event.target.style.color = "";
//         event.target.style.fontWeight = "";
//         event.target.style.fontSize = "";
//     } else {
//         event.target.style.color = "rgb(230, 18, 131)";
//         event.target.style.fontWeight = "bold";
//         event.target.style.fontSize = "41px";
//         event.target.style.backgroundColor = "rgb(40, 220, 30)";
//     } 
// }
function handledClick1(event) {
    var data = event.target.textContent;   
}
function handleKeyUp1(event,index) {
    var deta = event.key;
    if (!isNaN(deta) && event.target.textContent=="") {
        event.target.style.color = "rgb(155, 19, 182)";
        event.target.style.backgroundColor = "rgb(226, 217, 217)";
        var k=is_right_step(deta,index);
        
        if(k==true){
            event.target.textContent = deta;
            is_last_move();
            console.log("Right Step:", k, "Index:", index,"game_end:",game_end);
            if(game_end==true){
                console.log("game end and you won");
                alert("you WON the game");
                win.play();
            }else{
                small_win.play();
            }
        }else{
            step.play();
            console.log("Wrong input");
        }
    }else{
        return wrong_step.play();
    }
}
document.querySelectorAll('.data_box').forEach((element,index) => {
    element.setAttribute('tabindex', '0');
    element.addEventListener('mouseenter', highlight1);
    element.addEventListener('mouseleave', dehighlight1);
    // element.addEventListener('dblclick', handledblClick1);
    element.addEventListener('click', handledClick1);
    element.addEventListener('keyup',(event)=> handleKeyUp1(event,index));
});