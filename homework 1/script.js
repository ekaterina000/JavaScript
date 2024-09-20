function translateToEnglish() {
    document.getElementById('surname').innerText = 'Petrov';
    document.getElementById('name').innerText = 'Alexandet';
    document.getElementById('patronymic').innerText = 'Ivanovich';
    document.getElementById('gender').innerText = 'male';
    document.getElementById('birthplace').innerText = 'Saint-Peterburg';
}

document.getElementById('translateButton').addEventListener('click', translateToEnglish);

function insertTable() {
    let n = 5;
    let table = document.querySelector('#table');
    table.innerHTML = '';

    for (let i = 0; i < n; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            let td = document.createElement('td');
            td.innerText = (i + 1) * (j + 1);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let firstRow = table.querySelector('tr:first-child');
    firstRow.querySelectorAll('td').forEach(cell => {
        cell.style.backgroundColor = '#0288d1';
        cell.style.color = 'white';
    });

    let allRows = table.querySelectorAll('tr');
    allRows.forEach(row => {
        let firstCell = row.querySelector('td:first-child');
        firstCell.style.backgroundColor = '#0288d1';
        firstCell.style.color = 'white';
    });
}

function hideTable() {
    let table = document.querySelector('#table');
    table.innerHTML = '';
}

function toggleTable() {
    let table = document.querySelector('#table');
    let toggleButton = document.getElementById('toggleTableButton');

    if (table.innerHTML === '') {
        insertTable();
        toggleButton.innerText = 'Скрыть таблицу';
    } else {
        hideTable();
        toggleButton.innerText = 'Показать таблицу Пифагора';
    }
}

document.getElementById('toggleTableButton').addEventListener('click', toggleTable);
