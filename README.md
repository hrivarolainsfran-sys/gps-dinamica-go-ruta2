# El GPS y la señal perdida

Dinámica interactiva para GO, **Lección 6 «El Espíritu y la misión»**, punto 1: *«Mientras adoraban, el Espíritu habló»*.

Un GPS animado ayuda a explicar cómo guía el Espíritu Santo: un paso a la vez, recalculando cuando nos equivocamos, cerrando calles (Hechos 16:6-10) y en comunidad (Hechos 13:1-3).

## Juego en el predio: «Ruta a la capilla» (`/juego/`)

Versión con GPS real para recorrer el predio en equipos (un celular por equipo, 6-8 minutos):

1. **Modo líder:** imprime los carteles (buenos y trampas se ven iguales), pégalos en el predio y marca cada uno con «Marcar aquí». Bajo techo quedan como «Solo QR».
2. **Comparte:** genera el QR del juego y cada equipo lo escanea con la cámara.
3. **Juego:** el GPS guía al próximo punto. Si el equipo se acerca a una trampa, salta la advertencia «Recalculando» y tienen que discernir juntos para desviarse. Escanear un cartel bueno suma 100; detectar una trampa a tiempo suma 50; escanear una trampa resta 50 y obliga a esperar 15 segundos.
4. **Destino:** la capilla, donde se anuncia a Jesús.

Con «Probar en este celular» puedes ensayar el recorrido tocando el mapa, sin moverte.

**Enlaces fijos (con la nube conectada):** en el modo líder, «Guardar recorrido en la nube» guarda los carteles marcados. Desde ahí funcionan siempre:

- `juego/#jugador`: el adolescente que juega y transmite.
- `juego/#pantalla`: la computadora del proyector, que muestra al jugador en vivo.
- `juego/#equipos`: cada equipo con su celular.

La nube usa Firebase (Firestore). Pega la configuración web del proyecto en `juego/config.js` y publica las reglas de `juego/firestore.rules`. Sin eso, el juego funciona igual con el recorrido guardado en el celular y los enlaces largos.

**Jugador en pantalla grande:** en el modo líder, «Generar enlace del jugador» crea un enlace aparte para el adolescente que juega con el celular conectado a la pantalla. La clase ve en vivo su posición, el camino que va dejando, las advertencias de trampas (para ayudarlo a responder) y el recorrido completo al final. En horizontal, el mapa ocupa la pantalla y a la derecha queda un panel con la leyenda.

## Cómo usar la presentación

- **En línea:** abre la página de GitHub Pages de este repositorio.
- **Sin internet:** descarga `index.html` y ábrelo con doble clic en cualquier navegador.

| Tecla | Acción |
| --- | --- |
| Flechas / control de presentaciones | Cambiar de escena |
| Barra espaciadora | Animar la escena |
| G | Mostrar u ocultar el guion del maestro |

Para abrir directo en una escena, agrega `#escena-4` (o el número que quieras) al final de la dirección.

## Escenas

1. Inicio
2. Pantalla gigante
3. Paso a paso
4. Recalculando
5. Calle cerrada (opcional)
6. Comunidad
7. Sin señal
8. Cierre

Tiempo sugerido: 3 a 4 minutos dentro de los 8 del punto 1, antes de la dinámica de las tres situaciones. Versión bíblica: NTV.
