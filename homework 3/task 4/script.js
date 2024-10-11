function calculateAverages() {
  const studentNamesInput = document.getElementById("student-names");
  const studentGradesInput = document.getElementById("student-grades");
  const resultsTableBody = document.getElementById("results-table-body");
  const lowestAverageStudent = document.getElementById("lowest-average-student");

  const studentNames = studentNamesInput.value.split(",").map(name => name.trim());
  const studentGrades = studentGradesInput.value.split(" ");

  const studentAverages = {};
  for (let i = 0; i < studentNames.length; i++) {
    const name = studentNames[i];
    const grades = studentGrades[i].split("-").map(grade => parseInt(grade));
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    studentAverages[name] = average;
  }

  resultsTableBody.innerHTML = "";
  let lowestAverage = Infinity;
  let lowestAverageStudentName = "";
  for (const [name, average] of Object.entries(studentAverages)) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
    const averageCell = document.createElement("td");

    averageCell.textContent = average.toFixed(2);
    row.appendChild(nameCell);
    row.appendChild(averageCell);
    resultsTableBody.appendChild(row);

    if (average < lowestAverage) {
      lowestAverage = average;
      lowestAverageStudentName = name;
    }
  }

  lowestAverageStudent.textContent = `Студент с наименьшим баллом: ${lowestAverageStudentName}`;
}
