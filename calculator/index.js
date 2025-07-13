function calculate(operation) {
    const number1 = parseFloat(document.getElementById("number1").value);
    const number2 = parseFloat(document.getElementById("number2").value);
    const resultElement = document.getElementById("result");
    
    // Check if inputs are valid numbers
    if (isNaN(number1) || isNaN(number2)) {
        resultElement.value = "Please enter valid numbers";
        return;
    }
    
    let result;
    
    switch(operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                resultElement.value = "Cannot divide by zero";
                return;
            }
            result = number1 / number2;
            break;
        default:
            resultElement.value = "Invalid operation";
            return;
    }
    
    // Format result to avoid long decimal places
    resultElement.value = parseFloat(result.toFixed(8));
}

function clearAll() {
    document.getElementById("number1").value = "";
    document.getElementById("number2").value = "";
    document.getElementById("result").value = "";
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate('add');
    } else if (event.key === 'Escape') {
        clearAll();
    }
});

// Legacy functions for backward compatibility
function plus(a, b) {
    return calculate('add');
}

function minus(a, b) {
    return calculate('subtract');
}