import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — MiamiDrive',
  description: 'Información sobre cómo MiamiDrive recopila, usa y protege tus datos personales.',
};

const LAST_UPDATED = '1 de enero de 2025';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-3">
              Política de Privacidad
            </h1>
            <p className="text-gray-500 text-sm">Última actualización: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: '1. Información que recopilamos',
                content: 'Para brindar nuestros servicios, recopilamos la siguiente información: (a) Datos de identidad: nombre completo, número de documento o pasaporte, número de licencia de conducir. (b) Datos de contacto: dirección de email, número de teléfono. (c) Datos de pago: información de tarjeta de crédito (procesada de forma segura, nunca almacenamos datos completos de tarjeta). (d) Datos de uso: historial de reservas, preferencias de vehículos, interacciones con nuestro sitio web. (e) Datos técnicos: dirección IP, tipo de navegador, cookies y datos de sesión.',
              },
              {
                title: '2. Cómo usamos tu información',
                content: 'Utilizamos tus datos personales para: (a) Procesar y gestionar tus reservas de vehículos. (b) Verificar tu identidad y elegibilidad para alquilar. (c) Procesar pagos y depósitos de garantía. (d) Enviarte confirmaciones, recordatorios y actualizaciones sobre tus reservas. (e) Brindarte atención al cliente y soporte técnico. (f) Mejorar nuestros servicios y personalizar tu experiencia. (g) Cumplir con obligaciones legales y regulatorias.',
              },
              {
                title: '3. Cookies y tecnologías similares',
                content: 'Nuestro sitio utiliza cookies propias y de terceros para: mantener tu sesión activa, recordar tus preferencias, analizar el tráfico del sitio (Google Analytics) y mejorar el rendimiento. Podés configurar tu navegador para rechazar cookies, aunque algunas funcionalidades del sitio pueden verse afectadas. Esta plataforma de demostración almacena datos en el localStorage de tu dispositivo para simular la funcionalidad completa sin necesidad de base de datos en el servidor.',
              },
              {
                title: '4. Compartir información con terceros',
                content: 'No vendemos ni alquilamos tus datos personales a terceros. Podemos compartir tu información con: (a) Procesadores de pago (Stripe, PayPal) para gestionar transacciones de forma segura. (b) Proveedores de servicios tecnológicos que nos ayudan a operar el sitio. (c) Autoridades legales cuando sea requerido por ley o en defensa de nuestros derechos. Todos nuestros proveedores están obligados contractualmente a proteger tu información.',
              },
              {
                title: '5. Seguridad de los datos',
                content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal, incluyendo: cifrado SSL/TLS en todas las comunicaciones, acceso restringido a datos personales solo al personal autorizado, no almacenamiento de datos completos de tarjetas de pago, y revisiones periódicas de seguridad. Sin embargo, ningún sistema es 100% seguro, por lo que no podemos garantizar seguridad absoluta.',
              },
              {
                title: '6. Tus derechos',
                content: 'Tenés derecho a: (a) Acceder a los datos personales que tenemos sobre vos. (b) Solicitar la corrección de datos inexactos. (c) Solicitar la eliminación de tus datos personales (derecho al olvido). (d) Oponerte al procesamiento de tus datos con fines de marketing. (e) Solicitar la portabilidad de tus datos. Para ejercer cualquiera de estos derechos, contactanos en privacidad@miamidrive.com.',
              },
              {
                title: '7. Retención de datos',
                content: 'Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines para los que fueron recopilados: historial de reservas: 5 años por obligaciones fiscales y legales; datos de cuenta: mientras la cuenta esté activa + 2 años; datos de marketing: hasta que solicites la baja o retires tu consentimiento.',
              },
              {
                title: '8. Cambios en esta política',
                content: 'Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios significativos por email o mediante un aviso destacado en nuestro sitio web. El uso continuado de nuestros servicios tras las modificaciones implica la aceptación de la política actualizada.',
              },
              {
                title: '9. Contacto',
                content: 'Para consultas sobre privacidad o para ejercer tus derechos, contactanos en: privacidad@miamidrive.com o por correo postal a: MiamiDrive, 1234 Collins Ave, Miami Beach, FL 33139, USA.',
              },
            ].map(({ title, content }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-white/6">
                <h2 className="text-white font-bold text-lg mb-3">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
