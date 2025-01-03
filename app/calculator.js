const screenValue = document.getElementById("screen");
const myButton = document.getElementById("open_close");
const myCalculator = document.getElementById("Calculator");

function addValue(value){
    screenValue.value += value;
}

function clearScreen(){
    screenValue.value = '';
}

function equal(){
    try{
        let result = eval(screenValue.value);

        if (typeof(Number(result)) === 'number'){
            if (!Number.isInteger(result)){
                screenValue.value = String(Number(result).toFixed(2));
            }else{
                screenValue.value = result;
            }
        }else{
            throw new Error("Error");
        }

    }catch(error){
        screenValue.value = "error";
    }
}

function backspace(){
    screenValue.value = screenValue.value.slice(0, -1);
}

myButton.addEventListener("click", () => {
    if(myCalculator.style.display === "none"){
        myCalculator.style.display = "block";
        myButton.textContent = "Close Calculator";
    }
    else{
        myCalculator.style.display = "none";
        myButton.textContent = "Open Calculator";
    }
});
