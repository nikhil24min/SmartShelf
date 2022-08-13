// let n = Math.floor(Math.random() * 5);
// var box = document.getElementById("boxID");

// let i = 0;
// let j = 0;

// i = n*4;
// j = 15;

// function fill()
// {   
//     for(let k = 0 ; k<i ; k++)
//     {
//         document.getElementsByClassName("space")[j].style.background = "orange";
//         console.log(j)
//         j--;
//     }

//     var filled_percent = i/16*100;
//     var empty_percent = 100 - filled_percent;
//     document.getElementById("filledID").innerHTML = "Filled up space "+filled_percent.toString()+"%";
//     document.getElementById("emptyID").innerHTML = "Unused space "+empty_percent.toString()+"%";
    
// }

// if(n != 0)
// {   
//     document.getElementById("filledID").innerHTML = "Filled up space "+toString(i/16*100)+"%";
//     document.getElementById("emptyID").innerHTML = "Unused space "+toString(100-(i/16*100))+"%";
//     fill()
// }


/////////////////////////////////////////////////////////////////////////////////////
// Get the data from thingspeak -----------------------
const api_url = "https://api.thingspeak.com/channels/561370/fields/1.json?results";
const maxHeight = 20;
let curr_height = 0;

async function readData(url){
    const response = await fetch(url);
    var data = await response.json();
    if(response)
    {      
        var dd = data.feeds[data.feeds.length-1]
        console.log(dd['field1'])
        curr_height = dd['field1']

        fill(16)
        if(curr_height<=20) fill(curr_height);
        
    }
}

// ---------------Fill the shelf function-------------------------------
function fill(currHeight){
    let percent = currHeight/maxHeight*100;
    let cellCount = Math.floor(percent/100*16);

    let j = 15  

    for(let k = 0 ; k<cellCount ; k++)
    {
        document.getElementsByClassName("space")[j].style.background = "orange";
        // console.log(j)
        j--;
    }

    var empty_percent = 100 - percent;
    document.getElementById("filledID").innerHTML = "Filled up space "+percent.toString()+"%";
    document.getElementById("emptyID").innerHTML = "Unused space "+empty_percent.toString()+"%";
}

/// --------------Realtime data simulation ----------------------------
setInterval(function(){ 
    readData(api_url)
}, 1500);