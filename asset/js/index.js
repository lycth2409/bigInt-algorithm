import { performanceTime } from './performanceTime.js';
import { add, addLargeIntegers } from './add.mjs';
import { getRandomLargeIntegersInRange } from './random.js';
import { subtractLargeIntegers } from './sub.mjs';
import { divideLargeNumbers } from './div.js';

import { subLinkedList, addLinkedList } from './linkedList.js';

const randomBtn = document.getElementById('random');
const number1 = document.getElementById('num1');
const number2 = document.getElementById('num2');
const res = document.getElementById('result');
const timeInput = document.querySelector('.time');
const clearBtn = document.getElementById('clear');

const compareString = document.querySelector('.compare-string');
const compareLinked = document.querySelector('.compare-linked');

const randomStart = document.querySelector('.random-start');
const randomEnd = document.querySelector('.random-end');

const fileData = document.getElementById('data');

fileData.addEventListener('change', (e) => {
    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function () {
        let value = JSON.parse(reader.result);
        number1.value = value.num1;
        number2.value = value.num2;
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
});

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    mathAction(e);
});

function mathAction(e) {
    e.preventDefault();
    // const list = new LinkedList();
    // const { multiplyLinkedList } = list;
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const select = document.getElementById('math').value;
    // console.log(num1, num2, select);
    switch (select) {
        case 'summation':
            res.value = performanceTime(
                num1,
                num2,
                addLargeIntegers,
                timeInput
            );

            const dataAdd = {
                str: performanceTime(num1, num2, addLargeIntegers),
                linked: performanceTime(num1, num2, addLinkedList),
            };
            if (dataAdd.str.result === dataAdd.linked.result) {
                res.value = dataAdd.str.result;
                compareString.innerText = dataAdd.str.time.toFixed(9) + ' ms';
                compareLinked.innerText =
                    dataAdd.linked.time.toFixed(9) + ' ms';
            }
            break;
        case 'subtraction':
            const dataSub = {
                str: performanceTime(num1, num2, subtractLargeIntegers),
                linked: performanceTime(num1, num2, subLinkedList),
            };
            if (dataSub.str.result === dataSub.linked.result) {
                res.value = dataSub.str.result;
                compareString.innerText = dataSub.str.time.toFixed(9) + ' ms';
                compareLinked.innerText =
                    dataSub.linked.time.toFixed(9) + ' ms';
            }

            break;
        case 'division':
            res.value = performanceTime(
                num1,
                num2,
                divideLargeNumbers,
                timeInput
            );
            break;
        case 'multiplication':
            res.value = performanceTime(
                num1,
                num2,
                multiplyLinkedList,
                timeInput
            );
            break;
        default:
            return;
    }
    return;
}

// sử dụng hàm random
randomBtn.onclick = () => {
    let n1 = Number(randomStart.value);
    let n2 = Number(randomEnd.value);

    n1 == 0 && (n1 = 5000);
    n2 == 0 && (n2 = 5200);
    console.log(n1, n2);
    number1.value = getRandomLargeIntegersInRange(n1, n2);
    number2.value = getRandomLargeIntegersInRange(n1, n2);
};

clearBtn.onclick = () => {
    number1.value = '';
    number2.value = '';
    res.value = '';
    timeInput.value = '0 milliseconds';
};
