import nodemailer from 'nodemailer'



const blossom_emailpass = process.env.pass;


  
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        user: 'blossomfreecancer@gmail.com',
        pass: blossom_emailpass 
      }
    });
  
    const mensaje = {
      from: 'blossomfreecancer@gmail.com',
      to: correo_electronico,
      subject: 'Recordatorio importante',
      text: 'Este es un recordatorio importante para el próximo evento.',
    };
  
    // Agrega la lógica para enviar el correo en la fecha "reminderDate"
    transporter.sendMail(mensaje, (error, info) => {
        if(error){
          console.log("Hubo un error: ", error)
        } else{
          console.log("Correo enviado:", info.response);
        }
      })
