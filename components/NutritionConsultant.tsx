"use client";

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Apple, Brain, Dumbbell, Heart, Salad, Scale, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

const options = [
  { id: 'weight-loss', label: 'Quiero bajar de peso', icon: Scale },
  { id: 'muscle-gain', label: 'Ganar músculo', icon: Dumbbell },
  { id: 'low-carb', label: 'Recomendación baja en carbohidratos', icon: Apple },
  { id: 'high-protein', label: 'Recomendación alta en proteínas', icon: Utensils },
  { id: 'snacks', label: 'Recomendación de snacks', icon: Salad },
  { id: 'advice', label: 'Dame un consejo', icon: Brain },
  { id: 'avoid-foods', label: 'Qué tipo de alimentos debo evitar', icon: Heart },
  { id: 'health', label: 'Quiero mejorar mi salud', icon: Heart },
];

export default function NutritionConsultant() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([
    { type: 'bot', content: '¡Hola! Soy tu nutricionista virtual. ¿En qué puedo ayudarte hoy?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = async (option: string) => {
    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: option }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: option }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'Lo siento, hubo un error al procesar tu solicitud.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16">
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80"
              alt="Nutricionista Virtual"
              className="rounded-full object-cover w-full h-full"
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">Nutricionista Virtual</h1>
            <p className="text-gray-600 dark:text-gray-300">Tu asistente personal de nutrición</p>
          </div>
        </div>

        <ScrollArea className="h-[400px] mb-6 rounded-lg border p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", message.type === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-green-50 dark:hover:bg-green-900/30"
                onClick={() => handleOptionClick(option.label)}
                disabled={loading}
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}