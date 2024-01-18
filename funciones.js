// Función para manejar cambios en los checkboxes
function handleCheckboxChange(row, col) {
  const checkboxes = document.querySelectorAll(
    `tr:nth-child(${row + 1}) input[type="checkbox"]`
  );
  checkboxes.forEach((checkbox, index) => {
    if (index !== col) {
      checkbox.checked = false;
    }
  });
}

// Función para limpiar el formulario
function resetForm() {
  // Limpiar el nombre del alumno
  const alumnoInput = document.querySelector('input[name="alumno"]');
  if (alumnoInput) {
    alumnoInput.value = "";
  }

  // Desmarcar todos los checkboxes en el tbody
  const table = document.getElementById("evaluacionTable");
  if (table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}

// Función para generar el PDF
function generatePDF() {
  // Seleccionar el contenedor de la tabla
  const element = document.querySelector(".tabla-container");

  // Obtener el nombre del alumno
  const alumnoInput = document.querySelector('input[name="alumno"]');
  const alumnoName = alumnoInput ? alumnoInput.value : "SinNombre";

  // Crear el nombre del archivo PDF con el nombre del alumno
  const fileName = `Evaluacion_${alumnoName}.pdf`;

  // Configuración para generar el PDF
  const pdfOptions = {
    margin: 10,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generar el PDF con la configuración personalizada
  html2pdf(element, pdfOptions);
}

// Función para añadir pregunta
function addQuestion() {
  const table = document.getElementById("evaluacionTable");

  if (table) {
    const tableBody = table.querySelector("tbody");

    // Verifica que tableBody no sea nulo antes de insertar la fila
    if (tableBody) {
      const newRow = tableBody.insertRow();

      // Añadir celdas a la nueva fila
      for (let i = 0; i < 5; i++) {
        const newCell = newRow.insertCell(i);
        if (i === 0) {
          // La primera celda para el nuevo texto de la pregunta
          const input = document.createElement("input");
          input.type = "text";
          newCell.appendChild(input);
        } else {
          // Las siguientes celdas para los checkboxes
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          newCell.appendChild(checkbox);
        }
      }
    } else {
      console.error("No se encontró el tbody de la tabla.");
    }
  } else {
    console.error("No se encontró la tabla con ID evaluacionTable.");
  }
}

// Función para quitar la última pregunta
function removeLastQuestion() {
  const table = document.getElementById("evaluacionTable");
  if (table) {
    const tableBody = table.querySelector("tbody");
    if (tableBody && tableBody.rows.length > 1) {
      // Eliminar el último elemento del array de filas
      tableBody.deleteRow(tableBody.rows.length - 1);
    }
  }
}
