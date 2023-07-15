function generarPDF() {
    const nombreCadaver = document.getElementById('nombreCadaver').value;
    const legajo = document.getElementById('legajo').value;
    const peritoMedico = document.getElementById('peritoMedico').value;
    const nombreCocheria = document.getElementById('nombreCocheria').value;
    const vehiculo = document.getElementById('vehiculo').value;
    const patenteTransporte = document.getElementById('patenteTransporte').value;
    const nombrePersonaRetira = document.getElementById('nombrePersonaRetira').value;
    const cementerio = document.getElementById('cementerio').value;
  
    const doc = new jsPDF();
    doc.setFontSize(12);
  
    // Contenido de la nota de solicitud de cremación
    const contenido = `
      Fecha: ${new Date().toLocaleDateString()}
      
                                                                                       ${legajo}
                                                                                       ${nombreCocheria}
      
      Por medio de la presente, solicitamos la cremación del cadáver de ${nombreCadaver} 
      registrado bajo el legajo número ${legajo}, para lo cual se adjuntan los siguientes detalles:
  
      - Perito Médico responsable: ${peritoMedico}
      - Vehículo de transporte: ${vehiculo}
      - Patente del vehículo: ${patenteTransporte}
      - Persona autorizada para retirar los restos: ${nombrePersonaRetira}
      - Cementerio de destino: ${cementerio}
      
      Agradecemos su atención y disposición para llevar a cabo este procedimiento. Quedamos a la espera
       <br> de su pronta respuesta para coordinar los detalles finales.
  
      Atentamente,
  
      [Tu Nombre]
    `;
  
    // Agregar el contenido al PDF
    doc.text(contenido, 10, 10);
    
    // Guardar el PDF
    doc.save('solicitud_cremacion.pdf');
  }
  