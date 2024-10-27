import { NextResponse } from 'next/server';

const responses = {
  "Quiero bajar de peso": "Para bajar de peso de manera saludable, es importante crear un déficit calórico moderado y mantener una dieta equilibrada. Te recomiendo comenzar por: \n\n1. Aumentar el consumo de vegetales\n2. Controlar las porciones\n3. Beber suficiente agua\n4. Realizar actividad física regular",
  "Ganar músculo": "Para ganar músculo necesitarás:\n\n1. Aumentar la ingesta de proteínas (1.6-2.2g/kg de peso)\n2. Mantener un superávit calórico moderado\n3. Consumir carbohidratos complejos\n4. Realizar entrenamiento de fuerza progresivo",
  "Recomendación baja en carbohidratos": "Algunas opciones bajas en carbohidratos incluyen:\n\n1. Carnes magras\n2. Pescados\n3. Huevos\n4. Vegetales de hoja verde\n5. Aguacate\n6. Frutos secos",
  "Recomendación alta en proteínas": "Alimentos ricos en proteínas:\n\n1. Pechuga de pollo\n2. Atún\n3. Huevos\n4. Lentejas\n5. Greek yogurt\n6. Quinoa",
  "Recomendación de snacks": "Snacks saludables recomendados:\n\n1. Frutas con almendras\n2. Yogur con berries\n3. Hummus con vegetales\n4. Trail mix casero\n5. Batidos de proteína",
  "Dame un consejo": "Un consejo importante: La hidratación es clave para una buena nutrición. Intenta beber al menos 8 vasos de agua al día y limita el consumo de bebidas azucaradas.",
  "Qué tipo de alimentos debo evitar": "Es recomendable limitar:\n\n1. Alimentos ultraprocesados\n2. Bebidas azucaradas\n3. Grasas trans\n4. Exceso de sodio\n5. Dulces y postres muy azucarados",
  "Quiero mejorar mi salud": "Para mejorar tu salud general:\n\n1. Come más alimentos integrales\n2. Aumenta el consumo de frutas y verduras\n3. Limita el azúcar refinado\n4. Mantén un horario regular de comidas\n5. Duerme bien\n6. Haz ejercicio regularmente"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = responses[body.message as keyof typeof responses] || "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?";
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}