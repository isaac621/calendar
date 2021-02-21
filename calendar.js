const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

function render(month, year, current, chosen){
    date = new Date()
   console.log(chosen)
    
    document.querySelector('.month').innerHTML =  year + "  " +MONTH[month]
    if (chosen != current){
        document.querySelector('.fulldate').innerHTML = "Chosen: " + chosen.toDateString()
    }
    else{
        document.querySelector('.fulldate').innerHTML = "Today: " + chosen.toDateString()
    }
    
    lastday = new Date(year, month + 1, 0)
    days = document.querySelector('.days')
    days.innerHTML = ""
    
    for(let i = 1; i <= lastday.getDate(); i++){
        if(i == current.getDate() && month == current.getMonth())
        {
            days.insertAdjacentHTML('beforeend', `<div class="day today">${i}</div>`)
        }
        else
        {
            days.insertAdjacentHTML('beforeend', `<div class="day">${i}</div>`)
        }
    }
    
    firstday = new Date(year, month, 1)
    lastday_prev = new Date(year, month , 0)
    

    for(let i = 0; i < firstday.getDay(); i++){
        
        days.insertAdjacentHTML('afterbegin', `<div class="day prevday">${lastday_prev.getDate()-i}</div>`)
    }
    
    for(let i = 1; days.childElementCount < 42; i++){
        days.insertAdjacentHTML('beforeend', `<div class="day nextday">${i}</div>`)
    }

    day_div = document.querySelectorAll('.day')
    Array.prototype.map.call(day_div, (a)=>{
        a.addEventListener(
            "mouseout",(t)=>{
                if (chosen != current){
                    document.querySelector('.fulldate').innerHTML = "Chosen: " + chosen.toDateString()
                }
                else{
                    document.querySelector('.fulldate').innerHTML = "Today: " + chosen.toDateString()
                }
            }
        )
        a.addEventListener(
            "mouseover",(t)=>{
                if(t.target.className.includes("prevday"))
                {
                    date = new Date(year, month-1, parseInt(t.target.innerHTML))
                    document.querySelector('.fulldate').innerHTML = "Chosen: " + date.toDateString()
                   
                }
                else if(t.target.className.includes("nextday"))
                {
                    date = new Date(year, month+1, parseInt(t.target.innerHTML))
                    document.querySelector('.fulldate').innerHTML = "Chosen: " + date.toDateString()
                    
                }
                else{
                   
                    date = new Date(year, month, parseInt(t.target.innerHTML))
                    document.querySelector('.fulldate').innerHTML = "Chosen: " + date.toDateString()
          
                }
                
               
            }
        )
        a.addEventListener(
            "click",(t)=>{
                chosen = date
                update_chosen(date)
                document.querySelector('.fulldate').innerHTML = "Chosen: " + chosen.toDateString()
                if(document.querySelector('.active')){
                    document.querySelector('.active').classList.toggle('active')
                }
                
                t.target.classList.toggle('active')
            }
        )
    }
)
    return chosen
}

let today = new Date()
let y = today.getFullYear()
let m = today.getMonth()
var CHOSEN = today


function update_chosen(a){
    CHOSEN = a
}
render(m, y, today, CHOSEN)

//monitor monthchange
function check(month, year, operation){
    if (operation == "prev"){
        year -= month == 0 ? 1 : 0
        month = month == 0 ? 11 : month - 1
        return [month, year]
    }

    if (operation == "next"){
        year += month == 11 ? 1 : 0
        month = month == 11 ? 0 : month + 1
        return [month, year]
    }
}

//month change
document.querySelector("#prev").addEventListener(
    'click', ()=>{
        [m, y] = check(m, y, "prev")
        console.log(CHOSEN)
        render(m, y, today, CHOSEN)
    }
)

document.querySelector("#next").addEventListener(
    'click', ()=>{
        [m, y] = check(m, y, "next")
        render(m, y, today, CHOSEN)
    }
)
