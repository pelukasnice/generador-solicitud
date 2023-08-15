function validarFormulario() {
  const legajo = document.querySelector('#legajo').value;
  const expediente = document.querySelector('#expediente').value;
  const oficinaFiscal = document.querySelector('#oficinaFiscal').value;
  const nombreSolicitante = document.querySelector('#nombreSolicitante').value;
  const dniTipo = document.querySelector('#dniTipo').value;
  const dni = document.querySelector('#dni').value;
  const domicilio = document.querySelector('#domicilio').value;
  const parentesco = document.querySelector('#parentesco').value;
  const nombreCadaver = document.querySelector('#nombreCadaver').value;
  const nombreCrematorio = document.querySelector('#nombreCrematorio').value;
  const provincia = document.querySelector('#provincia').value;
  const perito = document.querySelector('#perito').value;
  const nombreCocheria = document.querySelector('#nombreCocheria').value;

  // Validar que todos los campos estén completos
  if (
    legajo === '' ||
    expediente === '' ||
    oficinaFiscal === '' ||
    nombreSolicitante === '' ||
    dniTipo === '' ||
    dni === '' ||
    domicilio === '' ||
    parentesco === '' ||
    nombreCadaver === '' ||
    nombreCrematorio === '' ||
    provincia === '' ||
    perito === '' ||
    nombreCocheria === ''
  ) {
    alert('Por favor, complete todos los campos antes de generar el PDF.');
    return;
  }

  generarPDF(
    legajo,
    expediente,
    oficinaFiscal,
    nombreSolicitante,
    dniTipo,
    dni,
    domicilio,
    parentesco,
    nombreCadaver,
    nombreCrematorio,
    provincia,
    perito,
    nombreCocheria
  );
}

const generarPDF = (
  legajo,
  expediente,
  oficinaFiscal,
  nombreSolicitante,
  dniTipo,
  dni,
  domicilio,
  parentesco,
  nombreCadaver,
  nombreCrematorio,
  provincia,
  perito,
  nombreCocheria
) => {
  // Obtener la fecha actual formateada
  const getFormattedDate = (date) => {
    const dia = date.getDate();
    const mes = date.toLocaleString('default', { month: 'long' });
    const año = date.getFullYear();
    return ` el día ${dia} de ${mes} del año ${año}`;
  };

  const fechaActual = new Date();
  const fechaEscrita = getFormattedDate(fechaActual);

  const horaActual = fechaActual.getHours();
  const minutosActual = fechaActual.getMinutes();

  const doc = new jsPDF({
    format: 'legal'
  });

  doc.setFontSize(16);

  const margenDerecho = doc.internal.pageSize.width - 10;
  const margenInferior = doc.internal.pageSize.height - 10;

  // Generar contenido del PDF
  const generateContent = () => {
    const contenido = `
      LEGAJO N°: L-${legajo}
      EXPTE. N°: ${expediente}
      TRIBUNAL: ${oficinaFiscal}

                                ACTA SOLICITUD DE CREMACION

      En Mendoza,${fechaEscrita} a las ${horaActual}:${minutosActual} hs, se presenta el/la señor/ra ${nombreSolicitante} con documento ${dniTipo} N° ${dni} domiciliado en ${domicilio}, en su carácter de ${parentesco} a los fines de informar a Ud. mi intención de proceder a la cremación del cadáver de ${nombreCadaver} legajo N° ${legajo} en el crematorio ${nombreCrematorio} de la provincia de Mendoza. Certificado firmado por el Dr/a. ${perito}. El perito refiere que no necesita el cadáver para estudios posteriores.  El traslado lo efectuará la cochería ${nombreCocheria}.



                  SOLICITANTE                                                  PERITO
          (Firma, aclaracion y dni)

    `;

    return doc.splitTextToSize(contenido, margenDerecho - 10);
  };

  const lines = generateContent();
  const lineHeight = 10;
  const x = 10;
  let y = 60;

  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
  });

  // Cargar la imagen
 const logoImg = new Image();
 logoImg.src = 'https://raw.githubusercontent.com/pelukasnice/generador-solicitud/master/img/logo%20ministeriopublico.png'; 

 // Esperar a que se cargue la imagen
 logoImg.onload = function() {
 // Dimensiones y posición de la imagen
 const logoWidthCM = 70; // Ancho del logotipo en centímetros
 const logoHeightCM = 40; // Alto del logotipo en centímetros

 // Conversión de centímetros a puntos
 const cmToPoints = 1; // Relación de conversión de centímetros a puntos
 const logoWidth = logoWidthCM * cmToPoints; // Ancho del logotipo en puntos
 const logoHeight = logoHeightCM * cmToPoints; // Alto del logotipo en puntos

 // Dimensiones y posición de la imagen
 const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Centrar horizontalmente
 const logoY = 20; // Posición vertical en la página

 // Agregar la imagen al documento
 doc.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Guardar el PDF con el nombre del cadáver
    const fileName = `${nombreCadaver}_cremacion.pdf`;
    doc.save(fileName);
  };
};


















