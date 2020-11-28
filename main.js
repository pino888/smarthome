// output devices and it's status
let selectedRoom = document.getElementById('room').value
let timeElementOnString = document.getElementById('time-element-on')
let timeElementOffString = document.getElementById('time-element-off')
let saveButton = document.getElementById('save-settings')
let resetButton = document.getElementById('reset-settings')

let roomsArray = [
    {
        id: 'livingRoomLamp',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('living-room-text').innerHTML // not used atm
    },
    {
        id: 'bedOneDeskLamp',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('bed-one-text').innerHTML
    },
    {
        id: 'bedTwoFloorLamp',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('bed-two-text').innerHTML
    },
    {
        id: 'bathroomFan',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('bathroom-fan-text').innerHTML
    },
    {
        id: 'washer',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('washer-text').innerHTML
    },
    {
        id: 'dryer',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('dryer-text').innerHTML
    },
    {
        id: 'frontDoor',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('front-door-text').innerHTML
    },
    {
        id: 'backDoor',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('back-door-text').innerHTML
    },
    {
        id: 'garageDoor',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('garage-door-text').innerHTML
    },
    {
        id: 'kitchenFan',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('kitchen-fan-text').innerHTML
    },
    {
        id: 'diningRoomLight',
        active: false,
        timeOn: 0,
        timeOff: 0,
        text: document.getElementById('dining-room-text').innerHTML
    }
]

let skaza = JSON.parse(localStorage.getItem("roomsArray"));

if(skaza != null){
    roomsArray = skaza
}
// time
let currentTime = 0
showTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // add zeroes to single digits
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);
    currentTime = hours+''+minutes
    //console.log(currentTime+''+seconds);
}

addZero = (time) => {
    if(time<10) {
        time = "0" + time;
    }
    return time;
}

// function for button to save settings
function setParameters(){
    if(timeElementOnString.value == '' || timeElementOffString.value == ''){
        timeElementOnString.focus()
    }else{
        for (let i = 0; i < roomsArray.length; i++){
        if(selectedRoom == roomsArray[i].id){
            let timeElementOn = parseInt(timeElementOnString.value.replace(":", ""));
            let timeElementOff = parseInt(timeElementOffString.value.replace(":", ""));
            roomsArray[i].timeOn = timeElementOn
            roomsArray[i].timeOff = timeElementOff
            localStorage.setItem('roomsArray', JSON.stringify(roomsArray))
            // reset time fields
            timeElementOnString.value = ''
            timeElementOffString.value = ''
            }
        }
    }
}

// button setting times
saveButton.onmouseup = setParameters;
resetButton.onmouseup = () => {
    localStorage.clear('roomsArray')
    window.location.reload()
}
// update function every 0.5sec
setInterval(function(){
    selectedRoom = document.getElementById('room').value
    showTime()
    if(currentTime >= 600 && currentTime < 2000){
        document.querySelector('.settings').style.color = 'rgb(26, 47, 71)'
        document.querySelector('body').style.background = 'linear-gradient(180deg, rgb(59, 59, 231), transparent)'
    }else{
        document.querySelector('.settings').style.color = 'rgb(255, 255, 255)'
        document.querySelector('body').style.background = 'linear-gradient(180deg, rgb(0, 0, 0), rgb(26, 47, 71), rgb(59, 197, 231))'
    }
    for (let i = 0; i < roomsArray.length; i++){
        if(roomsArray[i].timeOn == 0){
            document.getElementById(roomsArray[i].id+'Ton').innerHTML = '-- : --'
        }else{
            let displayTimeOnFull = roomsArray[i].timeOn.toString()
            let displayTimeOnH = displayTimeOnFull.slice(0, 2)
            let displayTimeOnM = displayTimeOnFull.slice(2)
            let displayTimeOn = displayTimeOnH+':'+displayTimeOnM
            document.getElementById(roomsArray[i].id+'Ton').innerHTML = displayTimeOn
        }
        if(roomsArray[i].timeOff == 0){
            document.getElementById(roomsArray[i].id+'Ton').innerHTML = '-- : --'
        }else{
            let displayTimeOffFull = roomsArray[i].timeOff.toString()
            let displayTimeOffH = displayTimeOffFull.slice(0, 2)
            let displayTimeOffM = displayTimeOffFull.slice(2)
            let displayTimeOff = displayTimeOffH+':'+displayTimeOffM
            document.getElementById(roomsArray[i].id+'Toff').innerHTML = displayTimeOff
        }
        if(currentTime >= roomsArray[i].timeOn && currentTime < roomsArray[i].timeOff){
            roomsArray[i].active = true
            document.getElementById(roomsArray[i].id+'Status').innerHTML = 'ON'
            document.getElementById(roomsArray[i].id+'bon').style.display = 'block'
            document.getElementById(roomsArray[i].id+'boff').style.display = 'none'
        }else{
            roomsArray[i].active = false
            document.getElementById(roomsArray[i].id+'Status').innerHTML = 'OFF'
            document.getElementById(roomsArray[i].id+'bon').style.display = 'none'
            document.getElementById(roomsArray[i].id+'boff').style.display = 'block'
        }
    }
}, 500)