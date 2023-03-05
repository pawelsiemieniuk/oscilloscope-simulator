import { Oscilloscope } from "./oscilloscope.js"

const canvas = document.getElementsByClassName('canvas')[0]

const frequency_slider = document.getElementById('frequency')
const freq_name = document.getElementById('freq-name')

const amplitude_slider = document.getElementById('amplitude')
const amp_name = document.getElementById('amp-name')

const sin_button = document.getElementById('sin')
const cos_button = document.getElementById('cos')
const tan_button = document.getElementById('tan')
const ctg_button = document.getElementById('ctg')
const square_button = document.getElementById('square')
const func_name = document.getElementById('func-name')


frequency_slider.oninput = function() {
    freq_name.innerHTML = 'Frequency: ' + frequency_slider.value + ' Hz'
    frequency = frequency_slider.value
    updateGenerator()
}

amplitude_slider.oninput = function() {
    amp_name.innerHTML = 'Amplitude: ' + amplitude_slider.value + ' V'
    amplitude = amplitude_slider.value * 100
    updateGenerator()
}

sin_button.addEventListener('click', () => {
    setFunction('sin')
    updateGenerator()
})

cos_button.addEventListener('click', () => {
    setFunction('cos')
    updateGenerator()
})

tan_button.addEventListener('click', () => {
    setFunction('tan')
    updateGenerator()
})

ctg_button.addEventListener('click', () => {
    setFunction('ctg')
    updateGenerator()
})

square_button.addEventListener('click', () => {
    setFunction('square')
    updateGenerator()
})


var ctx = canvas.getContext('2d')

canvas.width *= 10 
canvas.height *= 10


var osc = new Oscilloscope(ctx,canvas.width,canvas.height)


var voltage = 0
var tick = 0
var interval

var func
var amplitude
var frequency

function square() {
    if(tick % Math.floor((1000)/frequency) == 0)
        voltage = amplitude
    else if(tick % Math.floor(500/frequency) == 0)
        voltage = -amplitude
}

function sin(){
    let w = frequency * 2 * Math.PI
    voltage = amplitude * Math.sin(1/1000 * w * tick)
}

function cos(){
    let w = frequency * 2 * Math.PI
    voltage = amplitude * Math.cos(1/1000 * w * tick)
}

function tan(){
    let w = frequency * 2 * Math.PI
    voltage = amplitude * Math.tan(1/1000 * w * tick)
}

function ctg(){
    let w = frequency * 2 * Math.PI
    voltage = amplitude * Math.cos(1/1000 * w * tick) / Math.sin(1/1000 * w * tick)
}

function setFunction(out_func){

    func_name.innerHTML = 'Function: ' + out_func
    
    switch(out_func){
        case 'sin':
            func = sin
        break
        case 'cos':
            func = cos
        break
        case 'tan':
            func = tan
        break
        case 'ctg':
            func = ctg
        break
        case 'square':
            func = square
        break
        default:
            voltage = amp
    }
}

function update(osc) {
    osc.updateSamples()
    osc.setInput(voltage, 0)
    tick++
}

function setGenerator(out_func, amp, f){
    osc.setSignalType(out_func)
    
    amplitude = amp * 100
    frequency = f
    setFunction(out_func)

    updateGenerator()
}

function updateGenerator(){
    clearInterval(interval)
    interval = setInterval(func, 1, amplitude, frequency)
}


setInterval(update, 10, osc)

setGenerator('sin', 5, 1)
