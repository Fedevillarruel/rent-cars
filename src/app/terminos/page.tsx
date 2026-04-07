import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — MiamiDrive',
  description: 'Leé los términos y condiciones del servicio de alquiler de autos MiamiDrive en Miami, Florida.',
};

const LAST_UPDATED = '1 de enero de 2025';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-3">
              Términos y Condiciones
            </h1>
            <p className="text-gray-500 text-sm">Última actualización: {LAST_UPDATED}</p>
          </div>

          <div className="prose-custom space-y-8">
            {[
              {
                title: '1. Aceptación de los Términos',
                content: 'Al realizar una reserva en MiamiDrive, ya sea a través de nuestro sitio web, aplicación móvil o por teléfono, aceptás en su totalidad los presentes Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, no debés utilizar nuestros servicios.',
              },
              {
                title: '2. Requisitos para Alquilar',
                content: 'Para alquilar un vehículo en MiamiDrive es necesario: (a) Tener al menos 21 años de edad. Los conductores de 21 a 24 años abonan un cargo adicional por conductor joven. Para vehículos de categoría Luxury, Sports y Exotic se requieren 25 años mínimo. (b) Poseer licencia de conducir válida y vigente. Si la licencia está en idioma no latino, se requiere licencia internacional. (c) Presentar documento de identidad o pasaporte válido. (d) Disponer de tarjeta de crédito a nombre del conductor principal para el depósito de garantía.',
              },
              {
                title: '3. Tarifas y Facturación',
                content: 'Las tarifas publicadas en el sitio corresponden al precio por día de alquiler e incluyen kilometraje ilimitado. El precio final incluye: tarifa base × cantidad de días + plan de seguro seleccionado + servicios adicionales elegidos + impuestos aplicables. MiamiDrive se reserva el derecho de modificar las tarifas sin previo aviso, aunque los cambios no afectarán las reservas ya confirmadas y pagadas.',
              },
              {
                title: '4. Depósito de Garantía',
                content: 'Al momento de la entrega del vehículo, se realizará un bloqueo temporal (pre-autorización) en la tarjeta de crédito del conductor principal por el valor del depósito de garantía correspondiente a la categoría del vehículo. Este bloqueo se libera dentro de los 3 a 7 días hábiles posteriores a la devolución del vehículo en condiciones normales. En caso de daños, el monto necesario para su reparación será debitado del depósito.',
              },
              {
                title: '5. Política de Cancelación',
                content: 'Cancelaciones realizadas con más de 48 horas de anticipación al inicio del período de alquiler: reembolso del 100% del monto abonado. Cancelaciones entre 24 y 48 horas: reembolso del 50%. Cancelaciones con menos de 24 horas o no presentación (no-show): sin reembolso. Las modificaciones de fechas o vehículo están sujetas a disponibilidad y pueden generar diferencias de precio.',
              },
              {
                title: '6. Uso del Vehículo',
                content: 'El vehículo alquilado solo puede ser conducido por el conductor principal y los conductores adicionales registrados al momento de la reserva. Queda expresamente prohibido: (a) Subrendar o prestar el vehículo a terceros no registrados. (b) Participar en competencias, pruebas de velocidad o cualquier actividad ilegal. (c) Transportar personas o mercancías con fines comerciales. (d) Conducir bajo los efectos del alcohol, drogas o medicamentos que alteren la capacidad de conducción. (e) Salir del estado de Florida sin autorización previa por escrito.',
              },
              {
                title: '7. Responsabilidad por Daños',
                content: 'El cliente es responsable de todos los daños al vehículo que ocurran durante el período de alquiler, incluyendo daños causados por terceros no identificados. La responsabilidad del cliente se limita al valor del deducible o depósito de garantía según el plan de seguro contratado. En caso de accidente, el cliente deberá notificar a MiamiDrive de inmediato y seguir el protocolo de emergencias.',
              },
              {
                title: '8. Infracción de Tránsito y Multas',
                content: 'El cliente es responsable de todas las multas, infracciones de tránsito, peajes, cargos de estacionamiento y cualquier otra sanción generada durante el período de alquiler. MiamiDrive trasladará al cliente el monto de las multas que la empresa deba abonar, más un cargo administrativo de $25 por gestión.',
              },
              {
                title: '9. Fuerza Mayor',
                content: 'MiamiDrive no será responsable por retrasos o incumplimientos derivados de causas de fuerza mayor, incluyendo pero no limitado a: fenómenos meteorológicos extremos, desastres naturales, actos de gobierno, pandemia u otras circunstancias fuera de nuestro control.',
              },
              {
                title: '10. Ley Aplicable',
                content: 'Estos Términos y Condiciones se rigen por las leyes del Estado de Florida, Estados Unidos. Cualquier disputa que no pueda resolverse amigablemente será sometida a la jurisdicción de los tribunales competentes del condado de Miami-Dade, Florida.',
              },
              {
                title: '11. Contacto',
                content: 'Para consultas sobre estos Términos y Condiciones, podés contactarnos en: hola@miamidrive.com o al +1 (305) 555-0192.',
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
