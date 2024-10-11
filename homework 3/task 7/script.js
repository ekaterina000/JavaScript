function findTopBand() {
    const concertData = document.getElementById('concertData').value.trim().split('\n');
    const concerts2023 = {};
    const output = document.getElementById('top-band');

    concertData.forEach(record => {
        record = record.trim();
        if (record === 'END' || record === '') return;

        const [band, date] = record.split(', ');
        if (!date) return;

        const [day, month, year] = date.split('.').map(Number);

        if (year === 2023) {
            if (!concerts2023[band]) {
                concerts2023[band] = 0;
            }
            concerts2023[band]++;
        }
    });

    let topBand = '';
    let maxConcerts = 0;

    for (let band in concerts2023) {
        if (concerts2023[band] > maxConcerts) {
            maxConcerts = concerts2023[band];
            topBand = band;
        }
    }

    if (topBand) {
        output.textContent = `${topBand} ${maxConcerts}`;
    } else {
        output.textContent = 'Нет концертов в 2023 году';
    }
}
