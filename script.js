var container = document.getElementById("array");
var inputElementsContainer = document.getElementById("input-elements");

// Generate input fields based on the number of elements specified
function generateInputFields() {
    var numElements = document.getElementById("array-size").value;
    inputElementsContainer.innerHTML = ''; // Clear previous input fields

    // Create input fields for each element in the array
    for (var i = 0; i < numElements; i++) {
        var inputField = document.createElement("input");
        inputField.type = "number";
        inputField.id = "elem" + i;
        inputField.placeholder = "Element " + (i + 1);
        inputElementsContainer.appendChild(inputField);
        inputElementsContainer.appendChild(document.createElement("br"));
    }
}

// Generate the array based on user input
function generateArrayFromInput() {
    var numElements = document.getElementById("array-size").value;
    var array = [];

    for (var i = 0; i < numElements; i++) {
        var value = document.getElementById("elem" + i).value;
        if (value === "" || isNaN(value)) {
            alert("Please enter valid numbers for all elements.");
            return;
        }
        array.push(Number(value));
    }

    container.innerHTML = ''; // Clear previous array
    // Create the blocks for visualization
    array.forEach((value, index) => {
        var array_ele = document.createElement("div");
        array_ele.classList.add("block");
        array_ele.style.transform = `translate(${index * 55}px)`;

        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    });

    return array;
}

// Swap function for Bubble Sort animation
function swap(el1, el2) {
    return new Promise((resolve) => {
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

// Bubble Sort with animation
async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");

    for (var i = 0; i < blocks.length; i++) {
        for (var j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, delay);
            });

            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
}

// Start sorting based on user input array
function startSort() {
    var array = generateArrayFromInput();
    if (array) {
        BubbleSort();
    }
}

// Default setup
generateInputFields();
