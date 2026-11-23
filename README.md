# Agentes de Paz

Experiencia web interactiva para la materia **Violencia y Construcción de Paz**. A través de 15 escenarios cotidianos (escuela, familia, amistades, redes sociales, sociedad y reflexión personal), cada participante reflexiona sobre cómo responde ante el conflicto, la violencia y la injusticia, y recibe un resultado orientativo sobre su potencial como agente de paz.

Hecho con HTML, CSS y JavaScript puros: no necesita backend, base de datos ni servicios de pago, y funciona en GitHub Pages.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de las cuatro pantallas: bienvenida, evaluación, análisis y resultados |
| `styles.css` | Identidad visual, animaciones y diseño responsivo |
| `app.js` | Escenarios, puntuaciones, cálculo de resultados, guardado del progreso, gráfico y tarjeta descargable |

## Sistema de puntuación

**1. Cinco dimensiones**

| Clave | Dimensión |
|---|---|
| `emp` | Empatía y respeto |
| `dia` | Diálogo y comunicación |
| `nov` | Resolución no violenta de conflictos |
| `jus` | Justicia, inclusión y solidaridad |
| `res` | Responsabilidad y participación social |

**2. Puntos por alternativa.** Cada alternativa asigna de 0 a 3 puntos a las dimensiones que pone en juego ese escenario. Las respuestas no se dividen en "buena" y "mala":
- *Responder con insultos para defender a la víctima* suma en justicia (2), pero obtiene 0 en no violencia.
- *Detener la discusión sin escuchar* suma en no violencia y responsabilidad, pero obtiene 0 en diálogo.
- Algunos escenarios tienen **dos respuestas valiosas** que destacan en dimensiones distintas. Por ejemplo, en el comentario despectivo durante la comida familiar, cuestionarlo en el momento o hablarlo después en privado son opciones fuertes, cada una por razones diferentes. Por eso un 100 perfecto prácticamente no se alcanza (el máximo real ronda 98), lo cual es intencional.

**3. Porcentaje por dimensión.**

```
dimensión % = (puntos obtenidos en esa dimensión / máximo posible en las preguntas donde aparece) × 100
```

Cada dimensión solo cuenta en los escenarios donde está presente.

**4. Puntuación global (0–100).** Es el promedio de los cinco porcentajes, así que todas las dimensiones pesan lo mismo.

**5. Nivel**

| Puntos | Nivel |
|---|---|
| 80–100 | ¡Eres un agente de paz en acción! |
| 60–79 | ¡Estás muy cerca de ser un agente de paz! |
| 40–59 | Estás construyendo tu camino hacia la paz. |
| 0–39 | Tu camino como agente de paz comienza hoy. |

**6. Retroalimentación personalizada**
- **Fortalezas:** las 2 dimensiones con mayor porcentaje.
- **Áreas de mejora:** las 2 dimensiones con menor porcentaje.
- **3 recomendaciones:** una por cada una de las 3 dimensiones más bajas. Con 90 o más, se muestran recomendaciones para "multiplicar el impacto".
- **Revisión de escenarios:** al final se muestra cada respuesta elegida junto con una clave conceptual (violencia directa, estructural o cultural; paz positiva; mediación; etc.). Nunca se muestran puntos individuales.

**Medidas para favorecer respuestas auténticas**
- No se muestra ninguna puntuación mientras se responde.
- El orden de las alternativas se mezcla al azar para cada persona.
- Las alternativas representan reacciones realistas, no una opción obvia y tres absurdas.

## Cómo editar el contenido

Todo está al inicio de `app.js`:
- `QUESTIONS`: escenarios. Cada alternativa tiene `text` y `scores`, por ejemplo `{ emp: 3, dia: 2 }`.
- `DIMENSIONS`: nombres, colores, textos de fortalezas y áreas de mejora, y recomendaciones.
- `LEVELS`: rangos y mensajes de cada nivel.
- `QUOTES`: frases finales.

Puedes agregar o quitar escenarios: la barra de progreso y los cálculos se ajustan solos. Si cambias las preguntas después de publicar, cambia también `STORAGE_KEY` (por ejemplo, a `agentesDePaz.v2`) para que el progreso guardado con la versión anterior no se mezcle.

## Funciones técnicas

- **Guardado automático en `localStorage`:** si se recarga la página, se retoma en el mismo escenario.
- **Accesibilidad:** navegación completa con teclado (Tab, flechas, teclas `1`–`4` o `A`–`D` y `Enter`), roles ARIA, foco gestionado entre preguntas y soporte de `prefers-reduced-motion`.
- **Diseño responsivo:** celular, tableta y computadora.
- **Compartir:** usa la función de compartir nativa del dispositivo (con la imagen, cuando el navegador lo permite). Si no está disponible, copia el texto y el enlace al portapapeles.
- **Tarjeta descargable:** imagen PNG de 1080×1350 generada en el navegador, con la puntuación, el nivel y las cinco dimensiones.

## Publicar en GitHub Pages

1. Sube los archivos al repositorio desde la carpeta del proyecto:
   ```bash
   git add index.html styles.css app.js README.md
   git commit -m "Experiencia interactiva Agentes de Paz"
   git push origin main
   ```
2. En GitHub, abre el repositorio y entra a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona la rama **main** y la carpeta **/ (root)**, y pulsa **Save**.
5. Espera de 1 a 2 minutos. La página quedará disponible en:
   `https://<tu-usuario>.github.io/Agentes_de_Paz/`

> El repositorio debe ser **público** para usar GitHub Pages gratis.

Para probar en tu computadora, abre `index.html` en el navegador o, si prefieres un servidor local, ejecuta `python -m http.server` y visita `http://localhost:8000`.

## Aviso

El resultado es **orientativo y educativo**. No es un diagnóstico científico ni una valoración definitiva de la persona.

---

*Fundamentos: cultura de paz (UNESCO), triángulo de la violencia y paz positiva y negativa (Johan Galtung), mediación y escucha activa.*
