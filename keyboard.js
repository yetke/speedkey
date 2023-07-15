const Keyboard = window.SimpleKeyboard.default;

const KeyboardLayouts = window.SimpleKeyboardLayouts.default;

let selectedInput;

let layouts = new KeyboardLayouts().get();

let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
});

function setLayout(layoutName) {
    keyboard.setOptions({
        ...layouts[layoutName]
    });
}

function onKeyboardInputFocus(event) {
    selectedInput = `#${event.target.id}`;
    keyboard.setOptions({
        inputName: event.target.id
    });
}

// Input Change
function onKeyboardInputChange(event) {
    keyboard.setInput(event.target.value, event.target.id);

    let id = event.target.id.replace('input_content_', '');
  
    for(let i = 0; i < tabs.length; i++) {
        if(tabs[i].id == id) {
            tabs[i].content = event.target.value;
        }
    }  
}

function onChange(input) {
  document.querySelector(selectedInput || ".input").value = input;
}

function onKeyPress(button) {
  // Shift functionality
  if (button === "{lock}" || button === "{shift}") handleShiftButton();
}

function handleShiftButton() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle
    });
}

function addKeyboardListener(el) {
    el.addEventListener('focus', onKeyboardInputFocus);
    el.addEventListener('input', onKeyboardInputChange)
}

addKeyboardListener(document.getElementById('input_content_1'));

function newLayoutOptions(el, defaultLayout = '') {
    let options = '';
    for (layout in layouts) {
        options += `<option value="${layout}">${layout}</option>`;
    }
    el.innerHTML += options;

    if(defaultLayout != '') {
        el.value = defaultLayout;
    }
}

newLayoutOptions(document.getElementById('layouts_1'));