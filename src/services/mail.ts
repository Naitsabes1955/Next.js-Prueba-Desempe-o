import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER ?? "";
const EMAIL_PASS = process.env.EMAIL_PASS ?? "";

if (!EMAIL_USER || !EMAIL_PASS) {
  console.log(
    "EMAIL_USER o EMAIL_PASS no están configurados. El envío de correos no funcionará."
  );
}

// Gmail con App Password (https://myaccount.google.com/apppasswords)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("Email de bienvenida no enviado: faltan credenciales EMAIL_USER/EMAIL_PASS");
    return;
  }

  try {

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a Nait's Recipes!</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0B0B0C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #F4F4F5;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #121214; margin: 40px auto; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- HEADER / LOGO -->
        <tr>
          <td align="center" style="padding: 40px 20px 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; tracking-tight: -0.05em; color: #FFFFFF;">
              <span style="color: #EAB308;">Nait's</span> <span style="font-weight: 300; color: #F4F4F5;">Recipes</span>
            </h1>
          </td>
        </tr>

        <!-- CONTENIDO PRINCIPAL -->
        <tr>
          <td style="padding: 40px 30px;">
            <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #EAB308;">
              ¡Registro Exitoso! 🍳
            </p>
            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 900; color: #FFFFFF; line-height: 1.2;">
              ¡Hola, ${name}! 👋
            </h2>
            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
              Te damos una emocionante bienvenida a nuestra comunidad culinaria. Nos alegra un montón que hayas decidido unirte a nosotros para descubrir lo sencillo y divertido que puede ser cocinar en casa.
            </p>
            <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
              A partir de ahora, con tu cuenta activa podrás guardar tus recetas favoritas, organizar tus menús semanales y explorar preparaciones de todos los niveles de dificultad.
            </p>
          </td>
        </tr>

        <!-- PROCESO INFORMATIVO CORTITO -->
        <tr>
          <td style="padding: 0 30px 30px 30px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0B0B0C; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
              <tr>
                <td>
                  <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 700; color: #FFFFFF;">¿Qué sigue ahora?</h4>
                  <p style="margin: 0; font-size: 13px; color: #71717A; line-height: 1.4;">
                    Inicia sesión en la plataforma, elige un antojo del catálogo, prepara tus ingredientes y ¡disfruta el proceso de cocinar!
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding: 30px 20px; background-color: #0B0B0C; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0 0 5px 0; font-size: 14px; font-weight: 700; color: #FFFFFF;">
              Nait's<span style="color: #EAB308; font-weight: 300;"> Recipes</span>
            </p>
            <p style="margin: 0 0 15px 0; font-size: 11px; color: #71717A;">
              Gastronomía casera · Inspiración culinaria · Aprendizaje interactivo
            </p>
            <p style="margin: 0; font-size: 10px; color: #52525B;">
              © 2026 Nait's Recipes. Todos los derechos reservados.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    
    
    `
    await transporter.sendMail({
      from: `"Nait's Recipes" <${EMAIL_USER}>`,
      to,
      subject: "¡Bienvenido a Nait's Recipes! 🍳",
      html: htmlContent
    });
  } catch (error) {
    // No lanzamos el error: que el correo falle no debe romper el registro del usuario.
    console.error("Error enviando el correo de bienvenida:", error);
  }
};
