const generarPDF = () => {
  const legajo = document.getElementById('legajo').value;
  const expediente = document.getElementById('expediente').value;
  const oficinaFiscal = document.getElementById('oficinaFiscal').value;
  const nombreSolicitante = document.getElementById('nombreSolicitante').value;
  const dniTipo = document.getElementById('dniTipo').value;
  const dni = document.getElementById('dni').value;
  const domicilio = document.getElementById('domicilio').value;
  const parentesco = document.getElementById('parentesco').value;
  const nombreCadaver = document.getElementById('nombreCadaver').value;
  const nombreCrematorio = document.getElementById('nombreCrematorio').value;
  const provincia = document.getElementById('provincia').value;
  const perito = document.getElementById('perito').value;
  const nombreCocheria = document.getElementById('nombreCocheria').value;

  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  var mes = fechaActual.toLocaleString('default', { month: 'long' });
  var año = fechaActual.getFullYear();
  
  const horaActual = fechaActual.getHours();
  const minutosActual = fechaActual.getMinutes();


  var fechaEscrita = " el día " + dia + " de " + mes + " del  año " + año;

  const doc = new jsPDF({
    format: 'legal'
  });

  doc.setFontSize(16);

  // Contenido de la nota de solicitud de cremación
  const margenDerecho = doc.internal.pageSize.width - 10; // Margen derecho
  const margenInferior = doc.internal.pageSize.height - 10; // Margen inferior

  const contenido = `
    LEGAJO N°: L-${legajo}
    EXPTE. N°: ${expediente}
    TRIBUNAL: ${oficinaFiscal}

                                    ACTA SOLICITUD DE CREMACION

    En Mendoza,${fechaEscrita} a las ${horaActual}:${minutosActual} hs, se presenta el/la señor/ra ${nombreSolicitante} con documento ${dniTipo} N° ${dni} domiciliado en ${domicilio}, en su carácter de ${parentesco} a los fines de informar a Ud. mi intención de proceder a la cremación del cadáver de ${nombreCadaver} legajo N° ${legajo} en el crematorio ${nombreCrematorio} de la provincia de Mendoza. Certificado firmado por el Dr/a. ${perito}. El perito refiere que no necesita el cadáver para estudios posteriores.  El traslado lo efectuará la cochería ${nombreCocheria}.
    
               
    
    
    FIRMA SOLICITANTE                                                 FIRMA PERITO
    
        
  `;

  const lines = doc.splitTextToSize(contenido, margenDerecho - 10); // Restar espacio para margen izquierdo

  const lineHeight = 10; // Altura de línea
  const x = 10; // Coordenada x para alineación izquierda
  let y = 10; // Coordenada y inicial para la primera línea
  
  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight; // Aumentar la coordenada y para la siguiente línea
  });

  // Guardar el PDF
  doc.save('solicitud_cremacion.pdf');
};
