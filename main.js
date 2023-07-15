const tabs = [
    {
        "id": 1,
        "name": "Tab 1",
        "content": "",
        "layout": "english"
    }];
let activeTabId = 1;

function showTab(id) {
    document.getElementById('tab' + id + '_content').classList.remove('hidden');

    if(activeTabId != 0) {
        document.getElementById('tab' + activeTabId + '_content').classList.add('hidden');
        document.getElementById('tab' + activeTabId).classList.remove("text-blue-600", "border-blue-600", "active", "dark:text-blue-500", "dark:border-blue-500");
        document.getElementById('tab' + activeTabId).classList.add("border-transparent", "hover:text-gray-600", "hover:border-gray-300", "dark:hover:text-gray-300");
    }
    activeTabId = id;
    document.getElementById('input_content_' + id).focus();
    for(let i = 0; i < tabs.length; i++) {
        if(tabs[i].id == id) {
            console.log("/Layout:" + tabs[i].layout);
            setLayout(tabs[i].layout);
        }
    }
}
function deleteTab(id) {
    if(id == 1) {
        tabs[0].title = 'Tab 1';
        tabs[0].content = '';
        document.getElementById('tab_title_1').value = '';
        document.getElementById('input_content_1').value = '';
    }
    else {
        let tab = 0;
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].id == id) {
                tab = i;
            }
        }
        if(tab > 0) {
            let newActiveTabId = 1;
            if(id != 1) {
                newActiveTabId = tabs[tab -1].id;
            }
            showTab(newActiveTabId);
            tabs.splice(tab, 1);
            document.getElementById('tab' + id).parentElement.remove();
            document.getElementById('tab' + id + '_content').remove();
        }
    }
}
// Create a new Tab
function newTab(name="", content="", layout="") {
    const newTabId = tabs[tabs.length -1].id + 1;
    let newTabName = "Tab " + newTabId;
    let newTabContent = content;
    let newTabLayout = '';

    if(name != '') {
        newTabName = name;
    }
    if(layout != '') {
        newTabLayout = layout;
    }

    if(name != '' || content != '') {
        if(tabs[0].name == 'Tab 1' && tabs[0].content == '' && tabs.length == 1) {
            tabs[0].name = name;
            tabs[0].content = content;
            tabs[0].layout = layout;

            document.getElementById('tab_title_1').value = name;
            document.getElementById('input_content_1').value = content;
            document.getElementById('layouts_1').value = layout;
            showTab(1);
            return;
        }
    }
    tabs.push({id: newTabId, "name": newTabName, "content": newTabContent, layout: newTabLayout});
    document.getElementById("addNewTabLi").insertAdjacentHTML('beforebegin',
        `<li class="mr-2">
            <button onClick="showTab(${newTabId})" type="button" role="tab" id="tab${newTabId}" data-tabs-target="${"#tab" + newTabId + "_content"}" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-selected="true">${newTabName}</button>
        </li>`
        );
    document.getElementById('tabContent').insertAdjacentHTML ('beforeend', 
    `<div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="tab${newTabId}_content" role="tabpanel" aria-labelledby="tab1">
    <div style="max-width: 50em; margin: 0 auto">
        <div style="margin:0.5em">
            <input type="text" id="tab_title_${newTabId}" value="${newTabName}" style="display: inline-block" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required>
            <div style="float: right">
            <select id="layouts_${newTabId}" style="display:inline-block" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>Choose a layout</option>
            </select>
            <button onclick="deleteTab(${newTabId})" type="button" class="py-2.5">
                <svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                    </svg>
            </button>
            </div>
        </div>
        <div style="margin:0.5em">
            <textarea id="${'input_content_' + newTabId}" type="text" data-text="Type here..." style="min-height:5em" class="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">${newTabContent}</textarea>
        </div>
    </div>
    </div>`);

    showTab(newTabId);
    newLayoutOptions(document.getElementById('layouts_' + newTabId), newTabLayout);
    addKeyboardListener(document.getElementById('input_content_' +newTabId));
    addSelectListener(document.getElementById('layouts_' + newTabId));
}

// Set Tab Keyboard Language
function addSelectListener(el) {
    el.addEventListener('change', e => {
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].id == el.id.replace('layouts_', '')) {
                let currentLayout = el.value;
                tabs[i].layout = currentLayout;
                setLayout(currentLayout)
            }
        }
    });
}


addSelectListener(document.getElementById('layouts_1'));

// Rename Tab Title
window.addEventListener('keyup', e => {
    if(e.target.id.startsWith('tab_title_')) {
        const id = e.target.id.replace('tab_title_', '');

        let tabName = '';

        if(e.target.value == '') {
            document.getElementById('tab' + id).innerText = 'Tab ' + id;
            tabName = 'Tab ' + id;
        }
        else {
            document.getElementById('tab' + id).innerText = e.target.value;
            tabName = e.target.value;
        }

        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].id == id) {
                tabs[i].name = tabName;
            }
        }
    }
})

function download() {
    var content = JSON.stringify(tabs);
    var file =  new File([content], 'content.json', {type: 'application/json:charset=UTF-8'});
    var url = window.URL.createObjectURL(file);
    var a = document.createElement('a');
    //a.style = 'display: none';
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
}


let importInput = document.getElementById('import_file');

importInput.addEventListener('change', () => {
    let content = importInput.files[0].textContent;
    let reader = new FileReader();

    reader.onload = (e) => {
        importInput.textContent = e.target.result;
        let result = e.target.result;
        let resultJSON;
        try {
            resultJSON = JSON.parse(result);
        }
        catch(e) {
            return console.error(e);
        }
        for(let i = 0; i < resultJSON.length; i++) {
            newTab(resultJSON[i].name, resultJSON[i].content, resultJSON[i].layout);
        }
    }
});