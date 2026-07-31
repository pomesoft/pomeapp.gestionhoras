# Home - IS DODCS

_Fecha de descarga: 23/7/2026, 05:17:35_



# Página: https://isdocs.grupo.ypf.com/generales.html

[Saltar al contenido principal](#main)

Lineamientos generales
======================

**Inicio**
----------

### **Introducción**

Muchos de los puntos mencionados en este documento fueron tomados del libro de referencia “Clean Code” de Robert C. Martin.

Aquí se tocan los temas de Seguridad en las aplicaciones, mejores prácticas de código limpio y mejores prácticas a seguir que nos ayudarán, no solo en el trabajo que estamos ahora, sino que para cualquier cosa que deseemos realizar con profesionalismo.

Puede que aquí se enumeren cosas triviales que uno piense que ya vienen dadas por los nuevos lenguajes y sistemas; pensamos que no está de más mencionarlas.

### **Referencias**

Libro “Clean Code” de Robert C. Martin Guidelines for Secure Coding en [https://www.softwaretestinghelp.com/guidelines-for-secure-coding/ .](https://www.softwaretestinghelp.com/guidelines-for-secure-coding/)

### **Principios generales**

Todos los desarrollos deben seguir los siguientes puntos.

*   Seguridad
*   Código limpio
*   Unit test

**Seguridad**
-------------

Los desarrollos deben seguir las buenas prácticas de código seguro.

### **Prácticas**

*   Diseñar la seguridad de la aplicación antes de escribir código.
*   Desarrollar la aplicación con la seguridad ya implementada (_No dejar para el final agregar la autenticación y autorización_)
*   Utilizar las herramientas que provee YPF S.A. para el CI/CD
*   Analizar el código con las herramientas que provee YPF S.A. para verificar la calidad y seguridad del código
*   Verificar el cumplimiento de OWASP TOP 10.

### **Checklist**

*   #### **Validación de entrada:**
    
    *   No confiar en los datos de entrada, considerar centralizar la validación.
        
    *   No confiar en la validación del lado del cliente.
        
    *   Restringir, rechazar y sanear la entrada. Validar el tipo de dato, la longitud y formato.
        
*   #### **Autentificación**:
    
    *   Utilizar los métodos de autenticación provistos por YPF S.A. (ej: OIDC).
        
    *   Particionar la aplicación por área anónima, identificada y autenticada.
        
    *   No almacenar credenciales.
        
    *   Cifrar canales de comunicación (https).
        
*   #### **Autorización**
    
    *   Utilizar los métodos de autorización provistos por YPF S.A. (ej: OAuth2).
        
    *   Utilizar el principio de mínimos privilegios.
        
    *   Granular la autorización (roles y funciones).
        
    *   Restringir el acceso directo de los usuarios a los recursos del sistema.
        
    *   Validar siempre.
        
    *   Proteger los métodos y recursos confidenciales.
        
    *   .Protegerse contra el CSRF
        
*   #### **Manejo de sesión**
    
    *   Idealmente, realizar aplicaciones Session-Less.
        
    *   Crear un identificador de sesión en el servidor.
        
    *   Terminar la sesión con el logout del usuario.
        
    *   Generar un nuevo identificador al volver a iniciar sesión.
        
    *   Establecer el atributo “secure” para las cookies transmitidas por TLS.
        
*   #### **Criptografía**
    
    *   Usar cifrado en tránsito y reposo.
        
    *   Utilizar protocolos estándares.
        
    *   Mantener los datos sin cifrar lo más cerca del lugar de su utilización.
        
    *   Ciclar llaves periódicamente.
        
*   #### **Logueo y auditoria**
    
    *   Identificar comportamiento malicioso.
        
    *   Auditar y registrar la actividad en todos los niveles de la aplicación.
        
*   #### **Codificación de salida**
    
    *   Utilizar codificaciones estándar (XML, JSON).
        
    *   Realizar validación de esquemas.
        
    *   Enviar encabezados de seguridad
        

**Principios de código limpio**
-------------------------------

### **Regla del boy scout**

Al dejar de tocar una pieza de código, la dejamos mejor que como la encontramos.

### **Code Smells**

Existen varias cosas que podemos encontrar en el código fuente de una aplicación que a simple vista ya nos hacen ruido de por qué o para qué están ahí. Estas cosas como comentarios o código comentado, entre otros, se lo llama “Code Smells”. Es importante detectarlos y, siguiendo la regla del boy scout ayudar al siguiente desarrollador, limpiando los Code Smells.

### **Alta cohesión y Bajo acoplamiento**

Son principios que permiten modularizar las aplicaciones; así mismo es uno de los principios más importantes a la hora de diseñar microservicios.  
Debemos mantener las funciones y clases pequeñas y cohesivas. El acoplamiento puede dificultar el armado de pruebas unitarias y más aún el modularizar una aplicación.

**Formato del código**

Ser consistentes, limpios y prolijos en el formato del código ayuda a la legibilidad y mantenibilidad de este.

### **Unit Test (TDD)**

Existen 3 reglas básicas en el TDD:

*   **Primera regla:** No se debe escribir un código productivo hasta tener por lo menos un test unitario que falle.
*   **Segunda regla:** No se debe escribir en un test unitario más de lo necesario para que éste falle.
*   **Tercera regla:** No se debe escribir más código productivo de lo necesario para pasar los test unitarios.

### **Generales**

*   **Múltiples idiomas en un archivo fuente:**
    *   Hoy día los IDEs permiten fácilmente codificar varios lenguajes en un mismo archivo de código fuente. Por ejemplo, un archivo CS podría tener snippets de HTML, XML, JS.
    *   Lo ideal es que un archivo de código fuente tenga uno solo lenguaje. En la realidad seguramente necesitaremos usar más de uno, pero debemos realizar el esfuerzo de minimizar este impacto.
*   **El comportamiento obvio no se implementa:**
    *   Cualquier función o clase debe implementar los comportamientos que otro programador, razonablemente, podría esperar.
    *   Si creamos una función que toma un `string` con el nombre del día y queremos que lo transforme a un `enum` del día; (por ejemplo, “Lunes” a “Days.MONDAY”).
    *   Un programador esperaría que la función acepte tanto “Lunes” como “lunes” o “LUNES”, incluyendo sus abreviaciones.

### **Comportamiento incorrecto en los extremos**

Parece obvio decir que el código debe funcionar correctamente.

El problema es que rara vez nos damos cuenta de lo complicado que es el comportamiento correcto.

Es importante tomarse el tiempo para ver y entender los extremos y límipes de las funciones y no confiar en que, si unas pruebas unitarias funcionaron, entonces todo el código funcionará bien.

### **Duplicación**

Parece imposible de creer, pero hemos visto esto mucho.

El código limpio no solo es código ordenado y legible, también es código que no se repite. La repetición del código hace que, cuando un programador lo toma y realiza una modificación sobre una de las duplicaciones, tenga que ir y volver a realizar las modificaciones sobre la otra pieza de código; esto, si el programador se dio cuenta de que estaba duplicado.

Trae muchas complicaciones al desarrollo, pruebas y análisis de errores.

### **Código muerto**

Ya hemos dicho que es importante limpiar el código.

El código muerto es aquel que no se ejecuta nunca (por ejemplo, un bloque if)

Realizar las pruebas unitarias, completas y correctamente ayuda a encontrar estos bloques y eliminarlos del sistema, para así dejar el código limpio.

### **Inconsistencia**

Si uno desarrolla de cierta manera, entonces hágalo siempre de esa manera.

Si bien desde Ingeniería de Software pasamos los lineamientos de desarrollo, sabemos que existen desarrollos anteriores que no siguen estos lineamientos. Es importante mantener las cosas consistentes. De más estaría decir que consistente no es mal hecho; si vemos que algo está mal desarrollado, debemos corregirlo.

La consistencia permite que el programador que venga luego pueda mantener el mismo nivel de legibilidad del código.

### **Desorden**

Similar a la “Inconsistencia”, el desorden es un factor que hace a la legibilidad y mantenibilidad del código.

Seamos ordenados en lo que hacemos.

### **Acoplamiento Artificial**

Esto sucede cuando generamos un enum general y lo ponemos dentro de una clase más específica.

Debemos tomarnos el tiempo para diseñar nuestro código y entender dónde colocar cada pieza de código.

### **Intención oculta**

Queremos que el código sea tan expresivo como sea posible.

Hacer nombres de funciones o variables abreviadas hacen al código prácticamente imposible de entender.

### **Usar variables explicativas**

Al igual que el punto “Intención oculta”, el código debe ser legible y explicativo. Hoy día los lenguajes permiten nombres de variables largos, con los que se puede expresar la intención.

### **Los nombres de las funciones deben decir lo que hacen**

Al igual que el punto “Intención oculta”, el código debe ser legible y explicativo. Hoy día los lenguajes permiten nombres de funciones largos, con los que se puede expresar la intención.

### **Comprender el algoritmo**

Mucho del código que complicado de leer y entender es porque la gente no se toma el tiempo de entender el algoritmo.

Siga las convenciones estándar.

Todos los miembros de un equipo deben seguir las mismas convenciones y estándares. Esto da coherencia a los desarrollos, aumenta la visibilidad y la mantenibilidad.

Desde Ingeniería de Software se presentan lineamientos y estándares de desarrollo por cada tecnología.

### **Reemplazar Números Mágicos con Constantes Nombradas**

Los números mágicos son aquellos que se encuentran hard-codeados en el código en el lugar donde se necesita. Lo ideal es utilizar constantes bien nomencladas apropiadamente y que las mismas estén donde deban; si son de uso común, centralizadas; si son de uso exclusivo para la clase, al comienzo de la misma.

Lo principal y como se comenta en los demás puntos, es el orden, prolijidad y limpieza en los desarrollos. 

**Estructura sobre Convención**

Se deben reforzar los diseños con estructura por sobre convención. No debemos caer en el “así se hizo siempre”, debemos apuntar a las mejores prácticas y estándares para hacer las soluciones seguras, mantenibles y escalables.

### **Encapsular condicionales**

Aumenta la mantenibilidad y visibilidad a los desarrollos.

Es preferible:

```
“if (shouldBeDeleted(timer))”
```

Por sobre:

```
“if (timer.hasExpired() && !timer.isRecurrent())”
```

### **Evite los condicionales negativos**

Aumenta la mantenibilidad y visibilidad a los desarrollos.

Es preferible:

```
“if (buffer.shouldCompact())”
```

Por sobre:

```
“if (!buffer.shouldNotCompact())”
```

### **Las funciones deben hacer una cosa**

Generalmente, es tentador hacer una función con múltiples secciones que realizan una serie de operaciones. Tener este tipo de funciones que realicen varias acciones genera ofuscación, dificulta el entendimiento y mantenimiento.

Debemos separar este tipo de funciones en funciones más pequeñas que realicen una operación. 

### **No ser arbitrario**

Debe tener una razón en la manera en que se estructura el código, y debe asegurarse que esta razón es comunicada por el mismo código. Si una estructura parece arbitraria, entonces otro desarrollador podría modificarla; en cambio, si el código tiene un sentido de estructura, entonces la pieza de código está ahí por una razón y no será modificada.

Tener estructuras arbitrarias, sin una consistencia, hace que el código sea poco mantenible, más propenso a cambios y bugs.

**Encapsular condiciones de frontera**  
Esto es un tema puro y exclusivo de claridad en el código.  
Esta pieza de código:  

```
**int** nextLevel = level + 1;  
  
**if**(nextLevel < tags.length)  
  
{  
  
/\* TODO CODE \*/  
  
}
```

es más legible que esta otra pieza:

```
**if**(level + 1 < tags.length)  
  
{  
  
       /\* TODO CODE \*/  
  
}
```

### **Las funciones solo deben descender en un nivel abstracción**

Muchas veces este es uno de los puntos más difíciles de conseguir.  
Pongamos como ejemplo el siguiente código:  
  

```
**public String** render() throws Exception  
  
{  
  
StringBuffer html = new StringBuffer("<hr");  
  
**if**(size > 0)  
  
html.append(" size=\\"").append(size + 1).append("\\"");  
  
html.append(">");  
  
return html.toString();  
  
}
```

  
  

El mismo pertenece a una clase “HruleWidget” y dibuja una línea horizontal en la página con un alto dado por la variable “size” cuando encuentra una línea con 4 o más guiones; cuantos más guiones, más alta será la línea horizontal.  
Este código está mezclando varios niveles.  
Por un lado, está la noción de que la línea horizontal tiene un tamaño. Luego, la sintaxis del propio “HR”.  
Esta pieza de código se puede refactorizar de la siguiente manera.

```
**public String**render() throws Exception  
  
{  
  
HtmlTag hr = new HtmlTag("hr");  
  
**if**(extraDashes > 0)  
  
hr.addAttribute("size", hrSize(extraDashes));  
  
return hr.html();  
  
}  
  
**private String**hrSize(int height)  
  
{  
  
**int**hrSize = height + 1;  
  
return String.format("%d", hrSize);  
  
}
```

El módulo “HtmlTag” se encarga de todo lo referido a la sintaxis de HTML.  
Por otro lado, está la noción de “extraDashes” (guiones extra) lo cual dará lugar al tamaño de la línea horizontal.  
Este nuevo código es más mantenible y entendible que el anterior.  
Separar los niveles de abstracción es una de las tareas más importantes a la hora de refactorizar, y así también una de las más difíciles de realizar.

### Evite la navegación transitiva

  
En general no queremos que un módulo conozca mucho acerca de la arquitectura interna de las clases utilizadas. Más específicamente si “A” usa “B” y “B” usa “C”, no queremos que los módulos que utilizan “A” conozcan a “C”.  
La navegación transitiva genera rigidez en las arquitecturas.  
Por ejemplo:  
`a.getB().getC().doSomething();`  
Esto hace difícil realizar modificaciones a la arquitectura y, por ejemplo, poder poner un `“getQ”` entre `“getB”` y `“getC”.` Sería necesario buscar en todo el código el uso de `“a.getB().getC()”` y agregar el `“getQ”` entre medio y que quede `“a.getB().getQ().getC()”.`  
Lo ideal sería tener algo como `“a.doSomething();”,` dentro de “doSomething” habría un `“getB().doSomething();”`, y dentro del “doSomething” de “B” habría un `“getC().doSomething();”`. En este caso, agregar un “Q” entre “B” y “C”, sería mucho más sencillo pues habría que modificar en “B” para que llame a “Q”; luego en “Q” para que llame a “C”. 

**Nomenclatura**
----------------

### **Nombres descriptivos**

Los nombres en el código son el 90% de lo que hacen que el código sea legible, no se apresure, no pongan nombres sin pensar; tómense el tiempo para idear, junto con la arquitectura del código, los nombres que estarán necesitando utilizar en cada caso.

            Consideremos el siguiente código:

```
public void printRow**(**Table t**,** int i**){**  
  
    **for** **(** int j **\=** 0**;** j **<** t**.**qcol**;** j**++** **){**  
  
        **if** **(** t**\[**i**\]\[**j**\].**isNull**()** **)**  
  
            print**(** "" **);**  
  
        **else{**  
  
            **if** **(** t**\[**i**\]\[**j**\].**is**(**typeof**(**int**))** **&&** t**\[**i**\]\[**j**\].**v **\>** 50 **)**  
  
                setColor**(**Color**.**Red**);**  
  
            print**(**t**\[**i**\]\[**j**\].**v**);**  
  
            resetColor**();**  
  
        **}**  
  
    **}**  
  
**}**
```

 Si lo comparamos con el siguiente vemos una gran diferencia en la mantenibilidad del código

```
public bool isOverThreshold**(**int v**){**  
  
    **return** v **\>** CST\_OVERTHESHOLD**;**  
  
**}**  
  
   
  
private void printCell**(** Cell cell **){**  
  
    **if** **(** cell**.**isNull**()** **){**  
  
        print**(**""**);**  
  
    **}****else****{**  
  
        **if** **(** cell**.**is**(** typeof**(**int**)** **)** **&&** isOverThreshold**(** cell**.**value **)** **){**  
  
            setColor**(**Color**.**Red**);**  
  
        **}**  
  
        print**(**cell**.**value**);**  
  
        resetColor**();**  
  
    **}**  
  
**}**  
  
   
  
public void printRow**(**Row row**){**  
  
    **for** **(** int i **\=** 0**;** i **<** row.columnCount**;** i**++** **){**  
  
        printCell**(** row**\[**i**\]** **);**  
  
    **}**  
  
**}**
```

El poder de elegir cuidadosamente los nombres es que estos llenan la estructura de código con descripción.

### **Utilizar estándares de nomenclatura**

Los nombres son más fáciles de entender cuando están basados en convenciones existentes. Por ejemplo, si utilizamos atributos, deberían agregar el “Attribute” al final del nombre, de esta forma “AuthorizeManagedIdentityAttribute” sería el nombre del atributo que autoriza a los ManagedIdentity.

Esto es solo un tipo de estándar. En .Net las funciones que convierten un objeto a string se llaman “ToString”. De esta forma al ver esa función, uno ya tiene una idea de lo que hará. Es mejor seguir convenciones como estas que crear una propia.

### Nombres ambiguos

Elija nombres que hagan que el funcionamiento de una función o variable sea inequívoco. Miremos el siguiente ejemplo.

```
private String doRename**()** **throws** Exception  
  
**{**  
  
    **if****(**refactorReferences**)**  
  
        renameReferences**();**  
  
    renamePage**();**  
  
    pathToRename**.**removeNameFromEnd**();**  
  
    pathToRename**.**addNameToEnd**(**newName**);**  
  
    **return** PathParser**.**render**(**pathToRename**);**  
  
**}**
```

La función “doRemane” no nos dice lo que hace más allá de una vaga idea de renombrar algo. Esto se pone más difícil de entender cuando vemos que hay un “renamePage” dentro.

Un mejor nombre podría ser “renamePageAndOptionallyAllReferences”; es largo y si se utiliza muchas veces en el código puede ser tedioso, pero es muchísimo más mantenible.

### **Nombres largos**

La longitud de los nombres debe ser acorde al alcance que tengan.

En general, las variables “i”, “j”, “k”, son iteradores y su alcance es corto, por lo que estaría bien utilizarlos en bloques de no más de 5 líneas; cuando estos bloques son más grandes, el significado de los nombres cortos se pierde rápidamente.

### **Evitar codificaciones**

Los nombres no deben codificarse con información de tipo o alcance. Los prefijos tales como “m\_”, “f”, “i”, “d” ya no son útiles en los entornos de desarrollo de hoy día. Mantengan su código libre de la contaminación de la notación húngara.

**Comentario**
--------------

### **Información Inapropiada**

Es inapropiado que un comentario contenga información que es mejor mantenida en otro tipo de sistema como el sistema de control de código fuente, el sistema de seguimiento de problemas o cualquier otro sistema de registro. En general, metadatos como autores, última fecha de modificación, etc., no deben aparecer en los comentarios.

Los comentarios deben reservarse para notas técnicas sobre el código y el diseño.

### **Comentario obsoleto**

Un comentario que se ha vuelto viejo, irrelevante e incorrecto está obsoleto. Los comentarios envejecen rápidamente. Es mejor no escribir un comentario que se vuelva obsoleto. Si encuentra un comentario obsoleto, lo mejor es actualizarlo o deshacerse de él lo más rápido posible. Los comentarios obsoletos tienden a migrar lejos del código que alguna vez describieron.

### **Comentario redundante**

Un comentario se vuelve redundante cuando describe algo que se describe por sí solo.

Por ejemplo:

`i++; // incrementar i`

Los comentarios deben describir cosas que el código no puede describir por sí mismo.

### **Comentario mal escrito**

Un comentario que vale la pena escribir, vale la pena escribirlo bien. Si va a escribir un comentario, tómese el tiempo para asegurarse de que sea el mejor comentario que pueda escribir.

Utilizar las palabras, la gramática y la puntuación correctas.

No divagar.

No decir lo obvio.

Ser breve.

### **Código comentado**

El código comentado, en general, se vuelve obsoleto rápidamente. Nadie sabe por qué está ahí. Nadie sabe hace cuánto está ahí. Nadie sabe si realmente tiene sentido que esté ahí.  Ese código queda ahí por mucho tiempo, volviéndose menos relevante cada día que pasa. Utiliza variables cuyos nombres cambiaron o llama a funciones que ya no existen. Sigue convenciones que por ahí ya son obsoletas. Contamina los módulos que lo contienen y distrae a las personas que intentan leerlo.

Cuando vea un código comentado, simplemente siga los pasos del código limpio y bórrelo. No se preocupe, el sistema de control de código fuente aún lo recuerda. Si alguien realmente lo necesita, lo irá a buscar al sistema de control de código fuente.

### **Funciones**

Demasiados Argumentos

Las funciones deben tener una pequeña cantidad de argumentos. Ningún argumento es lo mejor, seguido de uno, dos y tres.

Más de tres es para revisar.

### **Argumentos de salida**

Los argumentos de salida son contradictorios. Los lectores esperan que los argumentos sean entradas, no salidas. Si su función debe cambiar el estado de algo, haga que cambie el estado del objeto al que se llama.

### **Argumentos booleanos**

Los argumentos booleanos declaran en voz alta que la función hace más de una cosa. Son confusos y hay que tratar de evitarlos.

### **Función Muerta**

Los métodos que nunca se llaman, al igual que el código comentado, deben eliminarse.

No tenga miedo de eliminar la función. Recuerde que el sistema de control de código fuente todavía lo recuerda.

**Repositorios GIT**
--------------------

### **Objetivos**

El objetivo de este documento es establecer el flujo de trabajo y las políticas generales para el manejo de repositorios GIT. Definir branches, su nomenclatura, propósito y duración para facilitar el control de la calidad e integridad de todos los productos que se generen durante el ciclo de vida del proyecto/requerimiento.

### **Alcance**

Esta guía aplica a todos los desarrollos cuyo repositorio de código fuente son gestionados mediante el software de control de versiones Git.  

### **Política de branching mediante el gitflow**  

El flujo de trabajo seleccionado por YPF para realizar el manejo de los repositorios Git y sus Branches (ramas) es conocido de manera estándar como Gitflow el cual por modelo de ramificación proporciona un marco robusto para la gestión de proyectos de diferentes tamaños. 

Este flujo de trabajo no agrega ningún nuevo concepto o comando más allá de lo que se requiere para un característico flujo de trabajo de repositorios basados en branches. En su lugar, asigna roles muy específicos a diferentes ramas y define cómo y cuándo deben interactuar con cada una de ellas. Además de las ramas características, utiliza ramas individuales para preparar, mantener y registrar los releases. 

Si bien GitFlow propone un marco de trabajo bastante definido, también permite la flexibilidad de poder adaptarlos a necesidades específicas de los equipos de trabajos, aprovechando esta virtud para los entornos YPF se realizó una adaptación de este flujo para integrarlo con la herramienta Azure Devops que permite la gestión de los pipelines de CI/CD, y que en combinación con el Gitflow permiten orquestar todo el flujo de trabajando de los proyectos iniciando con la definición de los branches en el código. 

La definición de branches nos permite organizar distintas líneas de trabajo sobre una misma aplicación de manera que es posible gestionar el código desarrollado de una forma organizada y eficiente, los branches que proponemos utilizar en Gitflow y sus características se describen a continuación: 

*   **Branch master|main** : Master es el branch principal que refleja el código fuente siempre de la versión de la aplicación en producción, y para mantener esta consistencia este branch solo deberá ser actualizado por pull request una vez que se realice el despliegue en el ambiente de producción. Este branch también será el baseline utilizado para la generación de Hotfix y deberá estar bloqueada po defecto.  
    
*   **Branch features/** \*: Se trata de una rama efímera que parte su existencia del HEAD de master/main (o del último tag existente en dicha rama que especifique la última versión desplegada y estable). Su propósito es el ser utilizadas en los desarrollos evolutivos.  
    
*   **Branches features/\*** : Los branches Features son ramas efímeras generadas a partir del del HEAD de master/main (o del último tag existente en dicha rama que especifique la última versión desplegada y estable) con el fín de realizar nuevos features y/o fixes del código, su tiempo de vida será igual al tiempo que se tarde en desarrollar la nueva funcionalidad. Pueden existir tantos branches del tipo Feature como funcionalidades se estén desarrollando en paralelo. Una vez finalizada la nueva funcionalidad para la cual fue creada el branch Feature. 
*   **Branches releases/\*** Los branches Releases son ramas efímeras. Comienza su existencia una vez que el desarrollo finaliza y se disponibiliza para las pruebas. El origen es el HEAD de master integrando los cambios realizados en la rama o ramas features/\* que se consideren necesarias. Se destruye al momento de la implantación en producción.  
    Es importante mencionar que una vez creada un Branch Release se inicia el ciclo de publicación a producción por lo que no se deberían agregar más funcionalidades a la aplicación sobre este branch, pero se podrían aplicar correcciones de errores, la generación de documentación y otras tareas orientadas a la liberación sobre este Branch. El uso de una rama dedicada para preparar el release a producción hace posible que un equipo pueda pulir el lanzamiento actual, mientras que otro equipo continúa trabajando en las características para el próxima release.
*   **Branches bugfix/\*** : Se trata de una rama efímera. Comienza su existencia como resultado del fix de bugs en las ramas release. La intención es no comprometer la estabilidad que haya llegado a disponer el ambiente afectado. Se destruye una vez que el bug se considere resuelto. 
*   **Branches hotfix/\*** : Los branches de hotfix son ramas efímeras. comienza su existencia como resultado de la detección de errores que deben ser resueltos en Producción. Nace de master/main y muere en master/main. Estas ramas responden a la necesidad de actuar inmediatamente para corregir un comportamiento no deseado de la aplicación en producción (por ejemplo, un bug crítico). La esencia de un branch Hotfix es que los desarrolladores puedan seguir trabajando en el branch feature, mientras otra persona prepara un fix de urgencia para producción. Hacer esto permite tener una línea dedicada de desarrollo para la corrección de errores que le permiten al equipo de trabajo abordar los problemas sin interrumpir el resto del flujo de trabajo o esperar el próximo ciclo de reléase.

Tags:     

*   utilizarlos para marcar en el historial de master los diversos reléase desplegados en producción.  
    

En la siguiente imagen se ilustra el flujo de trabajo que siguen l o s branches , su s puntos de orígenes y su s fusiones de manera general:  

### **Consideraciones generales obre los branches**

En la siguiente tabla se resumen las consideraciones generales que se deben tener en cuenta con respecto a la nomenclatura y flujos de los branches del GitFlow: 

Tags: replicar la versión utilizada en el reléase. V1.0.1  

Nota : Toda descripción corta debe ser en minúsculas, evitando la utilización de caracteres acentuados y espacios; de hasta 32 caracteres ( Regex : ^ (?= .{1, 32}$ )\[a-z\]+\[0-9a-z-\_\]\*\[\[0-9a-z\]+$)

### Ambientes

Correspondencia entre los ambientes y el ciclo de vida del código.  

**DEV** : El branch que se considere necesario, sin ningún tipo de restricción (se recomienda ser utilizada para el despliegue de ramas features, releases, bugfix).  

**TST/QA** : Únicamente debieran desplegarse, aquellas ramas que partan de releases/\*, en este punto se dan las iteraciones necesarias para el fix (abriendo un branch que permita trabajar con los fixes sin romper la “estabilidad” del ambiente, como se define en la parte de branches; utilizando ramas bugfix/\*). Es factible desplegar ramas hotfix en este ambiente SI y SOLO SI o existiera UAT.  

**UAT** : En caso de existir este ambiente, la mecánica de despliegue es la misma que para TST, con la “prácticamente” única diferencia de los datos que este ambiente contiene, por considerarse un espejo productivo. Teniendo en cuenta la salvedad de la posibilidad de desplegar ramas bugfix, hotfix y release.  

**PRD** : Es producción. Solo se deben desplegar los artefactos resultantes del correcto merge resultante de la integración del PR (previamente habiendo sido integrados los cambios de master en el reléase que se pretende desplegar y sus correspondientes pruebas).   

### **Flujo de trabajo con GIT** 

A continuación, se describe la forma de trabajo esperada para la correcta implementación de la política de braching en conjunto con el despliegue automatizado orquestado por el pipeline de CI/CD: 

*   **CASO 1** : Flow para agregar Nueva Funcionalidades  
    Este flow consiste en el camino utilizado para generar las nuevas versiones de una aplicación. Cada vez que se genere una nueva versión de la misma pasará por una serie de pruebas en cada uno de los entornos según aplique, por lo general una aplicación tiene los siguientes entornos: DEV, TEST, UAT, PROD.   
      
    Los pasos por los que atravesara la nueva versión son:
    *   El equipo de desarrollo crear del branch master/main un nuevo branch feature N para desarrollar los features/fixes de la aplicación.
    *   Una vez concluidos los cambios se generará una nueva rama release que resulta del merge de la rama feature con master/main.
    *   Una vez generado el branch release N, se ejecutará de manera automática el pipeline de CI/CD para desplegar la nueva versión generada del código fuente de la aplicación en los entornos de DEV, TEST, UAT y PROD (teniendo en cuenta las aprobaciones intermedias).
    *   Si se detectaran errores en el código se deberán arreglar en una nueva rama bugfix que finalmente se mergeará a la rama release. 
*   **CASO 2** : Flow de HotFix para corregir Bugs en Producción  
    Este flow consiste en los pasos a seguir en caso de detectar una falla de la aplicación y necesitar aplicar un cambio tan rápido como sea posible sobre el entorno productivo. Esto quiere decir que la nueva versión de la aplicación solo será desplegada en PROD, por los que no se llevarán a cabo pruebas o validaciones en entornos previos, aunque sí es necesario la aprobación de la persona responsable para que el despliegue se haga de manera efectiva y los cambios sean visibles de cara a los usuarios finales. Sus pasos son los siguientes:
    
    *   El equipo de desarrollo crea un branch de master/main para realizar los cambios correspondientes, el mismo deberá ser etiquetado según lo establecido como hotfix/{INC/DESC\_CORTA}.
        
    *   Una vez concluida la generación de la nueva versión se desplegará la misma como un candidato a un entorno final. El usuario realizará las pruebas en el entorno de TST o QA.
        
    *   Una vez desplegada en PROD, la persona encargada decidirá si los cambios solucionan los issues reportados y permite utilizar la aplicación sin ningún inconveniente.
        
        *   En caso de que los cambios fueran exitosos se continuará con el paso 4
            
        *   En caso de que los cambios no solucionen los problemas reportados o si los cambios generan problemas en otras funcionalidades de la aplicación se deberá volver a realizar otra versión de la aplicación. Por ende, se deberá volver al paso 1. 
            
    *   Una vez conseguida la aprobación de la persona encargada se deberán ejecutar las siguientes acciones:
        
        *   Se realizarán los cambios para que los request de los usuarios sean balanceados a la nueva instancia de la aplicación. 
            
        *   Se deberá realizar un merge del branch m/main, el cual contiene los cambios para resolver los incidentes productivos, contra los branches release y feature. 
            

### Estrategia de rollback

Formalmente, se debe discriminar el código existente en un determinado ambiente vs el ciclo de vida de dicho código. Se ve necesario, en relación con el código, distinguir la correspondencia entre cambios a nivel de código de aplicación y cambios en estructuras de datos. 

Como primera estrategia, el equipo que lleve el desarrollo de la aplicación debe analizar el costo/beneficio de una reversión vs mantener el ambiente con fallas hasta dar con los fixes necesarios; dado que, dependiendo del tamaño/complejidad de los cambios, es probable que sea más complejo o disruptivo remover todos los cambios introducidos en las estructuras de datos de forma segura. 

Ahora bien, si la decisión es revertir los cambios, se debieran tener en cuenta las siguientes consideraciones:  

En lo que respecta al código vivo en el ambiente, la primera acción debiera/podría ser:

*   Redesplegar el ultimo artefacto estable, que corresponda con la versión de estructuras de datos a la que se quiera volver en el tiempo.
*   Identificar si la última versión funcional de la aplicación puede funcionar con las estructuras de datos actuales.
*   Preparar de antemano la correcta formulación del scripting necesario, de forma tal que permita realizar la vuelta atrás de las estructuras de datos y/o alteraciones EN los datos que puedan haberse mutado.  

En lo que respecta a código en los repositorios: 

Tomando el ultimo tag (release) previo inmediato al actual (Utilizando los tags generados en el momento de la integración con master), ya que DEBIERA ser coincidente con el ultimo artefacto desplegado en el rollback del ambiente; abrir un nuevo branch que permita realizar las correcciones necesarias para lograr el correcto funcionamiento del ambiente.  

Formalmente, dado que este parche representa incrementar la versión efectiva del producto/aplicación, se debe generar una rama hotfix con todos los cambios requeridos (utilizando ambientes “bajos” como UAT o TST en su defecto para realizar las pruebas que sean necesarias para la verificación de que corrección es efectiva). 

Al final del camino, todo release, hotfix o bugfix, representa el incremento en la versión de producto. 

### **Adecuaciones con .NET**

Se enumeran una serie de pasos a tener en cuenta al migrar repositorios de código fuente desde TFS a GIT y casuísticas generales a menudo omitidas.

#### Migraciones de TFS

TFS utiliza una serie de archivos y configuraciones, que son innecesarias al migrar a GIT.

Por lo que se recomiendan siguientes acciones:

*   Eliminar los archivos con extensión  _.vspscc_
    
*   Eliminar las carpetas bin y obj que existan.  
    Contiene archivos que se generan automaticamente con cada compilación y no aportan nada significativo al codigo fuente.
    
*   Eliminar la carpeta  _packages_  y  _.vs_  que existan en el raiz del repositorio. (Sigue el mismo criterio que el punto anterior).
    
*   Editar los archivos de proyecto ( _ejemplo: \*.csproj para C#_ ), eliminando los siguientes nodos (ya que utilizan sintaxis XML):
    
    ```xml
    <SccProjectName>
     <SccLocalPath>
     <SccAuxPath>
     <SccProvider>
    ```
    
*   Editar los archivos de solución \*sln, eliminando el siguiente bloque:
    
    ```
    GlobalSection(TeamFoundationVersionControl) = preSolution
    ... # omitido para abreviar el contenido
    EndGlobalSection
    ```
    
*   **Importante** : Agregar el archivo .gitignore en el raiz del repositorio, ya que es la forma en la que GIT entiende que es lo que no debe versionar.  
    Se puede utilizar el siguiente archivo:  [gitignore.txt](https://dev.azure.com/Azure-DevOps-YPF/509aeb7e-ef9c-4dad-a450-cbfb8548b9ec/_apis/git/repositories/f5918f79-697b-4027-944d-50d8d9ffa7f6/Items?path=/.attachments/gitignore-3507c2ed-9f63-4be3-9f38-e5330eafd65b.txt&download=false&resolveLfs=true&%24format=octetStream&api-version=5.0-preview.1&sanitize=true&versionDescriptor.version=wikiMaster) (renombrarlo).
    

Hacer commit de estos cambios. Una vez realizado el mismo, ya no son necesarias acciones adicionales.

### Sanitización de repositorios GIT

#### Motivacion

> En los repositorios suelen darse la siguiente clase de situaciones:
> 
> *   Archivos/carpetas de compilación innecesario que se han subido al repositorio (Ej: bin/obj/.vs/packages)
> *   Archivos/carpetas de releases se han subido al repositorio equivocado (Ej: release1.zip)

> Si bien estos pueden haberse borrado el estado actual del repositorio. aun así, quedan en el historial.

#### Advertencia

> Este método re-escribe el historial de GIT (por lo que la sanitización es definitiva)  
> Por lo que se recomienda la selección explicita de archivos y/o carpetas a sanitizar (no usar regex).

#### Requisitos

> Necesita de  **python3**  y  **git**  instalado en el equipo donde se ejecuta. Por lo que se requiere instalación con  **Usuario F**  o  **instalación portable**

#### Documentación de base:

> [https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html#EXAMPLES (Opens in new window or tab)](https://htmlpreview.github.io/?https%3A%2F%2Fgithub.com%2Fnewren%2Fgit-filter-repo%2Fblob%2Fdocs%2Fhtml%2Fgit-filter-repo.html#EXAMPLES)

#### Pasos Recomendados:  
  
Paso 1:

##### Sincronización

*   ##### Determinar quién va a ejecutar lo siguiente en el equipo de desarrollo. Este proceso debe detener el trabajo del equipo para sincronizar el resultado efectivo.
    
*   Sincronizar el trabajo pendiente de manera estable, coordinar todos los cambios en una rama.
*   Eliminar todos los clonados locales

##### Selección y Borrado

*   Identificar en el Repositorio los archivos/carpetas a descartar  
    
*   Borrar uno por uno a conciencia  
    

##### Evasión

*   Para que el problema vuelva a ocurrir asegúrese de configurar el archivo .gitignore de manera que el resultado obtenido se mantenga.

> > Ej:  [https://github.com/github/gitignore/blob/main/VisualStudio.gitignore  (Opens in new window or tab)](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore)

##### Verificación:

*   Realizar una clonacion del repositorio individualmente.
*   Compilar y ejecutar
*   La solapa de GIT changues debería de estar vacía. (a lo sumo alguna actualizacion de .gitignore)  
    
    Antes
    
    Despúes
    

#### Paso 2:

> ontemplando los archivos/carpetas que se deseen sanitizar

##### Resguardo:

*   Correr el siguiente comando

> > > git filter-repo --analyze

*   Eso genera la siguiente carpeta en la cual debemos resguardanos 'path-all-sizes.txt' en una carpeta temporal

##### Selección de propuestas (opcional):

*   Los siguientes archivos poseen el historial de archivos borrados.  
      
    Entre ellos puede haber contenido que corresponda o no a eliminarse del historial. Por lo general su carpeta principal bastaría.
*   Tomar de referencia, seleccionar cuidadosamente.

##### Aplicacion

*   Eliminar cada path especificado del historial del repositorio utilizando el siguiente comando en phyton o cmd.

> > Variante 1
> > 
> > > git filter-repo --invert-paths --path AESA\_ParteDiario/AESA\_ParteDiario/bin  
> > > git filter-repo --invert-paths --path AESA\_ParteDiario/AESA\_ParteDiario/obj

> > Variante 2
> > 
> > > git filter-repo --invert-paths --paths-from-file cleancontext.txt  
> > > Donde el txt posee los archivos nombrados  

*   Finalmente utilizar este comando para "estabilizar" los cambios realizados

> > > git filter-repo --replace-refs delete-no-add

##### Verificación:

*   Correr el siguiente comando

> > > git filter-repo --analyze

*   Podemos comparar lo que quedo a salvo comparando el 'path-all-sizes.txt' viejo y el nuevo. Superficialmente, si ambos poseen el mismo tamaño nada relevante se perdió.
*   Podemos comparar lo que se redujo comparando el 'path-deleted-sizes.txt' viejo y el nuevo. Superficialmente, si el segundo posee menor tamaño que el primero, la reducción tuvo éxito.
*   Podemos comparar el tamaño original del repositorio clonado con el nuevo estado

Antes

Después

Valores Ilustrativos

 

##### Finalización

*   Solamente una vez que se esta seguro de lo realizado, recordar todas las advertencias.
*   Guardar los cambios. Paso definitivo sin vuelta atras.

> > > git push --force

*   El equipo puede volver a clonar el repositorio y retomar rutina.

### Glosario

#### Semantic Versioning  

(SemVer) es un sistema de numeración de versiones utilizado para identificar y comunicar cambios en un software de manera clara y consistente. Se basa en un formato de tres números separados por puntos: MAJOR.MINOR.PATCH.  

Significado de cada componente en este sistema de versionamiento: 

**MAJOR** : Indica cambios incompatibles en la interfaz pública del software. Se incrementa cuando se realizan cambios que rompen la compatibilidad con versiones anteriores y requieren una atención especial por parte de los usuarios. Por ejemplo, cambios que eliminan características existentes, cambian la estructura de datos o modifican la API de manera incompatible. 

**MINOR** : Representa nuevas funcionalidades añadidas de manera retro compatible con versiones anteriores. Se incrementa cuando se agregan características, mejoras o funcionalidades adicionales al software sin romper la compatibilidad con el código existente. Los usuarios pueden beneficiarse de estas nuevas características sin realizar modificaciones importantes en su implementación. 

**PATCH** : Indica correcciones de errores y parches de seguridad. Se incrementa cuando se realizan correcciones de errores, soluciones a problemas de seguridad u otras modificaciones que no introducen cambios en la interfaz pública ni afectan la compatibilidad con versiones anteriores. Estas actualizaciones suelen ser transparentes para los usuarios. 

Además de estos componentes principales, SemVer permite agregar etiquetas opcionales, como pre-releases (-rc.1, -beta.2, etc.) y metadatos (+build123, +sha3456, etc.), para indicar estados especiales o información adicional sobre la versión. 

La adopción de Semantic Versioning ayuda a establecer expectativas claras sobre los cambios en el software, facilita la administración de dependencias y permite a los desarrolladores y usuarios comprender rápidamente el impacto de una actualización en su código. 

Ejemplo de versiones SemVer:

*   1.0.0: Versión inicial estable.
*   1.2.3: Pequeñas correcciones de errores o mejoras.
*   2.0.0: Cambios incompatibles que requieren modificaciones en el código existente. 
*   1.5.0-rc.1: Versión candidata a lanzamiento de la próxima actualización, pero aún en fase de pruebas.
*   1.4.0+build123: Versión con cambios menores y un identificador de compilación específico. 

Es importante seguir las reglas de Semantic Versioning al publicar y utilizar paquetes de software para mantener la consistencia y facilitar la comunicación sobre los cambios en el software a lo largo del tiempo. 

#### GIT - Comandos más utilizados 

**git init:** Inicializa un nuevo repositorio Git en un directorio vacío o existente. 

**git clone \[URL\]:** Clona un repositorio remoto en tu máquina local. 

**git add \[archivos\]:** Agrega cambios al área de preparación (staging) para que estén listos para ser confirmados. 

**git commit -m "\[mensaje\]":** Confirma los cambios en el área de preparación y crea una nueva instantánea en la historia del repositorio. 

**git status:** Muestra el estado de los archivos en el directorio de trabajo y en el área de preparación. 

**git log:** Muestra un registro de los commits en orden cronológico. 

**git pull:** Obtiene los cambios más recientes del repositorio remoto y los fusiona con tu rama actual. 

**git push:** Sube tus cambios locales al repositorio remoto. 

**git branch:** Lista todas las ramas en el repositorio. La rama actual se muestra con un asterisco. 

**git branch –a** : Muestra las ramas locales y remotas. 

**git branch –r:** muestra solo las ramas remotas. 

**git branch \[NOMBRE-NUEVA-RAMA\]:** Crea una rama nueva a partir de la rama actual llamada NOMBRE-NUEVA-RAMA. 

**git branch –m \[NOMBRE-VIEJO\] \[NOMBRE-NUEVO\]:** Renombra una rama 

**git branch –d \[RAMA-A-ELIMINAR\]:** Elimina la rama RAMA-A-ELIMINAR 

**git checkout \[nombre\_rama\]:** Cambia a una rama específica. 

**git checkout –b NOMBRE-NUEVA-RAMA:** Crea una nueva rama a partir de la actual llamada NOMBRE-NUEVA-RAMA y te posiciona en ella. 

**git merge \[rama\]:** Fusiona la rama especificada en la rama actual. 

**git remote -v:** Muestra las URL de los repositorios remotos configurados. 

**git diff:** Muestra las diferencias entre los archivos modificados y los archivos en el último commit. 

**git reset \[archivo\]:** Quita un archivo del área de preparación, pero conserva sus cambios. 

**git reset --hard \[commit\]:** Descarta todos los cambios locales y vuelve al estado de un commit específico. 

**git stash:** Guarda temporalmente los cambios locales en una pila de cambios para que puedas cambiar de rama sin confirmar. 

**git remote add \[nombre\] \[URL\]:** Agrega un nuevo repositorio remoto con un nombre especificado. 

**git rm \[archivo\]:** Elimina un archivo del directorio de trabajo y lo marca para su eliminación en el próximo commit. 

**git tag \[nombre\] \[commit\]:** Crea una etiqueta en un commit específico, generalmente utilizada para marcar versiones. 

**git remote update origin –prune:** Muestra los cambios combinados entre el repo local y el remoto, que se agregó, que cambió y que se eliminó SIN realizar cambios en la copia local. 

**git tag -a \[version\] -m ‘comentario’:** Etiqueta sobre un commit. (Tipo de tag recomendado). 

**git tag \[version\] -lw:** Genera una etiqueta ligera. 

**git tag:** Muestra todos los tags disponibles. 

**git show \[version\]:** muestra la información del tag específico. 

**git tag -a \[version\] \[check sum del commit\]:** Crea un tag sobre un commit existente. 

**git tag -d \[version\]:** Elimina la etiqueta. 

**git push origin –tags:** Envia los tags al repo remoto. (SI no se pushea no se envía automático). 

**git push origin \[version\]:** envía el tag específico al repo remoto. 

**Fin de vida**
---------------

### Objetivo

En esta sección, se muestran fechas de fin de vida y qué versiones tienen soporte de las distintas tecnologías usadas.

Esta información es consultada de [https://endoflife.date/](https://endoflife.date/)


# Página: https://isdocs.grupo.ypf.com/sharepoint.html

[Saltar al contenido principal](#main)

Sharepoint
==========

Plantilla Azure Functions
-------------------------

**Lineamientos**

**Introducción**

El presente documento tiene como propósito brindar información de la plantilla de Azure Functions existente para desarrollar el apartado del backend de un proyecto desarrollado con SPFx, que serán utilizadas en sitios de SharePoint Online en futuros proyectos. Esto quiere decir que será la plantilla de inicio para nuevos proyectos y que estará sujeto a cambios de versiones futuras, o de ser necesario a cambios de estructura para los proyectos que lo requieran.

**Tecnologías de desarrollo y versiones utilizadas**

La versión de Azure Functions Core Tools utilizada en la plantilla es la versión 4, la presente plantilla fue generada desde visual code utilizando la versión de NodeJS 22 LTS.

A continuación, se detallan otros paquetes utilizados en el proyecto con sus respectivas versiones:

**Dependencias:**

*   @azure/functions: "^4.0.0"
*   @microsoft/microsoft-graph-client: "^3.0.7"
*   @pnp/common: "^2.15.0"
*    @pnp/logging: "^4.19.0"
*   @pnp/nodejs: "^4.19.0"
*    @pnp/odata: "^2.15.0"
*   @pnp/queryable: "^4.19.0"
*   @pnp/sp: "^4.19.0"
*   @types/jsonwebtoken: "^9.0.10"
*   @xmldom/xmldom: "^0.9.10"
*   axios: "^1.15.2"
*   https-proxy-agent: "^9.0.0"
*   isomorphic-fetch: "^3.0.0"
*   jsonwebtoken: "^9.0.3"
*   moment: "^2.30.1"
*   node-fetch: "^3.3.2"
*   url: "^0.11.4"

**Dev dependencias:**

*   @types/node: "18.x"
*   azure-functions-core-tools: "^4.x"
*   rimraf: "^5.0.0"
*    typescript: "^5.0.0"
*    npm-run-all: "^4.1.5"

**Estructura y carpetas**

Las carpetas del proyecto se desprenden de la carpeta raíz DESA-AF-TEMPLATE-22222, esta carpeta contiene la estructura de una Azure Function de NodeJS, utilizando model 4.

                          _Estructura y carpetas actuales_

Dentro de la carpeta raíz se encuentra la carpeta **_core_**:

1.      La carpeta **_core_** contiene las carpetas **_datasource_**(a), **_entities_**(b), **_utils_**(c), **_init_**(d), **_pnp_**(e).

a.       La carpeta **_datasource_** contiene las propiedades y métodos necesarios para acceder a un contexto de SharePoint determinado, este contexto se genera utilizando los permisos de aplicaciones previamente generados en el apartado de SharePoint correspondiente, de donde se tomará el Client ID y su Client Secret. Además de generar el Client Fetch correspondiente, en esta carpeta se recomienda agregar una clase DataSource para cada objeto de SharePoint del cual se obtendrá información, por ejemplo, para cada lista de SharePoint que será invocada desde las AF correspondientes.

b.      La carpeta **_entities_** tiene las entidades que se utilizan en la solución, cada lista o biblioteca de SPO debe contener su entidad.

c.       La carpeta **_utils_** contiene todas las clases que se utilizan en toda la solución, clases en común, constantes etc.

d.      La carpeta **init** tiene las clases para organizar las funciones de la solución y para generar la instancia de SPO con los permisos de aplicación correspondientes.

e.       La carpeta **pnp** contiene el archivo concentrador de PnPJS, para centralizar las importaciones y configurar la conexión correspondiente con SPO.

2.      La carpeta **functions** contiene las funciones siguiendo el modelo de programación (Model 4), las funciones de prueba son las siguientes:

a.   La función **SendEmail** contiene la **Azure Function “de prueba”** que construye el contenido de un email de error de prueba y además recibe el objeto Email por parámetros, para enviar una notificación. No necesariamente las notificaciones se deben enviar desde este proyecto, ya que también existe la posibilidad de enviar una notificación desde el proyecto de SPFx, siempre y cuando se utilice MS Graph con un app registration, que tenga el permiso de api de Graph: Mail.Send de tipo aplicación asignado.

b.  La función **CreatePrueba** contiene la **Azure Function “de prueba”** que inserta un elemento de prueba en una lista “Prueba” con los permisos de un app registration, que tenga el permiso de api de SharePoint: Sites.Selected de tipo aplicación asignado.

c.   La función **GetVersion** retorna la versión del empaquetado y los valores        de la conexión con SPO, para verificar que se establezca la comunicación correctamente entre la AF y SPO.

**Lenguaje concentrador**

El lenguaje concentrador utilizado en la solución de plantilla es TypeScript, resumidamente TypeScript es un superconjunto de JavaScript y es el que se utilizara una vez descargada la versión de NodeJS recomendada, la versión de TypeScript puede variar y se podrán instalar las versiones a través del administrador de paquetes “npm”, en si lo que se instalara en la solución es la versión del compilador de TypeScript “tsc” compatible, en la solución de plantilla se utiliza la versión “5”. Es importante aclarar que TypeScript cuenta con un archivo de configuración en la solución “tsconfig.json”, que se encuentra en la raíz de dicha solución, este se utiliza para almacenar las configuraciones del transpilador.

**Gestión de paquetes**

La gestión de paquetes se hace a través de npm que es el gestor de paquetes por defecto de NodeJS, existe una gran cantidad de paquetes que se pueden utilizar para armar los componentes que se requieran, solo se pueden instalar los paquetes que sean compatibles con las versiones que maneja el proyecto para evitar errores.

El archivo de configuración que almacena las versiones de los paquetes es “package.json”, este se encuentra en la raíz de la solución de plantilla, este se actualiza tanto directa como indirectamente, directamente cuando se cambia una versión en el archivo y se ejecuta la instrucción “npm i”, indirectamente cuando se instala un paquete por medio de una instrucción npm i nombre de paquete@versión.

Para consultar los paquetes y versiones utilizadas en la solución ver el apartado ([Tecnologías de desarrollo y versiones utilizadas](https://isdocs.grupo.ypf.com/sharepoint.html#_Tecnolog%C3%ADas_de_desarrollo)) de este documento.

**Pruebas en el desarrollo de la solución**

Modos de prueba

Se puede probar desde Postman, ej.:

Y también desde una solución de SharePoint Framework (ver Documento: YPF - Plantilla SPFx para SharePoint Online).

Referencia de template: [**Aquí**](https://ypf.sharepoint.com/:u:/r/sites/comunicaciones-desa/isdocs/YLite/Pages/documents/shp/DESA-AF-TEMPLATE-22222.zip?csf=1&web=1&e=5Kjrk4)

Plantilla SPFx para SharePoint Online
-------------------------------------

**Lineamientos**

#### **Introducción**

El presente documento tiene como propósito brindar información de las plantillas existentes para desarrollar componentes con SPFx, que serán utilizarlos en sitios de SharePoint Online en futuros proyectos. Esto quiere decir que será utilizada al iniciar nuevos proyectos y que estará sujeto a cambios de versiones futuras, o de ser necesario a cambios de estructura para los proyectos que lo requieran.

#### **Tecnologías de desarrollo y versiones utilizadas**  

La versión de SharePoint Framework utilizada en la plantilla es la 1.22.2, la versión de NodeJS recomendada para la versión SharePoint Framework antes mencionada es la versión 22.22.2, para más información consultar los accesos oficiales del apartado de [Prerrequisitos](https://dev.azure.com/Azure-DevOps-YPF-I/DESA-SHP-TEMPLATE/_git/DESA-SHP-TEMPLATE-18180?path=/README.md&version=GBDevelop&_a=preview&anchor=prerequisites) del archivo Readme del proyecto en cuestión.

A continuación, se detallan otros paquetes utilizados en el proyecto con sus respectivas versiones:

**Dependencias:**

*   @fluentui/react: "^8.106.4"
*   @microsoft/sp-component-base: "1.22.2"
*   @microsoft/sp-core-library: "1.22.2"
*   @microsoft/sp-lodash-subset: "1.22.2"
*   @microsoft/sp-office-ui-fabric-core: "1.22.2"
*   @microsoft/sp-property-pane: "1.22.2"
*   @microsoft/sp-webpart-base: "1.22.2"
*   @pnp/common: "2.15.0"
*   @pnp/graph: "4.18.0"
*   @pnp/logging: "4.18.0"
*   @pnp/nodejs: "4.18.0"
*   @pnp/odata: "2.15.0"
*   @pnp/sp: "4.18.0"
*   @pnp/sp-addinhelpers: "2.15.0"
*   dompurify: "3.3.3"
*   file-loader: "6.2.0"
*   moment: "2.30.1"
*   react: "17.0.1"
*   react-dom: "17.0.1"
*   tslib: "2.3.1"

**Dev Dependencias:**

*   @microsoft/eslint-config-spfx: "1.22.2"
*   @microsoft/eslint-plugin-spfx: "1.22.2"
*   @microsoft/sp-module-interfaces: "1.22.2"
*   @microsoft/spfx-heft-plugins: "1.22.2"
*   @microsoft/spfx-web-build-rig: "1.22.2"
*   @rushstack/eslint-config: "4.5.2"
*   @rushstack/heft: "1.1.2"
*   @types/heft-jest: "1.0.2"
*   @types/react: "17.0.45"
*   @types/react-dom: "17.0.17"
*   @types/webpack-env: "~1.15.2"
*   @typescript-eslint/eslint-plugin: "8.46.2"
*   @typescript-eslint/parser: "8.46.2"
*   ajv: "8.18.0"
*   css-loader: "~7.1.2"
*   eslint: "8.57.1"
*   eslint-plugin-react-hooks: "4.3.0"
*   typescript: "~5.8.0"

#### **Estructura y carpetas**

La capeta principal del proyecto “DESA-SHP-TEMPLATE-22222, contiene varias subcarpetas que se autogeneran en la creación del proyecto, en este apartado se comentaran las carpetas que se desprenden de la carpeta src. Si bien la carpeta src se genera automáticamente cuando se crea un proyecto, por medio de la instrucción “yo @microsoft/sharepoint” y siguiendo los pasos correspondientes para generar un componente (client-side de tipo “WebPart” y el template de webpart utilizado es “React”), las carpetas que están dentro de src son las que utilizamos para estructurar el proyecto.

                                                         _Estructura y carpetas actuales_

Dentro de la carpeta src se encuentra la carpeta **_core_**(1) y la carpeta **_webparts_**(2):

1.      La carpeta **_core_** contiene las carpetas **_actions_**(a), **_api_**(b), **_azure_**(c), **_entities_**(d), **_pnp_**(e), **_ui_** (f) y **_utils_**(g) que centralizan el desarrollo que comparte cada webpart del proyecto.

a.       La carpeta **_actions_** contiene las propiedades y acciones de mensajes que utiliza la instancia Observable, esta se usa para invocar acciones en un evento determinado.

b.      La carpeta **_api_** contiene todas las clases que intervienen en la instancia Datasource, la cual contiene 5 métodos iniciales: obtener elementos, añadir un elemento, editar un elemento, eliminar un elemento y obtener un elemento. Particularmente cada método se nutre de consultas en pnp.js que utiliza el contexto actual de una determinada webpart. PnP.js es una colección de bibliotecas que se utilizan para consumir las API REST de SharePoint y Office 365 de forma segura.

Adicionalmente este Datasource también cuenta con una llamada a una Azure Functions de prueba (que invoca un proyecto backend con funciones de prueba de Azure), para que esto sea posible se utiliza una conexión desde las clases que contine la carpeta azure. (Ver detalles en el punto c)

c.       La carpeta **_azure_** cuenta con las clases necesarias para conectar con Azure Functions, por lo que es opcional en el proyecto, ya que, si el mismo no requiere una instancia de backend con Azure Functions, no es necesario utilizarla. Tener en cuenta que esto es una prueba, en el caso del envió de mail no es necesario que se tenga que realizar desde una AF, también se puede enviar mails desde el proyecto de SPFx con MS Graph, tener en cuenta que para hacer esto posible se debe contar con un app registration, que tenga el permisos de api de SharePoint: “Sites.Selected” de tipo aplicación.

La intención de la plantilla es demostrar la posibilidad de usar un backend externo (azure function), para poder probar un caso sencillo de uso de permisos de aplicación, que está disponible en SharePoint y se puede utilizar para operar en una lista o una librería determinada, utilizando los permisos de un app registration determinado.

Un ejemplo sencillo para esto sería, para que un usuario determinado que solo tiene permisos de lectura en un sitio en concreto pueda por ejemplo insertar, editar o eliminar elementos desde una webpart.

En caso de utilizar la carpeta azure, ver el documento “YPF - Plantilla Azure Functions”, el cual contendrá los detalles de la plantilla que contiene las Azure Functions con NodeJS, utilizadas para realizar las pruebas de la estructura propuesta.

d.      La carpeta **_entities_** tiene las entidades que se utilizan en la solución.

e.       La carpeta **_pnp_** contiene una clase que centraliza las importaciones y genera el contexto de una webpart determinada, siguiendo los lineamientos de las nuevas versiones de PnP.js

f.        La carpeta **_ui_** contiene todos los componentes de prueba utilizados en la solución, la plantilla cuenta con componentes FluentUI, que es el framework oficial utilizado por Microsoft 365. También en esta carpeta se alojan las hojas de estilos, las fuentes y las imágenes utilizadas en dichos componentes.

g.       La carpeta **_utils_** contiene todas las clases que se utilizan en toda la solución, clases en común, constantes etc.

2.      En la carpeta **_webparts_** se van alojando todas las webpart que se creen en la solución, la idea es que las webparts consuman la carpeta core para tomar los componentes en común, contexto de SPO, Datasource etc.

#### **Lenguaje concentrador**

El lenguaje concentrador utilizado en la solución de plantilla es TypeScript, resumidamente TypeScript es un superconjunto de JavaScript y es el que se utilizara una vez descargada la versión de NodeJS recomendada, la versión de TypeScript puede variar y se podrán instalar las versiones a través del administrador de paquetes “npm”, en si lo que se instalara en la solución es la versión del compilador de TypeScript “tsc”, en la solución de plantilla se utiliza la versión “5.8.0” recomendada por MS. Es importante aclarar que TypeScript cuenta con un archivo de configuración en la solución “tsconfig.json”, que se encuentra en la raíz de dicha solución, este se utiliza para almacenar las configuraciones del transpilador.

#### **Gestión de paquetes**

La gestión de paquetes se hace a través de npm que es el gestor de paquetes por defecto de NodeJS, existe una gran cantidad de paquetes que se pueden utilizar para armar los componentes que se requieran, solo se pueden instalar los paquetes que sean compatibles con las versiones que maneja el proyecto para evitar errores.

El archivo de configuración que almacena las versiones de los paquetes es “package.json”, este se encuentra en la raíz de la solución de plantilla, este se actualiza tanto directa como indirectamente, directamente cuando se cambia una versión en el archivo y se ejecuta la instrucción “npm i”, indirectamente cuando se instala un paquete por medio de una instrucción npm i nombre de paquete@versión.

Para consultar los paquetes y versiones utilizadas en la solución ver el apartado ([Tecnologías de desarrollo y versiones utilizadas](https://isdocs.grupo.ypf.com/sharepoint.html#_Tecnolog%C3%ADas_de_desarrollo)) de este documento.

**Pruebas en el desarrollo de la solución** 

#### **Modos de prueba**

Las pruebas de la solución de plantilla SPFx se realizaron por medio de SharePoint Workbench, el cual inicia un Service local y por medio de la siguiente url /\_layouts/15/workbench.aspx se puede asociar a un contexto de un sitio de SharePoint determinado.

Para iniciar SharePoint Workbench desde el terminal de visual code, ejecutar “npm run start”, de este modo se ejecutará la instrucción de la sección Scripts del archivo “package.json”, que internamente realizará la tarea “heft start –clean --nobrowser”. Una vez ejecutado se agrega la url antes mencionada en un sitio determinado, para poder utilizar el contexto que se requiera, por ejemplo, un sitio con una lista de Prueba.

Adicionalmente existen otros modos de prueba/ejecución, que se pueden configurar para el apartado de Run and Debug de Visual Studio Code, dentro del archivo: .vcode/launch.json y generando las tareas que sean necesarias.

Se da por supuesto, que para poder probar las plantilla se debe contar con un entorno preparado, donde este instalada previamente la versión de NodeJS recomendada y luego de descargar el proyecto, tenga descargado todos los módulos requeridos (npm i).

#### **Webparts de prueba**

Las WebParts de pruebas utilizan una clase ItemMock que carga elementos de prueba, para utilizar el Datasource con datos de una lista, se recomienda generar una lista de Prueba en el sitio donde se encuentre probando la solución de plantilla SPFx.

Ej. de webpart con operaciones ABM:

Ej. webpart con listado

Referencia de template:  [**Aquí**](https://ypf.sharepoint.com/:u:/r/sites/comunicaciones-desa/isdocs/YLite/Pages/documents/shp/DESA-SHP-TEMPLATE-22222.zip?csf=1&web=1&e=xmxwiQ "DESA-SHP-TEMPLATE-NEW")


# Página: https://isdocs.grupo.ypf.com/portales.html

[Saltar al contenido principal](#main)

Portales
========

[

FAQ Portales
------------



](portales-faq.html)

[

Lineamientos
------------



](portales-lineamientos.html)

[

Accesibilidad
-------------



](portales-accesibilidad.html)


# Página: https://isdocs.grupo.ypf.com/apis.html

[Saltar al contenido principal](#main)

Diseño de APIs
==============

Introducción
------------

Este documento tiene por objeto plasmar principios de diseño para creación de APIs con estilo REST.

REST (representational state transfer) es independiente de cualquier protocolo y no está necesariamente vinculado a HTTP. Sin embargo, las implementaciones REST más comunes usan HTTP como protocolo y esta guía se centra en el diseño de API REST con HTTP.

Una ventaja de REST con HTTP es que utiliza estándares abiertos y no vincula la implementación de la API o aplicación cliente a ninguna implementación específica. Por ejemplo, un servicio web REST podría escribirse en .NET, y las aplicaciones cliente pueden usar cualquier lenguaje o herramienta que pueda generar solicitudes HTTP y analizar sus respuestas.

**Diseño REST**

Las API REST están orientadas a recursos, estos pueden ser cualquier tipo de objeto, datos o servicio al que se accede desde un cliente. Un recurso es una URI que identifica de forma exclusiva el mismo.  
Desde un cliente se interactúa con un servicio intercambiando datos, si bien el formato de representación no es rígido, JSON es el estándar.  
Las API REST se basan en el uso de verbos (o métodos) HTTP estándar para realizar operaciones.  
El buen uso de los métodos HTTP es importante para aprovechar la arquitectura REST, pues mediante los mismos le indicamos al servicio la forma en que se debe tratar una determinada petición, es decir, una misma URL puede ser tratada de forma diferente por el servicio. Si bien los verbos más comunes son GET, POST, PUT, y DELETE a continuación me muestra la lista completa:

*   GET: Es utilizado únicamente para obtener información del servidor, parecido a realizar un SELECT de una base de datos. No soporta el envío del payload.
*   POST: Es utilizado para la creación de un nuevo registro, algo que no existía previamente, es equivalente a realizar un INSERT en la base de datos. Soporta el envío del payload.
*   PUT: Se utiliza para actualizar por completo un registro existente, es parecido a realizar un UPDATE a la base de datos. Soporta el envío del payload.
*   PATCH: Este método es similar al método PUT, ya que permite actualizar un registro existente, sin embargo, se utiliza cuando se requiere actualizar solo un fragmento del registro y no en su totalidad, es equivalente a realizar un UPDATE a la base de datos. Soporta el envío del payload.
*   DELETE: Este método se utiliza para eliminar un registro existente, es similar a DELETE a la base de datos. No soporta el envío del payload.
*   HEAD: Este método se utilizar para obtener información sobre un determinado recurso sin retornar el registro. Es similar a una petición GET, pero sin el cuerpo de la respuesta.

Hasta aquí los métodos más utilizados en la construcción de servicios REST, sin embargo, existen otros métodos interesantes, pero que no se ven al momento de depurar o analizar el tráfico de red.

*   CONNECT: Se utiliza para establecer una comunicación bidireccional con el servidor. En la práctica no es necesario ejecutarlo.
*   OPTIONS: Este método es utilizado para obtener las opciones de comunicación para el recurso destino. Es muy utilizado con CORS (Cross-Origin Resource Sharing) para validar si el servidor acepta peticiones de diferentes orígenes.

**Sustantivos**
---------------

Al escribir código, se acostumbra a nombrar los métodos con verbos que describen su funcionalidad. Por ejemplo, una función que regresa un objeto con todos los usuarios llevaría el nombre de get\_users o getUsers.  Esto está bien en el código. Pero en las URLs NO es una buena práctica. Supongamos que necesitamos un API en donde nos retorna un JSON con todos los usuarios disponibles, aplicando una mala práctica lo primero que parecería correcto es crear una URL así:  
/getUsers  
De igual manera, si llegamos a necesitar más URLs para crear, editar, borrar u obtener la información de uno en específico, quedaría algo parecido a esto:  
/getUsers    /createUser     /editUser    /deleteUser    /getUser/:id  
Con el avance del proyecto esto puede tornarse pesado. Una mejor solución es mantener sólo 2 URLs base por recurso. De esta manera quedan así:  
/users  y  /users/:id  
Lo importante es no usar verbos y enfocarnos en los sustantivos que describen cada recurso. Ahora, para operar sobre nuestro recurso podemos usar los verbos HTTP. Un CRUD (Create-Read-Update-Delete) puede ser representado por los verbos POST, GET, PUT y DELETE.  Continuando con el ejemplo y teniendo únicamente 2 URLs base, podemos realizar las mismas acciones de una manera más intuitiva:

**Recurso**

**GET**

**POST**

**PUT**

**DELETE**

**/users**

Retorna todos los usuarios

Crea un nuevo usuario

Actualiza todos los usuarios

Borra todos los usuarios

**/users/1**

Retorna el usuario con id 1

\-

Actualiza el usuario con id 1

Borra el usuario con id 1

Cuando se elige el nombre del recurso, es mejor usar nombres concretos que definan a nuestras entidades en lugar de alguna abstracción. Por ej. si tenemos que exponer artículos, videos o tweets, sería una mala idea escribir una URL del tipo /items o /content, ya que se trata de sustantivos bastante abstractos y no indican claramente qué tipo de recurso se está consumiendo. Pero si configuramos URLs como /posts, /videos, /tweets, rápidamente se entiende de qué se trata cada una. Una recomendación adicional sería manejar el plural en las entidades.

**Relaciones entre recursos**
-----------------------------

Hasta ahora, estas recomendaciones son en referencia a un recurso, pero existen casos en donde los recursos se relacionan entre sí. Si queremos construir una URL para obtener los roles de un usuario quedaría algo así:  
/users/:id/roles  
Como se puede observar, esta URL sigue la recomendación de mantener nuestra API intuitiva y en general para relaciones entre recursos, se podría definir una regla simple que nos será útil a la hora de diseñar: la profundidad máxima debería ser hasta 2 niveles, es decir, recurso-identificador-recurso:  
/recurso/:id/recurso  
Si se necesita más filtro, puede resolverse haciendo uso de parámetros por medio de '?'.  
/users/:id/roles/?type=:type  
En casos más complejos podría parecer correcto proporcionar una URI que permita navegar a través de varios niveles, como por ej.:  
/clients/1/orders/99/products  
Sin embargo, con esta profundidad de niveles resulta difícil mantener y poco flexible si las relaciones entre los recursos cambian en un futuro.   
La consulta anterior se puede reemplazar con 2 accesos, uno para encontrar pedidos para el cliente 1, y luego buscar los productos para ese pedido:

1\.    /clients/1/orders  
2\.    /orders/99/products

**Versionado**
--------------

Que la API cuente con una versión y mantenerla siempre a la vista en las peticiones es una buena práctica. Por ejemplo, Facebook en su Graph API mantiene la versión en la URL así:  
https://graph.facebook.com/v2/me  
Por lo general, estamos acostumbrados a versionar así: 0.0.0 . Pero para URLs es recomendable mantener la versión en el más alto nivel. Por otro lado, cuando se libera una nueva versión de nuestra API no podemos simplemente sustituir a la versión existente y olvidar que hay clientes usando la versión vieja.  Mantener al menos una versión anterior a la más actual, es siempre una buena práctica.

**Respuestas y códigos de error**
---------------------------------

Cada solicitud del cliente y respuesta del lado del servidor es un mensaje, y en un ecosistema REST ideal estos mensajes deben ser descriptivos. Una buena respuesta puede ayudar a los usuarios a depurar y corregir la forma en que usan el producto. Para una API adecuar los errores a códigos de respuesta HTTP estándar es una buena práctica. Si bien hay muchos códigos de respuesta, se pueden agrupar en 3 categorías:

*   La aplicación cliente hizo una petición en forma errónea -> código de respuesta 4xx
*   La API se encontró con algún error grave -> código de respuesta 5xx
*   Cliente y API funcionaron correctamente -> código de respuesta 2xx

Proporcionar información adicional en los casos con códigos de error es recomendable para que el usuario sepa como subsanarlo. Cada empresa trata de definir su propia filosofía de respuesta a errores, pero la estructura común consiste en tres criterios básicos para que sea útil:

*   El código de retorno HTTP, de modo que el ámbito del problema se pueda determinar con facilidad. Por ejemplo, si el error es 5xx significa que es un problema del servidor, mientras que 4xx significa que el cliente hizo mal la invocación.
*   Un ID de referencia interna para poder darle seguimiento.
*   Mensajes descriptivos que resuman el contexto, la causa y la solución general del error en cuestión.

Ejemplos:

_Simple_

Detallado

A continuación, el subconjunto de códigos que se aplican generalmente:

Código de respuesta HTTP

Significado

**200 Ok**

Operación exitosa

**201 Created**

Creación exitosa de algún recurso

**204 No Content**

Borrado exitoso de algún recurso

**400 Bad Request**

Parámetros o cuerpo de la solicitud no corresponde con lo que la API espera

**401 Unauthorized**

El cliente no está autenticado, normalmente esto implica que está faltando el envío de un token o que el mismo expiro

**403 Forbidden**

El cliente no está autorizado

**404 Not Found**

El recurso no se encontró

**405 Method Not Allowed**

La api no está preparada para el verbo o método con el que se la invoco

**409 Conflict**

Se intento crear un recurso que ya existe

**500 Internal Server Error**

La ejecución de la API fallo

**Seguridad**
-------------

La seguridad tiene que estar siempre en cualquier proyecto de desarrollo de APIs. Hay varias formas de securizarlas, por ejemplo, autenticación básica, OAuth, etc., pero algo condicionante es que no deben tener estado, por lo que la autenticación / autorización no debe depender de cookies o sesiones. Lo correcto es que cada solicitud vaya con alguna credencial en el encabezado para que pueda validarse en el servidor. Hay dos conceptos para aclarar:

*   Autenticación: Implica verificar quién es la persona. Esto es validar un usuario / contraseña o validar que un token esté firmado y no haya caducado. La autenticación no dice que esta persona pueda acceder a un recurso en particular.
*   Autorización: Implica verificar recursos a los que el usuario está autorizado para acceder (o modificar) a través de roles.

Si bien la autenticación básica es buena para la mayoría de las API y bien implementada es segura, es recomendable considerar OAuth y JWT. Los JWT (Json Web Token) son una forma estándar para representar la identidad de un usuario, es decir, cuando dos sistemas intercambian datos puede utilizar un JWT como identificación sin tener que enviar credenciales personales en cada solicitud.

En YPF el proveedor de identidades para las aplicaciones en la nube es Azure Active Directory (Azure AD), que usa OAuth 2.0 para permitir autorizar el acceso a aplicaciones web y APIs.

Azure AD se divide en organizaciones y dominios (tenants), en los cuales se registran usuarios y aplicaciones. Cuando un usuario se autentica en Azure AD obtiene como respuesta un JWT que contiene información (claims). Los claims consisten en un formato clave-valor, conteniendo por ej.:

*   la fecha en que se generó el token
*   datos del usuario
*   la audiencia, que es la aplicación para la que se generó el token
*   la aplicación (el cliente) que solicitó el token. En general, este dato puede ser el mismo que audiencia

El JWT está firmado por el Servidor de token de seguridad (STS) con una clave privada, para validar un token, la aplicación de APIs lo verifica utilizando la clave pública. Por lo general, el STS proporciona un par de tokens: un token de acceso para acceder a la aplicación o recurso, y un token de refresco usado para actualizar el token de acceso cuando el mismo está a punto de expirar, ya que solo son válidos por un período de tiempo (por defecto 1 hora).

**Herramientas**
----------------

Como el diseño es probablemente uno de los aspectos más importantes del ciclo de vida de la API, el mismo requiere una herramienta adecuada. El editor OpenAPI de Swagger [https://swagger.io/tools/swagger-editor/](https://swagger.io/tools/swagger-editor/) puede ser una manera de comenzar el proceso, ya que ofrece una serie de características que ayuda a diseñar las interfaces.

El editor funciona en cualquier entorno, ya sea localmente o en la web, permite validar sintaxis mientras se escribe, y además se puede visualizar e interactuar con las APIs mientras se definen.

Si se desea diseñar en un entorno colaborativo, también se puede usar SwaggerHub. SwaggerHub [https://swagger.io/tools/swaggerhub/](https://swagger.io/tools/swaggerhub/) es una plataforma de desarrollo de API para que el equipo diseñe API de manera consistente y estandarizada.

**Plantilla Web**
-----------------

Ingeniería de Software dispone de una plantilla de proyecto para nuevos desarrollos de APIs realizado en .Net Core, con el objeto de minimizar el trabajo inicial que implica y además de normalizar la estructura de estos para que todos estén similares. La idea es que se pueda reutilizar haciendo las adecuaciones que correspondan. En el ejemplo se incluyen la administración de usuarios y roles para que el cliente disponga todas las operaciones posibles:

Página de inicio conteniendo documentación swagger

Operaciones disponibles para manejo de usuarios

**Trazabilidad e identificación en solicitudes**
------------------------------------------------

Con el objeto de poder realizar un seguimiento de solicitudes desde frontend hasta backend y los servicios que desde aquí se consuman, la recomendación es generar un identificador en el encabezado para que en los casos de error principalmente, en los subsecuentes accesos cada backend vaya pasando este dato para luego se pueda rastrear e identificar con exactitud el detalle del problema. La definición del nombre de este encabezado debe ser:

CorrelationId: \[GUID\]

El GUID (en inglés: globally unique identifier) es un identificador único global y representa un número aleatorio usado en aplicaciones de software. El GUID es una implementación de Microsoft de un estándar llamado universally unique identifier, especificado por la Open Software Foundation. Es esencialmente un número de 16 bytes.

También para los casos de APIs con alguna funcionalidad común a diferentes aplicaciones (las categorizadas como microservicios por ej.) se recomienda agregar en el encabezado de la solicitud un identificador de la aplicación. LA definición del nombre para este encabezado deber ser:

ApplicacionId: \[Nombre sacado del mapa\] 

**API2API**

### **Introducción**

Debido a la tendencia de uso de APIs en el ultimo tiempo, surgen algunos problemas que involucran tanto a dueños de APIs como a consumidores,

algunos de estos son:

*   Segurización.
*   Documentación.
*    Escalabilidad.
*   Versionado y evolución.

### La problemática hoy

*   No hay visibilidad
    *   Si le preguntamos a todos los que tienen una API o Servicio, casi ninguno podría contestar estas preguntas.
    *   ¿Desde qué aplicación se consumen los servicios?
    *   ¿Quién está consumiendo un servicio?
    *   Hoy no sabemos qué aplicación consume un servicio o quién consume las aplicaciones.
*   Necesidad de fijar un lineamiento claro
    *   No hay definidos mecanismos de autenticación y/o autorización como lineamiento estándar para todos.
    *   OIDC? IWA? SAML? -- ¿Cuándo? ¿cómo?
*   No se traslada la identidad de las personas a través de las llamadas.
    *   Hoy los servicios son de ejecución anónima; ejecutan con un usuario de servicio y los id de red se pasan como parámetro en el método a ejecutar.
    *   Esto hace que la seguridad de los mismos no sea robusta.
*   No se tiene la capacidad de gestionar la autorización de manera eficiente y robusta.
    *   Los desarrollos validan si el id de red pertenece a un grupo de AD para saber el Rol.
    *   Para esto las aplicaciones consultan al AD en busca de los grupos del usuario.
    *   Sumando al punto anterior, en los servicios anónimos la consulta se realiza teniendo en cuenta el id de red pasado por parámetro.
*   Problemas de Gobierno.
    *   No se monitorea, lo que impide auditar o supervisar el uso de las aplicaciones o servicios y la explotación de métricas

#### **¿Qué tenemos hoy?**

#### **¿Qué teníamos hasta hace poco?**

Hasta no hace mucho, las aplicaciones autenticaban con el mismo IIS.  
La seguridad integrada de Windows proporciona una buena interacción con el usuario pero se complica a la hora de realizar llamadas a servicios.  
Estas llamadas resultaban en llamadas anónimas o por medio de usuarios de servicio.

### ¿Cómo funciona OIDC?

1.  El usuario accede a la aplicación
2.  El usuario es redirigido al login de AzureAD
3.  El usuario carga su login. (ej: RY13578@grupo.ypf.com)
4.  El usuario es redirigido al STS de YPF.
5.  El usuario carga su login y password (en general el login ya está cargado)
6.  Si está todo OK, el usuario es redirigido al login de AzureAD para que este genere el token OIDC.
7.  El usuario es redirigido a la aplicación con un token OIDC ya generado.
8.  La aplicación solicita un token para consumir un servicio.
9.  La aplicación llama al servicio pasando el token otorgado.
10.  El servicio valida el token.

### ¿Cómo funciona SAML?

1.  El usuario accede a la aplicación
2.  El usuario es redirigido a SSOFED.ypf.com
3.  El usuario es redirigido a SSOAUT.ypf.com
4.  El usuario carga su login y password
5.  Si está todo OK, el usuario es redirigido a SSOFED.ypf.com 
6.  El usuario es redirigido a la aplicación con los atributos del usuario y las cookies de SAML

**¿En qué se basa el API2API?**

#### OIC != API2API \[ OAUth2 \]

Son cosas distintas

Primero que nada, OpenID Connect extiende de OAuth 2.0.

    OpenID Connect brinda autenticación de usuario y funcionalidad de inicio de sesión único (SSO)

    OAuth2 proporciona la autorización, seguridad del API a través de tokens de acceso.

    El API2API es la implementación del OAuth2 con el OIDC en YPF para las aplicaciones y APIs.

La idea con esto es que todas las APIs y Aplicaciones estén segurizadas con OIDC.

#### API2API se apoya en OIDC

Decimos que API2API se apoya OIDC porque la configuración de Roles y Permisos aplicado a los servicios y aplicaciones es manejado directamente desde el IDP. (Identity Provider) en este caso el AzureAD.

También se apoya en AppInsights para poder obtener la traza.

#### ¿Por qué OIDC y no SAML?

Si bien existe una forma de hacer que las APIs Rest desarrolladas puedan aceptar SAML, vimos que los desarrollos se tornan demasiado complejos; poniendo muchísimo foco en cómo hacer la integración en lugar de poner foco en cómo resolver las funcionalidades.

Además no vimos la forma de integrar con otros servicios externos de manera estándar y sencilla.

### ¿Cómo funciona API2API?

1.  El usuario accede a la aplicación
2.  El usuario realiza toda la parte de OIDC
3.  Cuando el usuario quiere consumir un servicio, debe solicitar un token para ello. Este token lo solicita la aplicación a AzureAD en nombre del usuario.
4.  La aplicación realiza la llamada al servicio con el token generado a su nombre (en el punto anterior)
5.  El servicio valida que el token generado sea válido.

#### **¿API2API qué nos provee?**

Nos provee poder armar mapas de interfaces

\- Quién consume a quién

Podemos sacar métricas de uso detallado con queries a los AppInsights

### **Qué resuelve el OIDC y el API2API**

#### Visibilidad

\- Permite fácilmente conocer qué aplicaciones consumen los servicios.

\- Se pueden realizar consultas a los AppInsights para conocer quienes consumen los servicios y aplicaciones.

#### Lineamiento Claro

\- Al definir cómo queremos que las aplicaciones y Apis se comuniquen entre sí, se fija un lineamiento claro para todos.

\-

#### Mantener la identidad de las personas a través de las llamadas

\- Los servicios dejan de ser anónimos; si o si requieren una identidad para ser ejecutados.

Estas identidades pueden ser tanto de Usuario como de Aplicación (JOBs)

\- No es necesario pasar el usuario por parámetro, pues se puede obtener desde el token

\- Por esta razón, la seguridad es más robusta.

#### Gestionar la autorización de manera eficiente y robusta

\- El rol o roles, vienen definidos en el token y no es necesario realizar una consulta al AD para conocer a cual o cuales grupos pertenece.

#### Mejor Gobierno

\- Al tener las aplicaciones y APIs cargadas en el AzureAD y con Insight, se pueden sacar métricas y armar mapas de uso.


# Página: https://isdocs.grupo.ypf.com/gis.html

[Saltar al contenido principal](#main)

GIS
===

Lineamientos de datos (GDB)
---------------------------

### **Documentación estándares Datos GIS**

**Bases de Datos:**

Las bases de datos utilizadas pueden ser Oracle o SQL Server. En cloud para el caso de Oracle se aloja sobre un IaaS y en el caso de SQL Server sobre un RDS.  
Sobre la base de datos se instala un componente ESRI llamado SDE, que agrega a la base de datos standard, los componentes que permiten administrar datos geográficos desde las herramientas ESRI. Esto genera un esquema en la base llamado SDE y muchos elementos como tablas, vistas, stored procedures, índices que son administrados por SDE y no pueden ser modificados por fuera de las herramientas ESRI.  
Normalmente se genera una base por cada proyecto, con toda la información específica del proyecto.  

#### **Distintos elementos en la GeoDatabase:**

Dentro de la estructura de la base se generan:  
**DataSets:** Los mismos permiten agrupar datos geográficos que tengan un mismo criterio. Lógica de negocio, sistema de referencia y proyección cartográfica. El nombre del mismo identifica al grupo. **El criterio para nomenclar es utilizar un nombre que sea descriptivo del contenido del mismo.** Ejemplo en las capturas: Loop y Censo contienen información de distintas fuentes.

Layers o Feature Class: Son capas de datos que se almacenan como tablas pero que contienen una columna “geometry” donde se gestiona la representación geográfica del elemento. **Su nomenclatura comienza con Lyr\_ (SQL Server) o FC\_ (Oracle).**

*   **POINT:** Cada registro representa un punto y se almacena como un par de coordenadas (LAT, LONG). Ejemplo: representa la ubicación de un pozo o una estación de servicio.
*   **LINE:** Cada registro representa una línea y se almacena como una lista de ordenada de puntos. Posee longitud. Ejemplo: representa un ducto o un camino.
*   **POLYGON:** Cada registro representa un área y se almacena como una lista de ordenada de puntos cuyo primer y último punto coinciden. Posee área y perímetro. Ejemplo: representa un área de concesión.

**Tablas:** Son tablas de datos complementarios a los Layers, las mismas deben estar registradas en el esquema para poder ser publicadas en los servicios de ArcGIS Server. **Su nomenclatura comienza siempre con Tbl\_**

**Vistas:** Son vistas que permiten unir Layers con Tablas y de esa manera se pueden exponer en los servicios datos desnormalizados para facilitar el consumo desde las aplicaciones. Pueden ser vistas geográficas o normales. **Su nomenclatura comienza siempre con VW\_**

#### **Estandarización de los nombres de los elementos en la GeoDatabase:**

A continuación, se describen pautas básicas de nomenclatura de los objetos posibles de encontrar dentro de una base de datos geográfica (features class, tablas, vistas geográficas, vistas normales, etc.).  
Algunos puntos para tener en cuenta:

*   Los nombres de las entidades, procedimientos, etc. deben de perdurar a lo largo de la vida del software, esto es, desde la etapa de concepción hasta la de implementación y mantenimiento.
*   Los nombres deben ser mnemotécnicos y descriptivos, relacionados con los nombres de las entidades del mundo real, siempre que las restricciones técnicas no nos lo impidan.
*   No deben usarse caracteres acentuados, eñes, ni palabras reservadas por el motor de base de datos.
*   Se debe utilizar para nomenclar a los elementos de la base la notación CamelCase. Ejemplo: “FC\_PozosPropuestos”.
*   Las dos primer letras identifican el tipo de elemento:
    1.  FC\_: Feature Class
    2.  VW\_FC\_: Vista Geográfica
    3.  VW\_: Vista Standard
    4.  TBL\_: Tabla

**_Feature Class:_**  
Los feature Class se deben nomenclar de la siguiente manera:

Siempre Comienzan con “FC\_” + El nombre mnemotécnico de la entidad que almacenan.

Las tablas de los Features Class SIEMPRE tienen una columna “OBJECTID”, la misma NO puede modificarse ni eliminarse. La misma es administrada por el esquema SDE.

_Agregar comentario Columna Shape_

**Es muy iImportante** diferenciar las tablas normales “TBL\_” de base de datos, de tablas “FC\_” que almacenan datos geográficos, ya que **las mismas NO pueden ser administradas ni modificadas desde el software de administración de la base de datos.**

Desde el software de administración de la base de datos, tanto las “FC\_” como las “TBL\_” se visualizan de la misma manera.

Es muy importante entender que se administran desde distintos productos.  

    

 

 

**FC\_Terminal** ValoracionCompetencia

 

 

«PK» **OBJECTID**

SHAPE

«PK» **IdTerminal**

 Competencia **Codigo**

**Valor**

178

POINT34

 567

TMMC

8

**_Vista Geográfica:_**  
Las vistas geográficas se deben nomenclar de la siguiente manera:

Siempre Comienzan con “VW\_” + “FC\_” + El nombre de FC que utiliza la vista. En el caso de ser una vista que genera un nuevo dato y/o totaliza valores de uno o varios FC, entonces tendrá un nuevo nombre que represente al resultado de la vista.  

    

 

 

VW\_FC\_TerminalBuenosAiresValoracionCompetencia

 

 

«PK» **OBJECTID** IdEmpleado

«PK» **SHAPE** IdCompetencia

«PK» **IdTerminal** Nombre

Competencia **Codigo**

**Valor**

178

POINT34

567Pérez

TMMCProgr. TSQL

8

**_Vista Standard:_**  
Las vistas normales se deben nomenclar de la siguiente manera:

Siempre Comienzan con “VW\_” + El nombre de la tabla o tablas que utiliza la vista. En el caso de ser una vista que genera un nuevo dato y/o totaliza valores de uno o varias tablas, entonces tendrá un nuevo nombre que represente al resultado de la vista.  

 

VW\_RepresentanteCantProductosProveedor

 

«PK» IdProveedor

 CantidadProductos

234

567

2354

235

2364

 678

**_Tablas normales:_**

Las tablas se deben nomenclar de la siguiente manera:

Siempre Comienzan con “TBL\_” + El nombre mnemotécnico de la entidad que almacenan.

Desde el software de administración de la base de datos, tanto las “FC\_” como las “TBL\_” se visualizan de la misma manera.

Es muy importante entender que se administran desde distintos productos.

Si una “TBL\_” tiene creado un campo “OBJECTID”, significa que la misma ha sido registrada desde ArcCatalog y debe administrarse desde ese producto.  

 

TBL\_ZonasComercialesProveedor

 

«PK» IdZona

Nombre

1

CABA

**Criterios adicionales a tener en cuenta:**

**_Campos que se gestionan vía SDE y no pueden gestionarse a mano:_**

*   Completar: 
*   OBJECT\_ID
*   SHAPE
*   Campos de tracking editor
*   M, Z …..

**_Definición de dominios en la GDB:_**

*   Completar: 
*   En qué casos es correcto definir dominios?
*   Estándar de nomenclatura
*   Cómo se mantienen? (quién lo administra)

**_Mantenimiento de la GDB (tareas Admin):_**

**Compress:**  
En la base PSYR se debe ejecutar un “compress” de la geodatabase para optimizar la base.  
**Versionado:**  
En qué casos recomendamos trabajar con versionado.

Documentación estandares de Servicios GIS
-----------------------------------------

Los servicios GIS publicados en el ArcGIS Server se organizan de la siguiente manera.

Una o varias carpetas por cada aplicación, dependiendo de la segmentación de seguridad que se requiera implementar.

*   ### **Seguridad de servicios:**
    

La seguridad se maneja por carpeta, el acceso a las mismas se configura por grupos de AD.  
Esos grupos de AD son gestionados por cada negocio como así también la asignación de los usuarios a los mismos, y de esa manera se controla el acceso a los datos.

GIS YGEO Frontend
-----------------

### **Objetivo del documento**

Este documento describe los lineamientos para el código Frontend, utilizando el framework Y-Geo. 

Para mayor detalle ver [file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html)

(actualizar con link definitivo)

**Descripción**

Y-Geo es un framework para desarrollo de todo tipo de aplicaciones WEB pero está especialmente orientado para aplicaciones de mapas porque posee múltiples métodos para el tratamiento del mismo.

Su estructura interna de archivos se basa en el uso de un conjunto de funcionalidades básicas ( [_**CORE**_](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html#core) ) comunes y necesarias a todas las aplicaciones que se desarrollen con este framework, otro conjunto de funcionalidades que pueden o no ser compartidas entre aplicaciones ( [_**SHARE**_](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html#share) ) y finalmente las funcionalidades propias de cada aplicación ( [_**APP**_](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html#app) ).

Permite la creación de módulos con una estructura interna de tres capas (datos, visualización y lógica) que facilita el encapsulamiento y escalamiento de los mismos.  
Cada módulo interactúa entre sí por medio de un controlador de eventos, esto permite que se agreguen o quiten fácilmente sin que se produzca algún error (por codificación directa entre los mismos) en la aplicación.

Permite acceder a los permisos necesarios habilitados por usuario. Los mismos se implementan de acuerdo a las necesidades y funcionalidades propias de cada aplicación.

También ya existen desarrollado todo tipo de métodos para la visualización, filtrado, ordenamiento y búsqueda de datos tanto en el front-end como en el back-end (ver documentación Y-GEO Backend).

Las aplicaciones desarrolladas con este framework deben poseer un [_**archivo de configuración**_](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/framework/assets/Framework.html#menuConfiguration) , el cual tendrá toda la información necesaria para el correcto funcionamiento de la aplicación.  
Todas estas definiciones arrancan desde el archivo **main.js** el cual debe ser invocado desde el archivo **HTML** que representará a la aplicación.

### **Archivo de configuración**

En este archivo van los seteos generales, JS y CSS de uso general, la seguridad, los servicios, los diccionarios de datos y los módulos necesarios para el correcto funcionamiento del framework.

##### General

```
DATA\_CONFIGURATION.General = {  
    name: << nombre de la aplicación >>,  
    title: << título de la aplicación >>,  
    subtitle: << subtitulo de la aplicación >>,  
    logo: << imagen del logo de la aplicación >>,  
    favicon: << archivo ICO de la aplicación >>,  
    timeout: 1000 \* 60 \* 6, // 6'  
    timeAdjust: (dateTime) => (dateTime == null ? null : dateTime + (1000 \* 60 \* 60 \* 3)), //3 horas  
    logger: !Configuration.isProduction(), //Campanita de advertencia (margen inferior izquierda)  
}
```

Se pueden agregar tantos atributos como sean necesarios y que luego serán accedidos desde diferentes partes de la aplicación usando MANAGER.Configuration.General....

##### Clases auxiliares

```
DATA\_CONFIGURATION.Classes = DATA\_CONFIGURATION.Classes.concat(  
  
window.APP\_COMPILED === true ?  
  
\[  
  
"./share/js/<< archivo minificado.js >>"  
  
\] :  
  
\[  
  
"./share/js/<< archivo 1 sin minificar.js >>",  
  
...  
  
"./share/js/<< archivo N sin minificar.js >>"  
  
\]  
  
);  
  
  
  
DATA\_CONFIGURATION.Styles = \[  
  
"./share/js/<< archivo de estilo 1.css >>",  
  
...  
  
"./share/js/<< archivo de estilo N.css >>"  
  
\];
```

##### Diccionario de datos

```
DATA\_CONFIGURATION.Dictionary = {  
  
url: "./app/data/dictionaryData.js"  
  
}
```

#### **Seguridad**

Permite acceder a los permisos necesarios habilitados por usuario. Los mismos se implementan de acuerdo a las necesidades y funcionalidades propias de cada aplicación.

```
DATA\_CONFIGURATION.Security = ({  
    user: {  
        url: << URL para acceder al esquema de roles y seguridad de la aplicación >>  
        name: "UserSecurity",  
        js: \[  
            "./app/data/userSecurity.js",  
            "./app/data/userSecurityData.js"  
        \]  
    },  
    services: \[  
        {  
            verify: () => MANAGER.SecurityController.getInstance().verifyAccess(<< nombre del servicio 1 obtenido de la seguridad >>),  
            id: << identificador del servicio 1 >>,  
            url: << URL para acceder a los datos del servicio 1 >>  
        },  
        ...  
        {  
            verify: () => MANAGER.SecurityController.getInstance().verifyAccess(<< nombre del servicio n obtenido de la seguridad >>),  
            id: << identificador del servicio n >>,  
            url: << url para acceder a los datos del servicio n >>  
        }  
    \]  
});
```

#### **Servicios** 

Esta definición de servicios utiliza las URL previamente configuradas en el área de seguridad y sirven para obtener las tablas de datos que serán usadas en la aplicación. Cada una de ellas puede tener su propio diccionario de datos y archivos de procesamiento. Según el tipo de servicio el origen de los datos puede ser de una BD de ARCGIS o de otro tipo.

```
DATA\_CONFIGURATION.Services = \[\];  
  
  
DATA\_CONFIGURATION.Services.push({  
  
id: << identificador del servicio 1 >>,  
  
name: << nombre de la clase 1 >>,  
  
dictionary: << diccionario de datos del servicio 1 >>,  
  
js: \[  
  
<< archivo JS para el manejo del data record 1 (no obligatorio) >>,  
  
<< archivo JS para el manejo del layer 1 (no obligatorio) >>,  
  
<< archivo JS para el manejo del servicio 1 (debe ser la clase asociada al atributo name) >>  
  
\],  
  
layers: \[  
  
<< nombre del layer que se buscará en el catálogo de ARCGIS >>  
  
\],  
  
notify: true //notificador por pantalla de la carga de este servicio  
  
});
```

#### **Layout: atributos para dimensionar la pantalla**

```
DATA\_CONFIGURATION.Layout = {  
  
header: 60,  
  
left: 50,  
  
center: 350,  
  
right: "auto",  
  
rightpanel: 350  
  
}
```

#### **Módulos**

El desarrollo de cada módulo dependerá de la funcionalidad deseada, pudiéndose usar “templates” o clases predefinidas para el manejo de layers o capas para el manejo de diferentes tipos de entidades geográficas (puntos, polígonos, polilíneas, imágenes).

```
DATA\_CONFIGURATION.Modules = \[\];  
  
DATA\_CONFIGURATION.Modules.push({  
  
name: << NOMBRE DEL MODULO 1 >>,  
  
blocker: false,  
  
js: (  
  
\[  
  
"./app/js/<< carpeta modulo 1>>/<< archivo 1 minificado.js >>"  
  
\] :  
  
\[  
  
"./app/js/<< carpeta modulo 1 >>/<< archivo 1 sin minificar.js >>",  
  
...  
  
"./app/js/<< carpeta modulo 1 >>/<< archivo N sin minificar.js >>"  
  
\]  
  
),  
  
css: \["./app/js/<< carpeta modulo 1 >>/<< archivo css >>"\],  
  
atributos necesarios para el correcto funcionamiento del módulo  
  
});
```

### **Archivo del diccionario de datos**

El diccionario de datos permite definir los campos y atributos que serán utilizados en diferentes sectores de la aplicación.

```
DATA\_DICTIONARY.push({  
  
name: << nombre de la capa definido en el área de servicios >>,  
  
alias: << alias (no obligatorio, de no existir se usa el "name") >>,  
  
label: << etiqueta para mostrar en diferentes mensajes >>,  
  
sortBy: "<< nombre del campo >> ASC", //DESC para descendente  
  
load: true, //cargar los datos en el arranque de la aplicación  
  
storage: false, //almacenar en el local storage  
  
fields: \[  
  
{  
  
name: "POINT\_Y",  
  
label: "Latitud",  
  
latitude: true  
  
},  
  
{  
  
name: "POINT\_X",  
  
label: "Longitud",  
  
longitude: true  
  
},  
  
{  
  
name: "geometry.rings",  
  
label: "Rings",  
  
polygon: true,  
  
logic: true  
  
},  
  
{  
  
name: << campo 1 >>,  
  
label: << etiqueta campo 1 >>,  
  
filter: "value", //tipo de filtro  
  
sort: true // usar el campo para ordenamiento  
  
},  
  
{  
  
name: << campo N >>,  
  
label: << etiqueta campo N >>,  
  
filter: << identificador del filtro >>, //se usa principalmente para los comboBox  
  
list: << nombre de la lista de datos que se usara en el combo >>,  
  
logic: true  
  
}  
  
\]  
  
});
```

### **Armado de módulos**

Los módulos son archivos JS y CSS para manejar y mostrar diferentes tipos de información en forma modular o de “cajas cerradas” y que poseen un esquema interno de tres capas (lógica, datos y vista).  
La interacción entre los distintos módulos se realiza a través un Controlador de Eventos o escuchador de eventos. Esto permite que la aplicación funcione independientemente de los módulos cargados porque no se producen errores por tener accesos directos entre cada módulo.  
A su vez cada módulo tiene una referencia de acceso o fachada para asegurarse que sólo se utilizarán los métodos designados para interactuar con otros módulos.

*   **LÓGICA** : código para resolver análisis y cálculos
*   **DATOS** : código para manejar los datos que intervendrán en el módulo.
*   **VISTA** : código para visualizar los datos por pantalla.

### **Pruebas Unitarias:**

Se desarrolló una librería (AUTOTEST) para implementar unit tests, personalizándolas por aplicación.

[file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/autotest3.0/autotestHelp.html](file://amznfsxjuy2iqzn.grupo.ypf.com/share/FrontEnd/autotest3.0/autotestHelp.html)  
(actualizer con el link definitive)

#### **Vincular a la aplicación**

① Agregar el siguiente script en el archivo HTML de inicio de la aplicación.  
<script type="text/javascript" src="./carpeta donde esté ubicado el código de autotest/autotest.min.js"></script>  
  
② Agregar la línea de comando RunAutotest() en el sector de arranque de la aplicación.  
🔖  **Para las aplicaciones que usan el framework GIS** se debe hacer en el archivo main.js luego de la línea de comando MANAGER.EventsListener.trigger("Application.ready")  
  
③ Copiar y pegar el siguiente código en algún archivo de la aplicación. 🔖  

```
function RunAutotest() {  
    if (!window.Autotest) { return; }  
    const groups = {  
        files: \[/\* lista de carpetas y/o archivos con pruebas unitarias \*/\];  
  }
```

**Sólo para aplicaciones que usan el framework de GIS**

```
//Se valida que el modulo este efectivamente cargado  
  
for (let module of MANAGER.Configuration.Modules) {  
  
if (window\[module.name\] == undefined) { continue; }  
  
let name = module.js\[0\];  
  
groups.files.push(name.substring(0, name.lastIndexOf("/")));  
  
}  
  
groups.core: "./autotest/core",  
  
groups.share: "./autotest/share",  
  
  
  
  
Autotest.run(groups);  
  
}
```

#### **Activar el arranque de las pruebas unitarias**

Una vez agregado el código previamente explicado entonces colocar en la URL de la aplicación el parámetro autotest.  
Ejemplo: [https://server/aplicacion/index.html?autotest](https://server/aplicacion/index.html?autotest)

#### **Comandos para el arranque de las pruebas unitarias**

Existen 5 comandos para poder armar, procesar y monitorear las pruebas unitarias.

* * *

 

**run**

Inicia el procesamiento de las pruebas unitarias. Su único parámetro es un hash con los nombres de grupos y sus respectivos listados de archivos y/o carpetas a procesar. Estos grupos son los que se visualizarán en el panel de resultados.  
Los nombres de los archivos deben estar terminados en Autotest.js, en caso de usarse como referencia una carpeta en la misma debe existir un archivo con el nombre de la carpeta y con extensión Autotest.js

```
Autotest.run({   
  
    grupo1: \["./modulo1/pruebasAutotest.js"\],   
  
    grupo2: \["./modulo2"\] //⇢ module2Autotest.js  
  
});
```

* * *

 

**import**

Permite la carga de un archivo JS o CSS. El archivo JS debe contener una clase con el mismo nombre del archivo a importar.

```
Autotest.import("./processUnitTest.js");  
  
⋮  
  
class ProcessUnitTest {}
```

* * *

 

**evaluate**

Evalúa una prueba unitaria. Posee tres parámetros de ingreso y un comando con el resultado esperado y que se usa para determinar el tipo de comparación a realizar.

1.  texto con nombre descriptivo o título de la prueba unitaria. 🔖
2.  función para evaluar, debe retornar un valor del mismo tipo que el valor esperado.  
    Posee un parámetro de entrada con los posibles atributos a modificar 🔖 name, alert, description, filter
3.  hash opcional de configuración para la visualización en el panel de resultados. Sus atributos pueden ser:  
    alert: agrega en la fila de la prueba unitaria del panel de resultados un ícono de alerta 🔔 con el texto indicado. 🔖  
    description: observaciones que se mostrarán en el sector descriptivo de la fila de la prueba unitaria en el panel de resultados.  
    filter: texto con el que se agruparán y filtrarán pruebas unitarias en el panel de resultados.  
    reprocess: permite reprocesar la prueba unitaria, 🔖 en la fila del panel de resultados de la prueba unitaria aparecerá el ícono ⟳ con el que se puede reprocesar.  
    view: si el resultado es un elemento HTML entonces permite normalizarlo 🔖 para poder compararlo contra el valor esperado. También permite visualizarlo en el panel de resultados.  
    Ejemplo view: { style: { display: 'block' }, innerHTML: 'hola mundo' }  
      
    **Operadores**

1.  1.  equals(valor esperado)
    2.  not.equals(valor esperado)

```
Autotest.evaluate(  
  
    "Calcular hipotenusa",  
  
    (self) => {  
  
        self.alert = "¡Verificar!";  
  
        const mayor = 3;  
  
        const opuesto = 4;  
  
        return calcularHipotenusa(mayor, opuesto);  
  
    },  
  
    {  
  
        filter: "calculos matematicos"  
  
    }  
  
).eq
```

* * *

 

**wait**

Permite ejecutar una función 🔖 en forma asincrónica para luego evaluar una o varias pruebas unitarias. Como primer parámetro se le pasa una función de condición "hasta". 🔖  Como segundo parámetro se le puede pasar un hash con los siguientes atributos de configuración para la espera:

1.  delay: milisegundos entre espera (default 100)
2.  timeout: milisegundos para cancelar la espera (default 5000)
3.  attempts: intentos (default -1, infinito)  
      
    

```
Autotest.wait(  
  
    () => {   
  
        condición hasta que...  
  
    }).  
  
then(() => {   
  
    llamada a prueba unitaria  
  
}).  
  
catch(error => {  
  
    console.log(error)  
  
});
```

* * *

 

**separator**

Agrega un separador al listado del panel de resultados. Se puede enviar como parámetro un string con texto o código HTML para visualizar en pantalla. Por defecto dibuja una línea de separación.

```
Autotest.separator(<texto o código html opcional>);
```

GIS YGEO Frontend (detallado)
-----------------------------

### **Descripción**

Y-Geo es un framework para desarrollo de todo tipo de aplicaciones WEB pero estáespecialmente orientado para aplicaciones de mapas porque posee múltiples métodos para eltratamiento del mismo.

Su estructura interna de archivos se basa en el uso de un conjunto de funcionalidades básicas  [**CORE**](#CORE) comunes y necesarias a todas las aplicaciones que se desarrollen con esteframework, otro conjunto de funcionalidades que pueden o no ser compartidas entre aplicaciones [**SHARE**](#SHARE)  y finalmente las funcionalidades propias de cada aplicación [**APP**](#APP) .

Permite la creación de módulos con una **estructura interna de tres capas** _(datos, visualización y lógica)_ que facilita el encapsulamiento y escalamiento de los mismos.  
Cada módulo interactúa entre sí por medio de un  **controlador de eventos** , esto permite que seagreguen o quiten fácilmente sin que se produzca algún error (por codificación directa entre los mismos) en la aplicación.

Permite acceder a los permisos necesarios habilitados por usuario. Los mismos seimplementan de acuerdo a las necesidades y funcionalidades propias de cada aplicación.  
También ya existen desarrollado todo tipo de métodos para la visualización, filtrado,ordenamiento y búsqueda de datos tanto en el front-end como en el back-end.

Las aplicaciones desarrolladas con este framework deben poseer un archivo deconfiguración, el cual tendrá toda la información necestaria para el correcto funcionamientode la aplicación.

Todas estas definiciones arrancan desde el archivo main.js el cual debe ser invocado desde elarchivo HTML que representará a la aplicación.

### **Servicios de Datos**

La definición de servicios utiliza las URL configuradas en el área de seguridad y sirven paraobtener las tablas de datos que serán usadas en la aplicación.  
Cada una de ellas puede tener su propio diccionario de datos y archivos de procesamiento.Según el tipo de servicio el origen de los datos puede ser de una BD de ARCGIS o de otro tipo.

### **Estructura de archivos**

**CORE**

**SHARE**

**APP**

### **Esquema interno de Módulos**

El desarrollo de cada módulo dependerá de la funcionalidad deseada, pudiéndose usar“templates” o clases predefinidas para el manejo de layers o capas para el manejo dediferentes tipos de entidades geográficas (puntos, polígonos, polilíneas, imágenes).  
Los módulos son archivos JS para manejar y mostrar diferentes tipos de información en formamodular o de “cajas cerradas” y que poseen un esquema interno de tres capas (lógica, datos yvista). La interacción entre los distintos módulos se realiza a través un EventsListener o escuchador de eventos. Esto permite que la aplicación funcione independientemente de losmódulos cargados porque no se producen errores por tener accesos directos entre cada módulo.  
A su vez existe un archivo/clase que las relaciona entre sí y sirve como referente y vínculo parael resto de los módulos (a través de su "fachada").

**Parent** 

Extiende de la clase Module (CORE - classes). Es la clase "padre" que engloba al resto de lasclases de un módulo. 

**Logic**

Extiende de la clase Logic (CORE - classes). Procesos para manejo de la lógica del negocio.

**Data**

Extiende de la clase Data (CORE - classes). Procesos para el manejo de los datos, utiliza laclase Service para la obtención de los datos de la.

**View**

Extiende de la clase View (CORE - classes). Proceso para el manejo de la vista de los datos,utiliza la clasevStructure para armar todas las estructuras HTML implicadas en el módulo.

##### **Ejemplo**

```
class Test extends Module {  
  constructor() {  
  super();  
}  
  
getFacade() {  
    const out = super.getFacade();  
    out.refresh = () => this.View.refresh();  
    out.processData = (condition) => this.Logic.processData(condition);  
    return out;  
  }  
}  
  
class TestLogic extends Logic {  
  constructor() {  
  super();  
}  
  
start() {  
  this.View.render();  
}  
  
processData(condition) {  
    const list = this.Data.getRecords();  
    return list.filter(condition);  
  }  
}  
  
class TestView extends View {  
  static ID = "testList";  
  constructor() {  
    super();  
}  
  
refresh() {  
    const element = document.getElementById(TestView.ID);  
    if (element != null) {  
      this.\_render(element, this.Data.getList);  
  }  
}  
  
render() {  
  const element = document.createElement("div");  
  element.id = TestView.ID;  
  this.\_render(element);  
}  
  
\_render(element) {  
  const list = this.Logic.processData(item => item.edad > 18);  
  element.innerHTML = this.\_getHtml(list);  
  document.appendChild(element);  
}  
  
\_getHtml(list) {  
  let out = '';  
  list.forEach(item) => { out += this.Structure.getHtmlItem(item) }  
  return out;  
  }  
}  
  
class TestStructure extends Structure {  
  constructor() {  
  super();  
}  
  
getHtmlItem(item) {  
    return (  
    \`<label>Campo 1</label>:<span>${ item.campo1 }</span>\` +  
    \`<label>Campo 2</label>:<span>${ item.campo2 }</span>\`  
    );  
  }  
}  
  
class TestData extends Data {  
  constructor() {  
  super();  
  }  
  
  getList() {  
    return MANAGER.DataController.getDataTable("Test").getData();  
  }  
  
}
```

###   
**Controlador de Eventos**

Permite el manejo de eventos por medio de subscripciones. De esta forma los diferentesmódulos pueden estan vinculados entre sí sin necesidad que sepan si el otro está activo o no.De esta forma se evita tener que codificar en forma directa.  
  
  
  
**Archivo de Configuración**

El archivo de configuración define toda los datos necesarios para el manejo de la seguridad,los servicios, los archivos auxiliares (js y css), el diccionario de datos y los módulos einformación general de la aplicación.  
  

```
var  
    DATA\_CONFIGURATION = {}  
  
//Definicion de urls usadas en la configuracion  
  
DATA\_CONFIGURATION.URLService = Configuration.LocationService.get();  
DATA\_CONFIGURATION.URLServiceAPI = Configuration.LocationService.get("API");  
DATA\_CONFIGURATION.URLServiceSecurity = Configuration.LocationService.get("SECURITY");  
  
//Datos generales usados por el framework y de la aplicación  
  
DATA\_CONFIGURATION.General = {  
    name: "aplicación ",  
    title: '<img title="aplicación " src=". / core / images / logo - ypf.png ">',  
    subtitle: '<img title="aplicación " src=". / app / estaciones / images /aplicación -xl.png ">',  
    logo: '<img title="aplicación " src=". / app / estaciones / images /aplicación -xl.png ">',  
    favicon: "app/estaciones/images/favicon-aplicación.ico ",  
    timeout: 1000 \* 60 \* 6, // 6'  
    timeAdjust: (dateTime) => (dateTime == null ? null : dateTime + (1000 \* 60 \* 60 \* 3)), //3 horas  
}  
  
//Listado de archivos JS usados por la aplicación  
  
DATA\_CONFIGURATION.Classes = (\[  
        "./share/js/layer/layer.js",  
        "./share/js/layer/logicLayer.js",  
        "./share/js/layer/moduleLayer.js",  
        "./share/js/layer/serviceLayer.js",  
        "./share/js/layer/structureLayer.js",  
        "./share/js/layer/viewLayer.js"  
\]);  
//Listado de archivos CSS usados por la aplicación  
  
DATA\_CONFIGURATION.Styles = \[  
        "./share/js/layer/layer.css"  
\];  
  
//Diccionario de datos utilizado por la aplicación  
  
 DATA\_CONFIGURATION.Dictionary = {  
        url: "./app/estaciones/data/dictionaryData.js"  
}  
  
//Datos de seguridad  
DATA\_CONFIGURATION.Security = ({  
    user: {  
  
        url: (  
            Configuration.isProduction() ?  
            DATA\_CONFIGURATION.URLServiceSecurity + "/api/Net/aplicación " :  
            Configuration.isTest() ?  
            DATA\_CONFIGURATION.URLServiceSecurity + "/api/Net/aplicación \_test " :  
            Configuration.isDevelopment() ?  
            DATA\_CONFIGURATION.URLServiceSecurity + "/api/Net/aplicación \_dev " :  
            "???"  
        ),  
  
        name: "UserSecurity",  
        js: \[  
            "./app/estaciones/data/userSecurity.js",  
            "./app/estaciones/data/userSecurityData.js"  
        \]  
  
        },  
        services: \[\]  
  
    });  
     
    if (Configuration.isProduction()) {  
  
        DATA\_CONFIGURATION.Security.services = \[  
            {  
                verify: () =>   
    MANAGER.SecurityController.getInstance().isRolAnalista(),  
                id: "Capa1",  
                url: DATA\_CONFIGURATION.URLService + "/webadaptor/rest/services/aplicación /Get "  
            },  
            ...  
        \]  
  
}  
  
// Informacion de servicios vinculada a los datos devueltos desde Security  
  
DATA\_CONFIGURATION.Services = \[  
        {  
            id: "Capa1",  
            name: "Capa1Service",  
            js: \[  
                "./app/js/capa1/capa1DataRecord.js",  
                "./app/js/capa1/capa1Layer.js",  
                "./app/js/capa1/capa1Service.js"  
            \],  
            layers: \[  
                "CAPA1"  
            \]  
        }  
    \];  
  
DATA\_CONFIGURATION.Layout = {  
        header: 60,  
        left: 50,  
        center: 350,  
        right: "auto",  
        rightpanel: 350  
}  
  
    DATA\_CONFIGURATION.Modules = \[\];  
  
    DATA\_CONFIGURATION.Modules.push({  
        name: "CustomMap",  
        blocker: false,  
        js: (  
            window.APP\_COMPILED === true ?  
            \[  
                "./share/js/map/compiled.js"  
            \] :  
            \[  
                "./share/js/map/customMapI18n.js",  
                "./share/js/map/customMap.js",  
                "./share/js/map/customMapData.js",  
                "./share/js/map/customMapLogic.js",  
                "./share/js/map/customMapView.js",  
                "./share/js/map/customMapLayer.js",  
                "./share/js/map/customMapElement.js",  
                "./share/js/map/customMapUtils.js",  
                "./share/js/map/customMapRuler.js",  
                "./share/js/map/customMapRulerRadial.js",  
                "./share/js/map/customMapPoint.js",  
                "./share/js/map/customMapPolygon.js",  
                "./share/js/map/customMapPolylines.js",  
                "./share/js/map/customMapGeocoder.js"  
            \]  
        ),  
        css: \["./share/js/map/customMap.css"\],  
        source: (  
            Configuration.isLocal() ?  
            "https://maps.google.com/maps/api/js?v=3&libraries=geometry,places,drawing&language=es"  
            :  
            Configuration.LocationService.get("google")  
        ),  
        options: {  
            layout: {  
                position: "right",  
            },  
            boundArea: {north: -22,west: -74,south: -56,east: -52},  
            latitude: -39.93,  
            longitude: -65.56,  
            address: "Centro",  
            icon: "./share/js/map/icon.png",  
            iniZoom: 4,  
            minZoom: 4,  
            maxZoom: 19,  
            showScale: true,  
            showPosition: true,  
            showRule: true,  
            showRuleRadial: true,  
            showStreetView: true,  
            malvinas: true,  
            type: () => CustomMapLogic.TYPE\_ROADMAP,  
            types: () => \[  
                CustomMapLogic.TYPE\_ROADMAP,  
                CustomMapLogic.TYPE\_HYBRID  
                //, "personalizado"  
            \],  
            /\* Estilado "personalizado"  
                styles: function() {  
                    return {  
                        personalizado: \[  
                            {  
                                featureType: "water",  
                                elementType: "geometry",  
                                stylers: \[  
                                    { invert\_lightness: true },  
                                    { hue: "#ff003b" },  
                                    { saturation: -100 },  
  
                                \]  
                            }  
                        \]  
                    }  
                },  
\*/  
            googleLayers: \[  
                "TrafficLayer"  
            \],  
            allowedBounds: \[  
                \[  
                    {latitude: -50,longitude: -73},  
  
                \],  
                \[  
                    {latitude: -55,longitude: -73},  
  
  
                \]  
            \],  
            overMarker: "./share/js/map/icon-overmarker.png",  
        }  
    });
```

  
  

### **Archivo del Diccionario de Datos**

El diccionario de datos permite definir los campos y atributos que serán utilizados en diferentessectores de la aplicación.

```
DATA\_DICTIONARY.push({  
    name: << nombre de la capa definido en el área de servicios >>,  
    alias: << alias (no obligatorio, de no existir se usa el "name") >>,  
    label: << etiqueta para mostrar en diferentes mensajes >>,  
    sortBy: "<< nombre del campo >> ASC", //DESC para descendente  
    load: true, //cargar los datos en el arranque de la aplicación  
    storage: false, //almacenar en el local storage  
    fields: \[       
        {  
            name: "POINT\_Y",  
            label: "Latitud",  
            latitude: true  
        },  
        {  
            name: "POINT\_X",  
            label: "Longitud",  
            longitude: true  
        },  
        {  
            name: "geometry.rings",  
            label: "Rings",  
            polygon: true,  
            logic: true  
        },  
        {  
            name: << campo 1 >>,  
            label: << etiqueta campo 1 >>,  
            filter: "value", //tipo de filtro  
            sort: true // usar el campo para ordenamiento  
        },  
        {  
            name: << campo N >>,  
            label: << etiqueta campo N >>,  
            filter: << identificador del filtro >>, //se usa principalmente para los comboBox  
            list: << nombre de la lista de datos que se usara en el combo >>,  
            logic: true  
        }  
    \]  
});
```

GIS Funcional y QA
------------------

### Ver documento 

    [Gis Funcional y QA](https://ypf.sharepoint.com/:x:/r/sites/comunicaciones-desa/isdocs/YLite/Pages/documents/gis/GIS-Funcional-y-QA.xlsx?d=w7e049569b14942f2a8b3717238d44205&csf=1&web=1&e=IpMHlX)


# Página: https://isdocs.grupo.ypf.com/mobile.html

[Saltar al contenido principal](#main)

Mobile
======

Especificación de requerimientos funcionales
--------------------------------------------

### **Objetivos**

En esta guía se describen los lineamientos generales y las recomendaciones que deben seguir los equipos que desarrollen software para aplicaciones móviles en YPF. Tiene como objetivo establecer las pautas para la organización, publicación y documentación del software.

### **Documentación de la funcionalidad de la aplicación**

Documentación funcional, como generarla, formato, que tiene que incluir, donde debe estar. 

### **Documentación funcional**

Propuesta de solución

El documento debe contener el Objetivo y alcance, diagrama de arquitectura, tecnologías propuestas, equipo de trabajo, necesidades de la propuesta de solución. Se deberá ver reflejado en un documento Word con los datos solicitados.

Estimación

El documento debe contener la estimación por sprint y entregables. Preferentemente documentado en Azure o Project.

Ficha de la aplicación

Deberá contener los datos básicos para situarnos en el contexto de la aplicación (por ejemplo: nombre, objetivo, tecnología, aplicación en el mapa de sistemas, instancias en el mapa de sistemas, etc.). Documentado en Template de azure.

Historias de Usuario (US)

La documentación debe representar cada uno de los requisitos de los usuarios incluyendo los criterios de aceptación. Documentado en Azure.

Arquitectura de la aplicación

Explicar brevemente las capas de la aplicación. En caso de que tuviera más de un componente (Web / WebAPI) mantenido por el equipo, explicar brevemente las capas de cada uno de ellos. Opcional: Diagrama de arquitectura.

Deploy

Breve explicación de cómo debe realizarse el despliegue de la aplicación. Si la misma tuviera más de un componente, explicar brevemente el despliegue de cada uno de ellos. Aclarar si hay alguna particularidad que es relevante conocer. (Debe contener una breve descripción de despliegue de pipeline build y release de cada módulo/servicio a implementar)

Modelo de datos

Sección desestructurada que permite destacar aspectos relevantes del modelo de datos. Opcional: Diagrama Entidad-Relación / Modelo Relacional.

Manual de usuario

El documento debe contener una guía de asistencia para el usuario final sobre el funcionamiento de la aplicación y solución a los problemas más comunes.

Ficha de Entornos

Entornos de la aplicación, con sus respectivos datos de conexión (Servidores / URLs / Credenciales / Tokens / etc.). No se deben incluir credenciales productivas.

### **Código**

El código fuente generado, además de cumplir con los requerimientos funcionales, debe ser fácil de comprender, reutilizar, extender, mantener y escalar. Comentar código, definir nomenclatura, nombre de clases y métodos.

### **Estructura del proyecto en Azure**

### **Wiki**

La wiki debe ser el índice del proyecto, por la cual se debería poder acceder a toda la documentación funcional, técnica, de testing y de diseño UX-UI del proyecto, como también a información de base de datos, despliegue y variables de entornos.

### **Repos**

La wiki debe ser el índice del proyecto, por la cual se debería poder acceder a toda la documentación funcional, técnica, de testing y de diseño UX-UI del proyecto, como también a información de base de datos, despliegue y variables de entornos.

Se debe crear un repositorio por cada módulo del proyecto y uno para la documentación del proyecto.

*   \[Proyecto\]-Mobile: código fuente de la aplicación Mobile.
*   \[Proyecto\]-Backend: código fuente de la Web API.
*   \[Proyecto\]-Web: código fuente de la web, en caso que el proyecto además de la aplicación Mobile tiene una web.
*   \[Proyecto\]-Jobs: código fuente de los procesos batch si el proyecto los tuviese.

\[Proyecto\]-Documentación: con la documentación funcional, UX y técnica del proyecto.

*   *   Diseño UX-UI
    *   Documentación Funcional
    *   Documentación Técnica
    *   Documentación Testing

### **Pipeline**

*   Pipeline: contiene un pipeline de build por cada componente a compilar.
*   Release: contiene un pipeline de release por cada componente a desplegar.

### **Mock up de servicios**

Para pruebas unitarias.

### **Autenticación de los usuarios**

Información del proceso de autenticación a implementar en la app y la configuración correspondiente.

### **Políticas de seguridad de la app**

Debe contener todas las políticas de seguridad que regirán el acceso a la app a desarrollar.

### **Envío de notificaciones a la app**

Información de la API, servicio o librería a utilizar para el caso de que se requiera el uso de notificaciones.

### **Uso de MVP**

Standares mínimos que debe cumplir un MVP.

### **Automatizar generación y publicación APK / IPA productivo** 

Ejemplo que se genere en modo release. Publicar en app center.

### **Definición de arquitectura de la aplicación por proyecto**

Mapa o Diagrama de la arquitectura completa del proyecto.

### **Base de datos**

Nomenclatura de nombre de tablas y campos de las bases de datos de los dispositivos.

### **Integración**

Como se integran las aplicaciones con otras aplicaciones.

### **Manejo de errores**

Ver forma de implementar el manejo de errores de las apps. Logs de errores.

### **Plantillas de desarrollo**

Flutter, angular, mi ypf.

### **Nomenclaturas**

1.  Base de datos 
2.  Certificados 
3.  Repositorios 
4.  Documentación

* * *

Testing
-------

### **Objetivos**  

Para que el testing mobile sea exitoso hay que tener en cuenta las siguientes consideraciones:

### **Aspectos generales**

*   Probar la aplicación en varios dispositivos diferentes con distintas versiones, en los cuales se considere más relevante probar. ¿Se utilizará la aplicación en un teléfono, tablet o handheld?
*   Verificar que la aplicación no consuma batería en exceso.
*   Idiomas, algunos idiomas contienen caracteres especiales que pueden hacer fallar la aplicación, los “.” y “,” en campos numéricos pueden tener comportamientos diferentes.
*   Asegurar la confidencialidad de los usuarios es otro punto importante que abordar antes de publicar una nueva aplicación.
*   Las llamadas o notificaciones de otras aplicaciones podrían ser causa de un fallo inesperado de la aplicación que estamos probando.

### **Aspectos específicos**

1.  **Login**
    *   El ID de red debe soportar SE17546 y [SE17546@grupo.ypf.com](mailto:SE17546@grupo.ypf.com)
    *   Poner un espacio al usuario al final del texto y verificar que lo tome correctamente.
    *   Usuario y/o password inválidos. Debe mostrar un mensaje que indique "Credenciales inválidas". No se debe detallar si lo inválido es el usuario o el password.
    *   Si no tiene permisos en la aplicación. Debe mostrar un mensaje que indique "No tiene permisos para acceder a la aplicación. Por favor, comuníquese con el Administrador."
    *   Para un usuario bloqueado mostrar un mensaje que diga "Credenciales inválidas"
    *   Hacer prueba con token vencido.
    *   Sin conexión a internet. "No tiene conexión a Internet. Por favor, verifique su conexión de red y vuelva a intentarlo."
    *   Debe haber un botón para mostrar/ocultar password.
    *   ¿Al cerrar la app tendrá que loguearse nuevamente o queda logueado?
    *   Intentar loguarse en más de 1 dispositivo con las mismas credenciales.  
          
        
2.  **Sincronizaciones**
    *   Probar sincronizar con token vencido
    *   Probar que no haya conectividad
    *   Realizar varias sincronizaciones de información diferente, verificar que no rompa y que luego la información se vea correcta
    *   Poner la aplicación en segundo plano durante la sincronización y luego volver a la aplicación
    *   Repetir la sincronización sobre lo ya sincronizado
    *   ¿La sincronización obtiene o guarda?
        *   Cuando obtiene, si tiene algo pendiente de guardar, también lo guarda? Antes o después de obtener. Probarlo.
        *   Cuando guarda, ¿También obtiene? ¿Antes o después de guardar? Probarlo.
    *   ¿Puedo usar la app mientras sincroniza? Mientras se sincroniza se recomienda que el usuario pueda seguir usando la aplicación siempre y cuando esto no presente un problema.
    *   Verificar tiempo de sincronización o progreso.
3.  **Token**
    *   Verificar que cuando se invalide el token, en la pantalla muestre un mensaje indicando "Su sesión ha expirado. Por favor, vuelva a ingresar sus credenciales." y redirija a la pantalla de login. La aplicación debe quedar en un estado consistente y debe poder volver a sincronizarse.
    *   ¿Por qué se invalida el token? a) Se bloqueó el usuario. b) Se venció el token. c) Cambió la password. Todas deben probarse.
4.  **Conectividad**
    *   Al realizar una acción en la aplicación sin tener conexión debe mostrar un mensaje que indique "No tiene conexión a Internet. Por favor, verifique su conexión de red y vuelva a intentarlo.". La aplicación debe quedar en un estado consistente.
    *   En la sincronización desconectar internet en medio de la sincronización, Debe mostrar el mensaje "No tiene conexión a Internet. Por favor, verifique su conexión de red y vuelva a intentarlo.".
    *   Pasar de wifi a datos, viceversa.
    *   Probar múltiples bandas.
5.  **Push Notifications**
    *   Repetir pruebas varias veces para verificar que la notificación siempre llegue.
    *   Verificar que presionando sobre la notificación, dirija a la pantalla correcta de la aplicación.
    *   ¿Qué debe ocurrir si me llega una push y no estoy logueado? (o tengo el usuario bloqueado, o se me venció el token). Debe estar definidos en el documento funcional.
    *   ¿Qué debe ocurrir si me llega una push y tengo la aplicación abierta? Debe estar definidos en el documento.
6.  **Si es multiusuario**
    *   Cuando finalizas sesión e inicias la de otro usuario, ¿debería verse información del usuario anterior? Deben estar definidos en el documento. 
        
        Cuando cerras sesión, inicias la de otro usuario y sincronizas, ¿debería sincronizarse la información del usuario anterior? Deben estar definidos en el documento. 
        
        ¿Cuándo el usuario B cierra sesión y volvés a loguearte con el usuario A debería haberse mantenido la información del primer login? Deben estar definidos en el documento.
        
7.  **Desinstalación**
    *   Debe borrarse toda la información guardada en la base local. Tanto en APK como en IPA.
    *   En caso de que se pueda actualizar la versión sin desinstalar la previa, no debe borrarse la información guardada en la base local. Tanto en APK como en IPA.
8.  **App en segundo plano**
    *   Poner la app en segundo plano y volver, hacer un muestreo en 2 ó 3 pantallas. Dejarla en segundo plano todo un día o abrir muchas aplicaciones, y volver a nuestra app.
9.  **Información/Ayuda**
    *   Debe incluir una breve descripción de la aplicación.
    *   Se debe mostrar la versión actual de la aplicación.
    *   Incluir mail de contacto para soporte.
10.  **Diseño**
     *   Orientación de la aplicación, rotar el dispositivo para verificar que la aplicación siga siendo funcional.
     *   Probar cambiar el tamaño de fuente.
     *   Probar que el tamaño de los botones sea apropiados para las circunstancias del usuario, por ejemplo si utiliza equipamiento como guantes a la hora de utilizar la aplicación.
11.  **Íconos**
     *   Verificar que los íconos se vean bien, que se entienda si tiene algún texto interno, etc.

* * *

UX
--

### **Interacción y formas de sostener el móvil**

Según la investigación de Steven Hoober’s el 75% de los usuarios tocan la pantalla con un solo pulgar.

El diseño de aplicaciones para móviles tiene que tener en cuenta la forma en que los usuarios sujetan los teléfonos. Asimismo, con cuáles dedos interactúan y cómo los usan **, tiene incidencia en el diseño de la interfaz y condiciona la ubicación de los elementos interactivos en la pantalla.**

Una de las más habituales es que lo sostenga con una sola mano, otorga mucha responsabilidad al dedo pulgar para realizar las interacciones.

Las características anatómicas de la mano determinan ciertas zonas de la pantalla que pueden ser alcanzadas con mayor o menor comodidad por este dedo. La «Ley del pulgar», se refiere a la superficie de pantalla a la que este dedo tiene acceso sin mayores problemas y nos  **da pistas para organizar jerárquicamente los elementos en la interfaz.**  

Por ejemplo, los botones que se utilizan con más frecuencia deberían situarse en la parte inferior de la pantalla para ser alcanzados con facilidad, mientras que aquellos controles que no deberían tocarse por error —como «editar» o «eliminar»— se ubican fuera de esta zona, con un acceso más restringido.

_De acuerdo a la forma de sostener el móvil, el pulgar tiene mayor o menor dificultad en acceder a ciertas zonas._

### **Gestos**

#### **Interacción y formas de sostener el móvil**

Gestos simples como tocar, arrastrar o deslizar —que requieren solo uno o dos dedos— **han sido bien asimilados por los usuarios, que los encuentran naturales y familiares.**

El uso de los gestos se puede aprovechar en el diseño de aplicaciones, que debe considerarlos como medios para realizar acciones o navegar por los contenidos.

  
**Acciones básicas de la aplicación deberían poder llevarse a cabo mediante gestos simples para asegurarse que la mayor parte de los usuarios los pueden realizar** , dejando aquellos más complejos como una forma alternativa de interactuar con la interfaz de la app.

A continuación, una lista de los más comunes y para qué se utilizan:

### **Interfaz - Tamaño de botones**

**El módulo base es de 48dp**  que equivale aproximadamente a nueve milímetros, **tamaño mínimo recomendado para elementos interactivos** . Basarse en este tamaño y respetar estas dimensiones para los botones, **permite asegurar que estos podrán ser tocados con el dedo sin problemas** , cuestión fundamental en el diseño para móviles.

### **Incidencia en la orientación de la pantalla**

**Tener en cuenta la orientación del dispositivo al utilizar la aplicación, significa aprovechar lo mejor de cada escenario.**

En los teléfonos, el modo horizontal se usa sobre todo en aquellas situaciones que requieren mejor aprovechamiento de la pantalla. Por ejemplo, sostener el teléfono en forma horizontal permite disponer de un teclado más grande y una mayor superficie para pulsar las teclas, permitiendo escribir más cómodamente.

  
Es recomendable diseñar para ambas orientaciones, ya que de esta forma no se fuerza al usuario a usar una única versión ofrecida.

_Las diferentes orientaciones son una oportunidad de repensar la disposición de información que sea más útil en cada caso._

### **Simplicidad**

**Los móviles no son dispositivos para mostrar mucha información en pantalla** . **Por esta misma razón, la simplicidad consiste en manejar la economía visual y tener un buen criterio para determinar qué incluir y qué no en el diseño.** Una gran cantidad de elementos puede abrumar al usuario, por eso, lo que está en pantalla tiene que ser necesario en ese momento y en esa situación de uso.

### **Diseño de tablas**

En un contexto móvil, es importante recordar que la pantalla es muy limitada y la atención del usuario es corta, para que este diseño tenga éxito, el contenido viable debía presentarse lo antes posible.

El primer paso es comprender cómo los usuarios utilizan e interactúan con estos datos en su forma nativa basada en la web. Las diferentes formas en que los usuarios consumen los datos determinarán el diseño de su contraparte móvil.

Se destacan dos escenarios principales.

**_Escenario 1_**

Comparación de un puntaje de una sola categoría a través de múltiples ubicaciones (por ejemplo, escaneo vertical, específico de columna)

**_Escenario 2_**

Comparación de múltiples categorías dentro de una sola ubicación (es decir, exploración horizontal, específica de fila)

Los usuarios no necesitan toda la información presentada a la vez para lograr su objetivo. Limitar la visualización de esta tabla atendiendo a estos dos casos de uso permite idear diferentes diseños apropiados para una versión móvil.

[https://medium.com/@carlosbeneyto/ux-dise%C3%B1ando-tablas-complejas-para-m%C3%B3vil-5d09ca9c56a4](https://medium.com/@carlosbeneyto/ux-dise%C3%B1ando-tablas-complejas-para-m%C3%B3vil-5d09ca9c56a4)

### **Patrones de interacción**

**Galería de imágenes**

En caso de que excedan el área disponible, se realiza un recorte —generalmente cuadrado— de las imágenes a mostrar.

Android es un caso particular, ya que al mostrar imágenes en la vista de cuadrícula, cuando se considere necesario, es posible utilizar un desplazamiento horizontal. Cuando esto sucede es recomendable mostrar un pequeño trozo de las imágenes siguientes.

* * *

Lineamientos técnicos
---------------------

### **Características para Desarrollo Mobile**

#### **Arquitectura de la solución**

Todas las aplicaciones móviles deberán contar con su propia web api rest como backend, que deberá estar publicada en el ASE Privado y se expondrá a internet mediate el APIM (Magui)

1.  _Aplicación Mobile puede ser nativa o hibrida_
2.  _Azure API Management_
3.  _Web api backend de la aplicación_
4.  _Base de datos SQL Server Azure_

#### **Seguridad**

Para el desarrollo de aplicaciones móviles, cualquiera sea la tecnología a utilizar, deberán contemplar la seguridad de la misma:

*   Se deberá autenticar el usuario con Azure AD.
*   El acceso al web api backend deberá estar protegido con un token de acceso, que se deberá validar antes de responder la petición requerida GET, POST, PUT.
*   Se deberá implementar el registro de un log de errores.
*   Desde la aplicación mobile se deberá gestionar el token, el mismo se obtiene, se almacena en forma segura y se envía en el header para cada interacción con el backend.

#### **Arquitectura lógica de la aplicación mobile**

Tener en cuenta principios de arquitectura estándar para el desarrollo de aplicaciones móviles:

*   Separar capas básicas:

*   UI Layer: o capa de presentación que gestiona todo lo concerniente a cómo se muestran los datos.
*   Domain Layer: encapsula toda la lógica y gestión de estados de la aplicación.
*   Data Layer: gestiona el acceso a datos, interactuando con el web api backend y el registro de datos en el storage local.

Fuente:   [Adroid Developers - Guide to app architecture](https://developer.android.com/topic/architecture)  

#### **Diccionario de datos**

Se deberá incluir diccionario de datos con la descripción de la  **Entidades Relevantes** del modelo.

#### **Especificación funcional**

Se deberá incluir la Especificación Funcional con el detalle de las funcionalidades desarrolladas en la aplicación.

#### 

### **Módulos de MI YPF**

Mi YPF es una aplicación Modular, en la cual se pueden instalar nuevos módulos de forma dinámica sin tener que actualizar la aplicación en el celular.

*   La seguridad está gestionada por la aplicación Mi YPF, cada módulo se desliga de la autenticación, obtención y gestión de Token de acceso
*   Gestiona funcionalidad de Notificaciones Push
*   Provee acceso a los recursos del dispositivo

Para más detalle ver Especificación Módulo Mi YPF.

### **Llamadas a servicios**

#### **Estructura Request**

*   Header:  Authorization: A-YPF-Token \[token\]
*   Body\_ Según necesidades de la aplicación.

#### **Estructura Response**

##### **_Header_ :**

Se debe seguir el estándar para los códigos de estado de respuesta HTTP Los códigos de estado de respuesta HTTP indican si se ha completado satisfactoriamente una solicitud HTTP específica. Las respuestas se agrupan en cinco clases:

*   Respuestas informativas (100–199),
*   Respuestas satisfactorias (200–299),
*   Redirecciones (300–399),
*   Errores de los clientes (400–499),
*   y errores de los servidores (500–599).

Referencia:   [https://developer.mozilla.org/es/docs/Web/HTTP/Status](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

##### **_Body_ :**

*   success: "true" si la ejecución del servicio se ejecutó correctamente, "false" si ocurrió un error.
*   code\_result: código numérico indicando situaciones puntuales de la lógica de cada aplicación.
*   data: nodo json donde se devuelve la información solicitada.

##### **_code\_result_ :**

En la ficha técnica de la aplicación se debe especificar los códigos con su respectiva descripción que indique cual es el error que ocurrió.

### **Nomenclatura código**

#### **Requisito**

Todos los objetos son escritos en inglés.

#### **Comentarios**

Iniciados con "/ _" y culminados por "_ /", en visual studio se puede hacer uso de regiones para permitir el toogle.

#### **Nomenclatura objetos**

*   Formulario ->Form
*   TextBox->Text
*   Checbox->Check
*   ComboBox->Combo
*   DatePicker->DatePicker

#### **Nomenclatura objetos en clases**

La estructura del nombre es:  **NameObjetctType** Por ejemplo: LoginForm, UserText, UserCheck, etc.

#### **Nomenclatura objetos en diseños**

La estructura del nombre es:  **Name\_ObjetctType** Por ejemplo: Login\_Form, User\_Text, User\_Check, etc.

#### **CSS (HTML, ASPX) uso en flutter**

*   BEM (bloque, element, modificador)
*   SASS

### **Firmas con certificados**

#### **Generación IPA (IOS)**

Certificado que debe ser instalado en las keychain del pc MAC para poder utilizar el provising profile.

[development.zip](https://dev.azure.com/Azure-DevOps-YPF/9444c5f4-584e-4975-a28c-472bc57a5f1f/_apis/git/repositories/baf777bb-e002-4bf6-a97b-6efbfa1ae91f/Items?path=/.attachments/development-1fd35c70-87a9-4224-97e7-6a62d2d22240.zip&download=false&resolveLfs=true&%24format=octetStream&api-version=5.0-preview.1&sanitize=true&versionDescriptor.version=main)

#### **Provising profile**

Porvising profile que debe ser instalado en las keychain del pc MAC para poder utilizar el usuario y clave con las firmas a configurar en el gestor de código fuente.

[DesarrolloMobileProfile.zip](https://dev.azure.com/Azure-DevOps-YPF/9444c5f4-584e-4975-a28c-472bc57a5f1f/_apis/git/repositories/baf777bb-e002-4bf6-a97b-6efbfa1ae91f/Items?path=/.attachments/DesarrolloMobileProfile-612ebd5a-6a13-4d1c-9bdf-8cfd95ef98c3.zip&download=false&resolveLfs=true&%24format=octetStream&api-version=5.0-preview.1&sanitize=true&versionDescriptor.version=main)

Finalmente, para poder firmar y generar un IPA se debe poner el usuario y clave de YPF de la Apple ID conectando el usuario en Visual Studio 2019 en MAC.

#### **APK**

La firma del apk se realiza con el certificado YPF\_DESARROLLO\_MOBILE en  [Firma](https://dev.azure.com/Azure-DevOps-YPF/DesarrolloMobile/_wiki/wikis/Wiki%20Desarllo%20Mobile/1025/README) se debe realizar la firma utilizando el schema v2 y desactivando el schema v1.

* * *

Integración módulo MI YPF
-------------------------

### **Objetivos**

#### 

El objetivo del documento es la especificación técnica de la integración de un Módulo con la aplicación Mi YPF.

### **Definición funcional de la aplicación y módulos**

La aplicación Mi YPF desarrollada en Flutter, tiene como objetivo proporcionar una única interfaz por la cual el usuario podrá gestionar múltiples aplicaciones internas de YPF, permite instalar y desinstalar módulos que el usuario tiene habilitado según Grupos de AD en forma dinámica.

La aplicación cuenta únicamente con 1 pantalla de login de usuario que se realiza con Azure AD mediante Open ID, al ingresar correctamente se descargarán todos los módulos que el usuario tiene habilitados

Mi YPF Incluye las siguientes funcionalidades principales:

*   Seguridad de la aplicación:

*   Gestionar autenticación de los usuarios.
*   Gestionar token del usuario.

*   Panel principal

*   Instalación y actualización de las aplicación o módulos.
*   Gestionar token de los módulos.
*   Integración con los módulos, disponibiliza acceso a los recursos del dispositivo, a datos del usuario y token de acceso.

*   Notificaciones push

*   Gestionar las notificaciones push con la aplicación abierta y en background cuando la aplicación está cerrada.
*   Listado de notificaciones históricas, donde el usuario podrá marcarlas como leídas o eliminarlas.

### **Descripción Módulo de Mi YPF**

Un módulo de Mi YPF es una  **Web App**  que brinda funcionalidad especifica y se agrega en forma dinámica al panel principal a mi ypf, puede ser desarrollada con cualquier tecnología web:

*   HTML con Javascript Vanilla
*   HTML con JQuery
*   Angular
*   React JS

### **Alta nuevos módulos**

Para dar de alta de nuevos módulos se deberá solicitar al grupo Desarrollo Mobile indicando la siguiente información:

*   Nombre del módulo/aplicación que se muestra en el dashboard principal.
*   Indicar si el módulo es mandatorio, es decir se descarga automáticamente o no.
*   Nombre interno del módulo/aplicación (obligatorio). Debe ir sin espacios ni caracteres especiales.
*   Nombre del archivo zip que debe descargar Mi YPF.
*   Versión del módulo.
*   Grupos de Active Directory que tendrán acceso al módulo.
*   Archivo zip con el build del módulo.

### **Integración con el módulo principal de Mi YPF**

La comunicación entre los módulos y el panel principal de Mi YPF es mediante JavaScript handler suscribiéndose a eventos el componente  `**window.flutter_inappwebview**`  donde se podrá enviar una petición y esperar la devolución con los datos

Para poder acceder a esta comunicación se debe suscribir al evento:  `**flutterInAppWebViewPlatformReady**`   recién cuando este evento esté disponible se podrán realizar otras peticiones a las integraciones disponibles

Code snippet HTML Vanilla Javascript:

Code snippet Angular:

### **Integraciones disponibles**

#### **Inicializar módulos**

Con el evento  **InitLocalStorage**  Mi YPF retornará la información del usuario que inició sesión, GUID del módulo, token de acceso y versión del módulo; esta información se puede almacenar en el local storage para tenerlos disponible en el resto del módulo

Valor retornado:

Code snippet:

#### **Cerrar módulos**

Con el evento  **CerrarModulo**  se cierra el módulo y se navega al Panel Principal de Mi YPF

Code snippet:

#### **Información del dispositivo**

Con el evento  **InfoDispositivo**  Mi YPF retornará la información del celular; esta información se puede almacenar en el local storage para tenerlos disponible en el resto del módulo

Valor retornado:

Code snippet:

#### **Escaneo de código QR**

Con el evento  **LeerQR**  se accede a la funcionalidad para escanear un código QR, obteniendo como resultado el código escaneado. Si se cancela el escaneo se retorna NULL.

Valor retornado:

Code snippet:

* * *


# Página: https://isdocs.grupo.ypf.com/base-datos.html

[Saltar al contenido principal](#main)

Base de datos tipo SQL
======================

Introducción
------------

### **Resúmen**

Se desarrolla la guía de estilo para el modelado de bases de datos y programación en SQL de aplicaciones dentro del ámbito de proyectos de YPF S.A.  
Incluye normas de programación y recomendaciones para el buen desarrollo de aplicaciones.

### **Propósito**

Establecer un marco general para el desarrollo y mantenimiento de software que facilite la incorporación de las personas a los proyectos y que permita tener una apariencia y un estilo similar en todos nuestros desarrollos.

**Conceptos Previos: Formas Normales**
--------------------------------------

Una correcta normalización del modelo de datos minimiza la posibilidad de inconsistencias, lo cual simplifica el desarrollo y facilita el mantenimiento.  
En este capítulo se describen las tres primeras formas normales, que se deben tener en cuenta al momento de diseñar un modelo de datos.

### Primera Forma Normal

Un modelo de datos en primera forma normal no tiene atributos multi-valor ni grupos de repetición (conjunto de columnas al mismo efecto).

Ejemplo:  
Tabla con campo multi-valor:  

**Proveedor**

**«** **PK** **» IdProveedor**

**IdRepresentantes**

234

567,235,678

Tabla con grupo de repetición (IdRepresentante1, IdRepresentante2, IdRepresentante3):

**Proveedor**

**«** **PK** **»** **IdProveedor**

**IdRepresentante1**

**IdRepresentante2**

**IdRepresentante3**

234

567

235

678

Al aplicar los requisitos de la primera forma normal a estos ejemplos, se obtiene:

**RepresentanteProveedor**

**«** **PK** **» IdProveedor**

**«** **PK** **» IdRepresentante**

234

567

234

235

234

678

### Segunda Forma Normal

Un modelo de datos está en segunda forma normal cuando está en primera forma normal y, además, para todas sus tablas, todos los campos no integrantes de la clave primaria son totalmente dependientes de la clave.

Ejemplo:

En la tabla Val oracionCompetencia, IdEmpleado y IdCompetencia componen la clave primaria.

**ValoracionCompetencia**

**«** **PK** **» IdEmpleado**

**«** **PK** **» IdCompetencia**

**Nombre**

**Competencia**

**Valor**

78

34

Pérez

Progr. TSQL

8

El campo Nombre del empleado no depende de toda la clave primaria, sino solo de IdEmpleado. Competencia es un campo que solo depende de IdCompetencia.  
Al aplicar los requisitos de la segunda forma normal, se obtienen 3 tablas separadas, a saber:

**Empleado**

**«** **PK** **» IdEmpleado**

**Nombre**

78

Pérez

**Competencia**

**«** **PK** **» IdCompetencia**

**Nombre**

78

Pérez

**ValoracionCompetencia**

**«** **PK** **» IdEmpleado**

**«** **PK** **» IdCompetencia**

**Valor**

78

34

8

### Tercera Form a Normal

Un modelo de datos está en tercera forma normal cuando está en segunda forma normal y, además, para cada una de sus tablas, no existen dependencias transitivas entre sus campos.

  
La tercera forma normal prohíbe las dependencias transitivas. Una dependencia transitiva existe cuando cualquier atributo en una tabla es dependiente de otro campo y éste es quien depende de la clave primaria.  

Ejemplo:  
La tabla Equipo no está en tercera forma normal.

**Equipo**

**«** **PK** **» IdEquipo**

**«** **FK** **» IdPropietario**

**NumeroSerie**

**NombrePropietario**

336

78

SDF-4959-123

Pérez

El campo NombrePropietario depende de IdPropietario, el cual es el campo que realmente depende de la clave primaria. Por ello, el campo NombrePropietario debe ser quitado y colocado en otra tabla (en este caso los posibles propietarios son empleados, los cuales se encontrarán en la tabla “Empleado”):

**Empleado**

**«** **PK** **» IdEmpleado**

**Nombre**

78

Pérez

**Equipo**

**«** **PK** **» IdEquipo**

**«** **FK** **» IdPropietario**

**NumeroSerie**

336

78

SDF-4959-123

Dividiendo los datos en 2 tablas, la dependencia transitiva es removida.

Nomenclatura
------------

Se describen los criterios generales relacionados con la forma de nombrar los distintos elementos de SQL

### **Generalidades**

A continuación, se describen pautas básicas de nomenclatura de los objetos posibles de encontrar dentro de una base de datos (procedimientos almacenados, tablas, vistas, etc.).

Algunos puntos a tener en cuenta:

*   Los nombres de las entidades, procedimientos, etc. deben de perdurar a lo largo de la vida del software, esto es, desde la etapa de concepción hasta la de implementación y mantenimiento.
*   Los nombres deben ser mnemotécnicos y descriptivos, relacionados con los nombres de las entidades del mundo real, siempre que las restricciones técnicas no nos lo impidan.
*   No deben usarse caracteres acentuados, eñes, ni palabras reservadas por el motor de base de datos.

### **Tablas**

Designar las tablas con nombres que hagan referencia a la entidad del diagrama conceptual que le dio origen.  
El nombre de la tabla deberá ser en lo posible un sustantivo en singular, y se empleará la notación Pascal. (ej: Proveedor, Persona, Valoracion, Competencia)  
Para el caso de las tablas asociativas, el nombre deberá hacer referencia a la naturaleza de la relación (ej: ValoracionCompetencia, RepresentanteProveedor)

### **Nombre de visitas**

La misma nomenclatura aplicada para los nombres de tablas, aplica para los nombres de las vistas, pero se plantean algunas excepciones:

1.  Las vistas no siempre representan una entidad simple. Una vista puede ser la unión de varias tablas por una operación del tipo JOIN, por lo que representa los datos de dos o más entidades. En este caso es viable considerar la concatenación de nombres de las entidades, aunque se recomienda utilizar un nombre representativo del resultado de la vista. Por ejemplo, si una vista combina los datos de las tablas Persona y Competencia, la vista podría denominarse PersonaCompetencia , o tal vez CompetenciasDePersona .  
      
    
2.  Las vistas pueden totalizar información de tablas en forma de reportes de datos. En este caso, el nombre de la vista deberá reflejar la situación para hacer comprensible su función. Un ejemplo de esto, podría ser una vista que totalice las ventas de un año determinado. Un nombre de ejemplo para esta vista podría ser  VentaDeProductosTotalizada2022 .

### **Nombres de campos**

Los nombres de los campos de una tabla deben ser representativos de lo que contienen, sin ser extremadamente largos, pero aprovechando la facilidad que brindan los motores de bases de datos actuales de dar a los objetos nombres significativos.  
Todos los campos serán nombrados usando capitalización Pascal, sin guiones bajos ni separadores de ningún tipo.  
El nombre de los campos ID se obtendrá concatenado el prefijo “Id” con el nombre de la tabla. En el caso de claves foráneas, el nombre deberá ser representativo de la naturaleza de la relación, y también deberá estar prefijado por la cadena “Id”. Esta regla se aplica tanto para tablas que representan entidades como para tablas que representan relaciones.

Ejemplo:

Entre los campos de la tabla que registra los equipos de la compañía podemos encontrar:  

**Equipo**

**Columna**

**Descripción**

IdPropietario

ID del empleado responsable por el equipo.

### **Nombres de procedimientos almacenados**

Los procedimientos almacenados se utilizan como punto de acceso a la información, ya sea para realizar consultas o para manipular los datos.  
Los nombres de procedimientos deben describir la acción que realizan, por lo cual se utilizará un verbo representativo de la acción en cuestión.  
La nomenclatura general sería:  
`[PrefijoDeSistemaOModulo_]NombreRepresentativo`  
Donde PrefijoDeSistemaOModulo (opcional) es una cadena de pocos caracteres (en lo posible no más de cuatro) representativa del sistema, subsistema o módulo al cual el procedimiento pertenece.  
En cuanto al prefijo opcional, siempre se debe pensar en qué es lo más representativo y descriptivo como para los futuros equipos de mantenimiento.  
Hay una enorme variedad en las posibles acciones, pero hay algunas que se utilizan con mucha frecuencia y afectan a entidades: inserción, selección, modificación y borrado. En este caso, el NombreRepresentativo del procedimiento se compondrá de la siguiente manera:  
`NombreEntidad_Acción`  
donde Acción es una de las siguientes: Select, Delete, Update, Insert.  
  
Ejemplo:  
Se necesita escribir un procedimiento almacenado para el Sistema Empresarial que retorne la lista de empleados que tienen tres o más equipos a cargo. En este caso, un nombre de procedimiento sugerido sería:  
`se_ListadoEmpleadosSobreequipados      `Ejemplo:  
Debe escribirse un procedimiento almacenado que permita insertar nuevas funciones a la base de datos. El nombre debe ser:  
`se_Funcion_Insert`  
  
En el caso de los procedimientos que seleccionan datos de las tablas con algún criterio, es conveniente que el criterio a utilizar se indique en el nombre del procedimiento, siempre que estos criterios no sean demasiados.  
  
Ejemplo:  
Obtención de datos de un equipo a partir de su número de serie:  
`se_EquipoPorNumeroSerie_Select`  

### **Nombres de variables**

La declaración de variables dentro de los SP deberá seguir, en reglas generales, la nomenclatura establecida para los nombres de los campos de las tablas.


# Página: https://isdocs.grupo.ypf.com/qa.html

[Saltar al contenido principal](#main)

QA
==

Introducción
------------

YPF desde la gerencia de Ingeniería de Software, impulsa la práctica de Testing sobre toda solución (sea proyecto y/o mantenimiento). El proveedor debe velar que la misma se realice de manera correcta de acuerdo con la [normativa de Testing vigente](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7Ba9ee7b48-14e3-4344-9049-4110b57b936d%7D) y los procedimientos ( [análisis y diseño](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/YDOC%20PUBLICADOS/PR__-0002765/Analizar%20y%20dise%C3%B1ar%20escenarios%20y%20casos%20de%20Pruebas%20de%20Sistemas.docx?d=w61ef1c5488d14ce395f450b527659185&csf=1&web=1&e=g0rpnI) , [ejecución](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7B5AC67D3F-DDF1-4916-8EEC-317DED8BB821%7D&cid=384e73d0-3337-4573-870f-07f42bfb5cab) , [gestión de defectos](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7BD60271A1-71D1-47B2-A9E9-073E32AB3011%7D&cid=c1f63f73-8f4c-407b-b38a-0768e700664f) , [uat](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7B6717CFAC-C850-4EC8-986E-035D27681700%7D&cid=9d5fa1b5-64b6-43bb-83eb-c2f8d48d4d72) )  publicados por YPF, con el fin de cumplir con la necesidad del usuario y detectar de forma temprana defectos los cuales implican fallos en la solución y ocasionan incidentes.

Alcance
-------

Se encuentran alcanzadas por esta normativa toda nueva solución que esté planificada para entrar en producción, y todo cambio/corrección que se planifique realizar sobre una solución ya productiva.  
Tipos de soluciones:

*   A medida, el desarrollo de la solución está concebido para un uso específico y particular de un cliente.
*   Enlatado, el desarrollo se constituye en un producto que es el objeto de la adquisición. En mayor o menor grado pueden existir desarrollos complementarios sobre el producto (tipo Z) y/o parametrizaciones a fin de adecuarlo al uso particular de un cliente.
*   SaaS, tanto el desarrollo como la plataforma y servicios que lo soportan, constituyen el producto objeto de la adquisición. Al igual que en el caso del enlatado, pueden existir desarrollos y/o parametrizaciones adicionales

Dependiendo del tipo de solución/implementación podrán determinarse las responsabilidades sobre los distintos niveles de prueba, cuáles deberán gestionarse de manera explícita y ser controlados por YPF, y cuáles serán manejados de manera interna y formarán parte del acuerdo de nivel de servicio del producto / servicio que se adquiera.

Objetivo
--------

**Según ISTQB,** 

*   Proporcionar calidad y confiabilidad sobre el objeto de prueba (componente o sistema a ser probado).
*   Prevenir defectos mediante la evaluación de artefactos como requerimientos, user storys, diseño y código.
*   Verificar que el objeto de prueba este completo y que cumple con los requisitos definidos por el usuario.
*   Detectar defectos los cuales generan fallos en el objeto de prueba.
*   Proveer suficiente información a los interesados para permitir la toma de decisiones con respecto al nivel de calidad del objeto de prueba.
*   Reducir costos y tiempos.

Herramientas para la gestión de prueba
--------------------------------------

*   Azure devops cloud
*   ALM - Application lifecycle management 
    *   *   Test & Feedback (Complemento Chrome para la toma de evidencias)

_**Gestion de permisos para Test & Feedback**_

Solicitar mediante [solcitud interna de aplicación](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Db289500c877a8110aff20f66cebb3565%26sysparm_link_parent%3D411b944c877a8110aff20f66cebb3552%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dcatalog_technical_catalog) (Aplicación: Independiente), al grupo: YPF\_Testing\_management\_office\_FF.

*   Precondiciones:
    *   Realización de cursos de capacitación provistos por la TMO
    *   Aprobación de exámenes provistos por la TMO.

Permisos ALM (Application Lifecycle Management)
-----------------------------------------------

Solicitar mediante [solcitud interna de aplicación](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Db289500c877a8110aff20f66cebb3565%26sysparm_link_parent%3D411b944c877a8110aff20f66cebb3552%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dcatalog_technical_catalog "https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3fv%3d1%26sysparm_id%3db289500c877a8110aff20f66cebb3565%26sysparm_link_parent%3d411b944c877a8110aff20f66cebb3552%26sysparm_catalog%3d742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3dcatalog_technical_catalog%26sysparm_view%3dcatalog_technical_catalog") (Aplicación: Independiente), al grupo: YPF\_Testing\_management\_office\_FF.

*   Recordar que debe indicar los siguientes datos:
    *   USR ID - PEP/CECO - Proveedor - Numero de Contrato - Nombre del Contrato - Resp. Consultora - Mail Resp. Consultora - Resp. YPF - Mail Resp. YPF.
    *   Proyecto en el que van a trabajar
    *   Rol (jefe de proyecto; analista; tester; visualizador; etc.)
*   La TMO, validará la solicitud para avanzar con la asignación de cursos de capacitación y exámenes nivelatorios, según corresponda.
*   Una vez, realizados los cursos y aprobados los exámenes, la TMO asigna los accesos y roles solicitados.

Licencias Azure Devops (Basic + Testplan)
-----------------------------------------

_**Asignación de licencias Basic + Testplan**_

*   Para llevar adelante las actividades de pruebas en Azure devops, se requiere de una licencia "Basic + Testplan", la cual debe solicitase mediante la siguiente [solicitud en ServiceNow.](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Df5eda43487be9110aff20f66cebb35b4%26sysparm_link_parent%3Dd5345de21b42f910db81dd3bdc4bcb4a%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dtext_search)
*   Recordar que debe indicar los siguientes datos:
    *   USR ID - PEP/CECO - Proveedor - Numero de Contrato - Nombre del Contrato - Resp. Consultora - Mail Resp. Consultora - Resp. YPF - Mail Resp. YPF.
*   La TMO, validará la solicitud para avanzar con la asignacion de cursos de capacitación y examenes nivelatorios, según corresponda.
*   Una vez, realizados los cursos y aprobados los exámenes, la TMO aprueba la solicitud y se avanza con la asignación de la licencia.

_**Activación de licencias Basic + Testplan**_

*   _**Diariamente y ante la necesidad de realizar actividades de pruebas en la herramienta**_, el tester debe:
    *   Ingrasar a la plataforma: [Portal Automatización Azure Devops](https://frontend-portal-react-devops-iac-prod.apps.prod.grupo.ypf.com/automation_pipelines "Portal Automatización Azure Devops")
    *   **Activar la licencia** ejecutando la automatizacion: Asignar Licencia Testplan.

_**Importante**_: Todos los días a las 21 hs se corre un proceso que desactiva las licencias Basic + Testplan. Por tal motivo, la activición de la misma se realiza de forma diaria.

Responsabilidades
-----------------

*   Rol Tester, responsable del diseño y ejecución de las pruebas de sistema e integración.
*   Proveedor del servicio
    *   Todo nuevo tester dentro del servicio debe realizar el Onboarding QA YPF, el cual se debe gestionar con la SI - Testing Management Office (SI.TMO@ypf.com).  
        De esta forma se le dará acceso al repositorio donde podrá realizar la capacitación mediante videos y documentación referidos a Metodología y herramientas. (Será obligatorio para rendir la certificación QA YPF).
    *   Solicitud de certificación QA YPF, se deberá gestionar con la SI - Testing Management Office [SI.TMO@ypf.com](mailto:SI.TMO@ypf.com) .
    *   Todo tester que se incorpore al servicio tendrá que rendir la certificación QA YPF, la cual lo habilita a la gestión/diseño de planes y casos de prueba en la herramienta (Azure devops Cloud / ALM).
    *   La certificación consta de 2 exámenes:
        *   Metodología de QA
        *   Uso de herramienta (Azure devops Cloud / ALM)  
            

Alcance y cobertura de pruebas
------------------------------

Toda solución debe ser probada en todos los niveles (respetando el entorno) y con los tipos de prueba que sean necesarios para minimizar el riesgo, una vez operativa, de ocurrencia de incidentes debidos a fallos producidos por defectos.

Este punto se desarrolla en la [normativa de Testing vigente](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7Ba9ee7b48-14e3-4344-9049-4110b57b936d%7D)

Pruebas bajo el control de YPF
==============================

Independientemente del tipo de solución (a medida, enlatado, SaaS), YPF mediante la **Testing Management Office** [SI.TMO@ypf.com](mailto:SI.TMO@ypf.com) llevara adelante pruebas complementarias las cuales validen el correcto funcionamiento de los requerimientos a medida solicitados.

Planes de prueba
================

Independientemente del tipo de solución (a medida, enlatado, SaaS), se debe presentar un Plan de prueba, el cual de un marco de trabajo para las actividades de QA.  
El plan de pruebas debe realizarse de manera específica en cada caso y debe incluir entre otras cosas:

*   Metodología a implementarse.
*   Equipo y responsabilidades.
*   Alcance del objeto de prueba.
*   Tipos y niveles de prueba.
*   Cronograma.
*   Gestión impedimentos, riesgos y defectos.
*   Gestión de entornos y datos.
*   Herramienta para la gestión de pruebas.
*   Condiciones de inicio y fin de pruebas.
*   Entregables y actividades de seguimiento y retroalimentación.

Entornos
========

Según el nivel de prueba, se debe respetar el entorno donde se ejecute. (Por más información consultar la  [normativa de Testing vigente](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7Ba9ee7b48-14e3-4344-9049-4110b57b936d%7D) )

Condiciones para el despliegue en ambientes
===========================================

El despliegue en un entorno podrá realizarse si se cumplen los criterios necesarios de calidad y estabilidad de la solución. Es responsabilidad del líder de desarrollo que se cumplan las condiciones de despliegue a cada entorno.  
  
Los criterios de despliegue son acumulativos, es decir para desplegar en UAT deben cumplirse también los criterios para el entorno de pruebas.  
  
(Por mayor detalle consultar la [normativa de Testing vigente](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7Ba9ee7b48-14e3-4344-9049-4110b57b936d%7D) )

Entregables
===========

Todos los entregables relacionados con el proceso de pruebas y dentro del alcance que especifica la  [normativa de Testing vigente](https://ypf.sharepoint.com/:w:/r/sites/Y-DOC/_layouts/15/Doc.aspx?sourcedoc=%7Ba9ee7b48-14e3-4344-9049-4110b57b936d%7D) deben construirse y resguardarse de acuerdo con lo requerido por YPF.


# Página: https://isdocs.grupo.ypf.com/seguridad.html

[Saltar al contenido principal](#main)

Seguridad
=========

Detección de vulnerabilidades
-----------------------------

### **Introducción**

YPF realiza desde las distintas áreas de seguridad la actividad de detección de vulnerabilidades utilizando diversas herramientas y aplicando controles sobre infraestructura y repositorios de código fuente.  
Desde Ingeniería de software requerimos que toda Aplicación bajo el ámbito de la compañía cuente con un nivel de seguridad alto, para lo cual requerimos se realicen:

*   Escaneos utilizando la herramienta AppScan
    *   SAST (Caja blanca), escaneo estático del código fuente durante el proceso de compilación. (Se ejecuta desde un pipeline de build)
    *   DAST (Caja Negra), escaneo dinámico de la aplicación. (Se ejecuta desde un pipeline de release).
*   Pentest 
    *   Técnica de prueba que tiene como objeto explotar las vulnerabilidades de seguridad en una aplicación e infraestructura.

### **Alcance**

Toda aplicación en etapa de proyecto y/o mantenimiento que:

*   Resguarde su código en un repositorio de YPF. 
*   Publicada dentro y/o fuera de la red de YPF.

### **Objetivo**

Detectar en tiempo y forma las vulnerabilidades que pueden ser explotadas por un atacante externo a la organización.

### **Proceso**

*   Tanto el proyecto como el repositorio de código en Azure devops Cloud se debe solicitar mediante un cambio y/o solicitud interna en Service Now al grupo: YPF\_Implementacion\_y\_despliegues\_central\_FF.
*   El JP o líder técnico debe solicitar al grupo YPF\_INGENIERIA\_DESARROLLO\_FF  (IngenieriaDesarrollo@ypf.com) mediante solicitud interna en Service Now, que se comparta el service connection appscan al proyecto en azure devops cloud.
*   Toda compilación debe realizarse con el template de pipeline de build provisto por Ingeniería de software, el cual contiene las siguientes tareas:
*   Generación del archivo IRX, el cual contiene toda la información de fuentes que serán escaneados.
    *   Ejecución SAST, escaneo estático AppScan con los siguientes parámetros: Source Code Only (Simples).
    *   Validación de Precompilación, ante un error en el armado del archivo IRX, se generará un archivo log, con la información de las observaciones correspondientes.
*   El JP o líder técnico es responsable de que luego de cada compilación se valide el archivo de log resultante (AppScan), para verificar que no haya errores (notificarlos a Ing Sw).
*   El JP o líder técnico debe solicitarle a ciberseguridad el acceso para su equipo a la herramienta appscan cloud para analizar las vulnerabilidades detectadas.
*   Antes de la puesta en producción de la aplicación se deberá solicitar al área de SI seguridad Mon y Control <SI\_seguridad\_MonyControl@ypf.com> que realice el Pentest correspondiente.
*   Ante cualquier duda o problema con el uso de AppScan contactar a la TMO (si.tmo@ypf.com)

Escaneo de código
-----------------

### **Introducción**

YPF impulsa desde Ingeniería de Software la actividad de escaneo de código con el fin de avanzar de forma temprana en la resolución de Bugs, remediación de vulnerabilidades, medición de la cobertura de pruebas unitarias y validación de código mejorable.

Por tal motivo, requerimos que toda aplicación en etapa de proyecto y/o mantenimiento que resguarde su código en un repositorio de YPF cuente con el proyecto correspondiente en SonarQube.

### **Alcance**

Toda aplicación en etapa de proyecto y/o mantenimiento que resguarde su código en un repositorio de YPF.

### **Objetivo**

Detectar de forma temprana Incidencias, vulnerabilidades, mejoras sobre código y faltante de pruebas unitarias sobre las aplicaciones de YPF.

### **Proceso**

*   Toda aplicación la cual se encuentre en etapa de proyecto y/o mantenimiento, debe resguardar el código fuente en un repositorio de Azure devops Cloud.
    *   La solicitud del proyecto y/o repositorio en Azure devops Cloud, se debe avanzar mediante solicitud y/o cambio en Service Now al grupo: YPF\_Implementacion\_y\_despliegues\_central\_FF
*   Toda aplicación debe contar con su proyecto en SonarQube, para lo cual:
    *   Si la compilación se realiza utilizando el template de pipeline de build provisto por Ing. De Software, el cual cuenta con la tarea de escaneo desde SonarQube, el proyecto se genera de forma automática.
    *   Si la compilación NO se realiza utilizando el template de pipeline de build, el JP/Líder será responsable de realizar el cambio y comenzar a utilizar el template. Si el proyecto en SonarQube ya existiese, deberá parametrizar la tarea del pipeline para que ejecute el proyecto de escaneo que corresponda.
*   Permisos sobre el proyecto de SonarQube, el JP/Líder técnico debe solicitar los permisos correspondientes, mediante una solicitud interna al grupo YPF\_arquitectura\_desarrollo\_FF en Service Now.
*   Tratar/Remediar los hallazgos en SonarQube, según severidad (mayor a menor) informada. (Resp: Equipo de desarrollo)
*   Ante cualquier duda o problema con el uso de SonarQube contactar a GPV SI.GPV@ypf.com

AppScan 
--------

Todo desarrollo independientemente de la etapa en la cual se lleve adelante, sea Proyecto o Mantenimiento debe ser escaneado con el objetivo de reducir el riesgo de introducir vulnerabilidades en el código. AppScan realiza un escaneo a bajo nivel y reporta las vulnerabilidades encontradas para que las mismas sean tratadas en base a su criticidad.

La implementacion se realizara en dos fases,

*   Fase 1: Concluye el 1 de julio del 2024 con la activación de las compuertas para las aplicaciones alcanzadas [http://y/appscan20240625](http://y/appscan20240625)
*   Fase 2: Comienza el 2 de julio del 2024, el equipo de arquitectos de ingenieria de software te contactará para que empiece a ser escaneada tu aplicación que no formó parte de la fase 1.

A continuación se listan los diversos procesos que el lider técnico o JP deberá avanzar para ingresar y configurar de forma correcta sus aplicaciones en AppScan. Se entiende por Aplicación el repositorio (Azure devops) escaneado.

### Acceso y permisos

El **_responsable de proyecto/aplicación_**, solicita acceso a la aplicación [AppScan Cloud](https://cloud.appscan.com/main/scans/sast)

Genera mediante Service Now una [solicitud](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Dda54b9d81b751c50544e98aebd4bcbc8%26sysparm_link_parent%3Dd47d84021ba8d4d0544e98aebd4bcb0e%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dtext_search) al grupo:**YPF\_CSEG\_INFRA-APLICACIONES\_CENTRAL\_FF**, indicando:

*   USR ID
*   Nombre y Apellido
*   Mail (YPF) 
*   Assets Group, correspondiente a la Business Unit de la APP.

### Alta de Assets Group

Dentro de AppScan, las aplicaciones se organizan en Assets Group y Business Units, esto permite organizar los escaneos y que cada responsable pueda ver solo lo que le interesa.

El **_responsable de proyecto/aplicación_**, solicita el alta del assets group en AppScan Cloud.

Genera una [solicitud interna](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3D80467c241b9464103f6e4229bc4bcbec%26sysparm_link_parent%3Dc65d97751b34209004f9dd3bdc4bcbcd%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dcatalog_technical_catalog) al grupo: **YPF\_Testing\_management\_office\_FF**, indicando:

*   Assets Group y Business Unit (Solo aplica para aplicaciones criticas o proyectos grandes) 

_**Ingeniería de Software - TMO**_, gestiona el alta con el área de Infraestructura aplicaciones. De esta manera nos permite realizar un seguimiento y control de los Assets Group y Business Units en AppScan.

### Configurar grupos de acceso

Asignación de Assets Group, Business Units y Business Impact en AppScan Cloud.

El **responsable de aplicaciones**, genera una [solicitud](https://ypf.service-now.com/now/nav/ui/classic/params/target/com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Dda54b9d81b751c50544e98aebd4bcbc8%26sysparm_link_parent%3Dd47d84021ba8d4d0544e98aebd4bcb0e%26sysparm_catalog%3D742ce428d7211100f2d224837e61036d%26sysparm_catalog_view%3Dcatalog_technical_catalog%26sysparm_view%3Dtext_search) al grupo: **YPF\_CSEG\_INFRA-APLICACIONES\_CENTRAL\_FF**, indicando:

*   Aplicación en AppScan
*   Asset Group, Business Unit y Business Impact, según corresponda.

Listado:

**Asset Group**

**ID Asset Group**

**Business Unit**

**ID Business Unit**

AESA

2246563d-89ad-4c1b-80aa-8fc0ad6632c9

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Coe IA

8348320d-afa7-4c01-9f0b-bc36fb7a6f53

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Corporación

020078e0-e7e5-403d-8b64-08e948a0f216

Administración

181ee45e-e27c-ee11-ad36-14cb65725114

 

 

MASS CTO

0e0b477b-e27c-ee11-ad36-14cb65725114

Downstream

9b59dbe6-d0db-4643-bdbc-c3e156d92749

Comercial y Logística

130b477b-e27c-ee11-ad36-14cb65725114

 

 

Industrialización

c8821e83-e27c-ee11-ad36-14cb65725114

Ingeniería SW

cd8f6c00-0371-4238-8dd5-274facc2b74e

Arquitectura

cd821e83-e27c-ee11-ad36-14cb65725114

 

 

GIS

e5d02c8b-e27c-ee11-ad36-14cb65725114

 

 

Portales

e6d02c8b-e27c-ee11-ad36-14cb65725114

 

 

QA

a2e1d791-e27c-ee11-ad36-14cb65725114

 

 

Sherepoint

3ce2d791-e27c-ee11-ad36-14cb65725114

 

 

Mobile

adcb5af5-fd19-ef11-8076-14cb65723a9a

 

 

Gestión Documental

dffb4712-fe19-ef11-8076-14cb65723a9a

Ingeniería Integración

e564b154-d084-4251-9509-20b9a332dad0

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Proyectos Corporación

f7ab2cfb-eb7e-435a-baa9-67be786a1484

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Proyectos Downstream

ec086484-bf2c-46a8-8bd6-88bcce754e42

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Proyectos Ingeniería SW

18ebc23a-3f60-4e56-b5ac-0324de4fa524

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Proyectos Retail

1a864062-b61f-4522-bfdf-145e9cd839a5

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Proyectos Upstream

1f6df4be-be49-45a7-a37f-aeffe8d740f2

Sin especificar

a2433498-e27c-ee11-ad36-14cb65725114

Retail

e60bf6a4-5299-410c-b55a-cfb15181bfbd

Captura Vtol D/C BO

1d0d369e-e27c-ee11-ad36-14cb65725114

 

 

Controlador EESS

1f0d369e-e27c-ee11-ad36-14cb65725114

 

 

OPESSA

984d2ea4-e27c-ee11-ad36-14cb65725114

 

 

PassQR AppYPF

9a4d2ea4-e27c-ee11-ad36-14cb65725114

 

 

PRISMA

a02c05b2-e27c-ee11-ad36-14cb65725114

 

 

Retail Comercial Central

a12c05b2-e27c-ee11-ad36-14cb65725114

 

 

Retail tools

f7f244b8-e27c-ee11-ad36-14cb65725114

 

 

Tienda Datared

f9f244b8-e27c-ee11-ad36-14cb65725114

 

 

EESS del Futuro

77e7a981-9a7d-ee11-ad36-14cb65725114

SAP

4917e3cb-edcb-4e01-9483-22d6af610557

Sin Especificar

a2433498-e27c-ee11-ad36-14cb65725114

Sin especificar

f9ee4ae2-0a61-4191-b1cf-26ef94ca4a85

Sin Especificar

a2433498-e27c-ee11-ad36-14cb65725114

Upstream

2c1b726d-7ca1-4fa2-abf7-fa11a23c86b9

CMASS

28b8a3be-e27c-ee11-ad36-14cb65725114

 

 

Control y Produccion

29b8a3be-e27c-ee11-ad36-14cb65725114

 

 

Geociencias

e41be1c4-e27c-ee11-ad36-14cb65725114

 

 

Planificación y Mantenimiento

ec1be1c4-e27c-ee11-ad36-14cb65725114

 

 

Producción Ingenieria y Operaciones

22b6f3ca-e27c-ee11-ad36-14cb65725114

 

 

PyWO Ejecucion

25b6f3ca-e27c-ee11-ad36-14cb65725114

 

 

PyWO Planificacion y Programacion

26b6f3ca-e27c-ee11-ad36-14cb65725114

 

 

Reservas

b658eed0-e27c-ee11-ad36-14cb65725114

 

 

Soluciones Cross

bb58eed0-e27c-ee11-ad36-14cb65725114

 

 

Eficiencia y estándares YPF-Wells

839d41b9-87b6-f011-8e61-000d3adacfa6

Y-Tec

1985e88a-826f-4fd8-a51b-f88dfaafe8e6

Sin Especificar

a2433498-e27c-ee11-ad36-14cb65725114

YCOR\_23059 - Transformación SRC

e1f3dac5-03ab-446b-86b6-544bd986aa86

Sin Especificar

a2433498-e27c-ee11-ad36-14cb65725114

### Visualización de Vulnerabilidades

El consultor técnico,

1.  Ingresa a [AppScan](https://cloud.appscan.com/main/myapps)
2.  Busca la aplicacion de AppScan correspondiente, en general "Organización/ProyectoDevops/Repo".
3.  Ingresá al detalle haciendo click sobre el nombre de la aplicación, para lo cual se visualiza un tablero con el histórico de vulnerabilidades y los escaneos recientes.
4.  Ingresá al escaneo del branch de interés.
5.  Seleccionar la ejecución que corresponde al artefacto, con el fin de visualizar las vulnerabilidades detectadas y activas.
6.  Selecciona una de las vulnerabilidades y se abrirá una ventana con información detallada del hallazgo y recomendaciones de como resolverlo.

### Activación de compuertas

Al finalizar la fase 1 de implementación de AppScan, esta tarea se realizará de forma automática para todas las aplicaciones alcanzadas.

Durante la fase 2, se realizará de forma gradual y de forma automática una vez que esten regularizados los pipelines de build.

### Lógica de compuertas

Al momento de desplegar un artefacto a cualquier entorno se evalúa la compuerta siguiendo la siguiente lógica:

*   Se obtienen todas las vulnerabilidades encontradas al escanear el artefacto a desplegar, se quitan las vulnerabilidades de la línea base (si es que existiese), y se quitan todas las vulnerabilidades que tengan menos de 90 días de encontradas por primera vez en la aplicación; si en el resultante hay al menos una vulnerabilidad alta o crítica la compuerta bloqueará el despliegue.

_**Importante:**_ Al momento de compilar el código se recomienda ingresar a la herramienta AppScan y revisar el resultado. Ante el reporte de nuevas vulnerabilidades, debe planificar su remediación dentro de los 3 meses próximos.

### Tratamiento de falsos positivos

Luego de realizar el análisis de las vulnerabilidades informadas por AppScan y ante la **detección de falsos positivos**,  el responsable tecnico de la aplicación deberá solicitar una mesa de trabajo a los grupos [@IngenieriaDesarrollo](mailto:grupos@IngenieriaDesarrollo) y [@Ciberseguridad Aplicaciones y Datos](mailto:Ciberseguridad_Aplicaciones_y_Datos@ypf.com), con el fin de argumentar su postura y avanzar con el seteo de la vulnerabilidad como "Ruido".

Todo cambio de estado en AppScan será realizado por el área de Ciberseguridad Infraestructura de Aplicaciones. 

Configuración de HTTP header en sitios de YPF 
----------------------------------------------

### Introducción

Como respuesta a la solicitud del equipo de Ciberseguridad de establecer una adecuada configuración del header de la respuesta del servidor en los sitios gestionados por el equipo Soluciones Portales, se avanzó con la actualización masiva de todos los portales respecto a este tema. Luego de la investigación por parte de nuestro equipo, y sucesivas consultas con Ciberseguridad para evacuar dudas, se avanzó con pruebas en algunos sitios, y luego se replicó en el resto de los sitios. Dichas configuraciones se aplicaron en el archivo web.config de cada portal.

A continuación, detallamos cada una de las configuraciones aplicadas.

### Configuraciones aplicadas en web.config

Como se dijo, las configuraciones se aplicaron en el archivo web.config, el cual se utiliza comúnmente en aplicaciones web basadas en tecnologías Microsoft, como ASP.NET. Dentro de este archivo, dentro del bloque <system.webServer> (configuraciones específicas del servidor web) --> <httpProtocol> (configuraciones específicas del protocolo HTTP) --> <customHeaders> (define encabezados HTTP personalizados que el servidor web enviará junto con las respuestas HTTP), vamos a encontrar la siguiente configuración:

### Configuraciones dentro de <customHeaders>

```
<REMOVE NAME="X-POWERED-BY" />
```

Elimina el encabezado "X-Powered-By" de las respuestas HTTP. Este encabezado a menudo se usa para indicar qué tecnología está detrás de un sitio web, pero puede ser una información de seguridad sensible.

* * *

```
<ADD NAME="X-FRAME-OPTIONS" VALUE="SAMEORIGIN" />
```

El encabezado "X-Frame-Options" es una medida de seguridad diseñada para ayudar a prevenir ataques de clickjacking. En el contexto de la configuración proporcionada (SAMEORIGIN), esta política ayuda a prevenir que la aplicación web sea incrustada en iframes de otros dominios, reduciendo así el riesgo de ataques de clickjacking. Solo se permite la incrustación de la aplicación web en iframes que provengan del mismo dominio.

* * *

```
<ADD NAME="X-XSS-PROTECTION" VALUE="1; MODE=BLOCK" />
```

El encabezado "X-XSS-Protection" es una medida de seguridad diseñada para mitigar ataques de scripting entre sitios (XSS) en los navegadores web. Cuando se establece X-XSS-Protection: 1; mode=block, se activa la protección contra ataques XSS en el navegador. El filtro XSS intentará detectar posibles ataques de scripting en el contenido de la página. Si se detecta un intento de XSS, el navegador bloqueará la página para proteger al usuario contra posibles riesgos de seguridad.

* * *

```
<ADD NAME="STRICT-TRANSPORT-SECURITY" VALUE="\[MAX-AGE=86400\]; INLCUDESUBDOMAINS" />
```

El encabezado "Strict-Transport-Security" (HSTS) es una medida de seguridad diseñada para mejorar la seguridad del transporte de datos en una aplicación web. La configuración Strict-Transport-Security con max-age=86400 y includeSubDomains indica que los navegadores deben recordar durante 24 horas (86,400 segundos) que la aplicación web solo debe ser accedida a través de conexiones seguras (HTTPS), y esta política se aplica a todos los subdominios. Esta medida proporciona una capa adicional de seguridad al forzar la comunicación a través de conexiones cifradas, lo que ayuda a prevenir ataques como el "Man-in-the-Middle" (MitM) que podrían comprometer la seguridad de la información transmitida.

* * *

```
<ADD NAME="X-CONTENT-TYPE-OPTIONS" VALUE="NOSNIFF" />
```

El encabezado "X-Content-Type-Options" es una medida de seguridad que ayuda a mitigar los riesgos asociados con ataques de tipo MIME-sniffing en los navegadores web. Cuando se establece X-Content-Type-Options: nosniff, se está indicando a los navegadores que no intenten adivinar o inferir el tipo de contenido de un recurso si el servidor ya ha proporcionado esta información. Esto ayuda a prevenir ataques donde un atacante intenta engañar al navegador para interpretar el contenido de una manera diferente a la especificada por el servidor.

* * *

```
<ADD NAME="REFERRER-POLICY" VALUE="NO-REFERRER-WHEN-DOWNGRADE" />
```

El encabezado "Referrer-Policy" es utilizado para controlar qué información de referencia (referrer) se incluirá en las solicitudes HTTP y cómo se comparte esa información cuando se navega entre diferentes sitios web. Cuando se establece Referrer-Policy: no-referrer-when-downgrade, se está indicando al navegador que no incluya la información de referencia en las solicitudes cuando se produce un cambio de un sitio seguro (HTTPS) a un sitio no seguro (HTTP). Sin embargo, la información de referencia sí se enviará si se navega de un sitio seguro a otro sitio seguro.

* * *

```
<ADD NAME="CONTENT-SECURITY-POLICY" VALUE="DEFAULT-SRC 'SELF' HTTPS: DATA:; STYLE-SRC 'SELF' HTTPS: 'UNSAFE-INLINE'; SCRIPT-SRC 'SELF' HTTPS: 'UNSAFE-INLINE';" />
```

El encabezado "Content-Security-Policy" (CSP) es una medida de seguridad que ayuda a prevenir y mitigar ataques como inyecciones de scripts y otros tipos de ataques de Cross-Site Scripting (XSS) al especificar desde qué orígenes se pueden cargar diferentes tipos de recursos. En este caso específico:

·          Se permite la carga de recursos desde el mismo origen, cualquier origen seguro (HTTPS), y el uso de recursos de datos.

·          Se permite el uso de hojas de estilo (CSS) desde el mismo origen, cualquier origen seguro y estilos en línea.

·          Se permite la carga de scripts desde el mismo origen, cualquier origen seguro, scripts en línea.

### Conclusión

La implementación de las configuraciones proporcionadas en el archivo web.config representa una sólida estrategia de seguridad para fortalecer un sitio web y mitigar diversos riesgos asociados con posibles vulnerabilidades. Cada encabezado y su configuración específica juegan un papel crucial en mejorar la seguridad del sitio. Aquí hay una conclusión general sobre el impacto positivo de estas configuraciones:

#### PREVENCIÓN DE CLICKJACKING Y PROTECCIÓN CONTRA MARCO (FRAME) INSEGURO

El encabezado "X-Frame-Options" con la configuración "SAMEORIGIN" ayuda a prevenir ataques de clickjacking al limitar la inclusión de la aplicación web en marcos de otros dominios.

* * *

#### MITIGACIÓN DE ATAQUES XSS

El encabezado "X-XSS-Protection" con la configuración "1; mode=block" contribuye a mitigar ataques de scripting entre sitios (XSS) al bloquear la carga de páginas que podrían contener scripts maliciosos.

* * *

#### MEJORA DE LA SEGURIDAD DE TRANSPORTE CON HSTS

El encabezado "Strict-Transport-Security" con la configuración "max-age=86400; includeSubDomains" impone el uso de conexiones seguras (HTTPS) durante un período extendido, lo que reduce significativamente el riesgo de ataques de tipo Man-in-the-Middle.

* * *

#### PREVENCIÓN DE MIME-SNIFFING

El encabezado "X-Content-Type-Options" con la configuración "nosniff" evita que el navegador realice el análisis del tipo MIME, reduciendo así la posibilidad de interpretar incorrectamente el tipo de contenido.

* * *

#### CONTROL DE LA INFORMACIÓN DE REFERENCIA

El encabezado "Referrer-Policy" con la configuración "no-referrer-when-downgrade" controla la cantidad de información de referencia compartida entre sitios, mejorando la privacidad y la seguridad.

* * *

#### POLÍTICA DE SEGURIDAD DE CONTENIDO (CSP)

El encabezado "Content-Security-Policy" con una configuración detallada establece políticas estrictas sobre qué recursos se pueden cargar y desde qué orígenes, lo que ayuda a prevenir ataques XSS y protege contra la inclusión de contenido no confiable.

En conjunto, estas configuraciones proporcionan capas de defensa que abordan distintos vectores de ataque comunes en la web moderna. El impacto positivo es significativo, ya que se fortalece la seguridad del sitio web, se reducen las superficies de ataque y se protege la integridad y privacidad de los usuarios.


# Página: https://isdocs.grupo.ypf.com/ux-ui.html

[Saltar al contenido principal](#main)

UX - UI
=======

Inicio
------

### Objetivos

Los lineamientos de UI deben ser tomados como referencia para el diseño de la interfaz gráfica de usuario de cada nuevo proyecto realizado por o para Ingeniería de Software de YPF. Esta guía hace hincapié en las buenas prácticas de la disciplina y fue elaborada de forma agnóstica para evitar su pérdida de vigencia en el corto plazo.

Los lineamientos son orientativos. Su finalidad más importante es garantizar cierto grado de uniformidad gráfica y de características de usabilidad entre los proyectos del área.

Diccionario de términos
-----------------------

Proponemos el uso de estos términos y su correspondiente significado para garantizar el correcto entendimiento entre los diferentes equipos:

### **Wireframes** :

Son esquematizaciones de la interfaz, que nos ayudan a entender la relación entre las personas y el sistema de forma rápida.  
Estos esquemas pueden tener fidelidad:

*   Baja
*   Media
*   Alta

A medida que la fidelidad aumenta se van pareciendo a los mockups.

### **Mockups** :

Son artefactos donde se definen el diseño visual, los colores, las tipografías, las imágenes, etc. El objetivo de los mismos es demostrar cómo se van a representar visualmente los elementos definidos.

### **Prototipos** :

Son artefactos interactivos diseñados para validar un flujo de trabajo. Los prototipos pueden diseñarse para obtener validaciones del negocio o como herramienta para realizar pruebas con usuarios.

### **Maquetas** :

Son la traducción de los mockups o prototipos a código (Ej. HTML / CSS). Comúnmente son realizadas por Desarrolladores Front End como input para los Desarrolladores Back End.

Design System
-------------

### Design System

Se deben respetar los lineamientos de diseño definidos para desarrollos de YPF:

*     Logos
*     Paleta de colores
*     Tipografías
*     Íconos
*   Fotos
*   Contrastes

Solicitar acceso a Lineamientos, Biblioteca y Manuales actualizados a la [Célula de UX de Ingeniería de Software](mailto:martin.garcia.b@ypf.com) .

Heurísticas
-----------

### Principios heurísticos de Jakob Nielsen

#### 01 - Visibilidad del estado del sistema

El sistema debe informar a los usuarios del estado del mismo, dando una retroalimentación apropiada en un tiempo razonable.

Ejemplos:

Estado del sistema mientras se carga información. Permite discriminar si el sistema continúa procesando o se produjo algún error:

**Bien implementado**

Indicaciones de cuánta energía tiene un dispositivo:

**Bien implementado**

Mensajes flotantes tipo “toast”, donde el sistema nos informa si se procesó correctamente o no nuestra solicitud:

**Bien implementado**

#### 02 - Relación entre el sistema y el mundo real

El sistema debe hablar el lenguaje de los usuarios, con palabras, frases y conceptos que sean familiares para ellos en lugar de usar términos propios del mismo (jerga).

Se deben seguir las convenciones del mundo real haciendo que la información aparezca en un orden lógico y natural.

Ejemplos:

El carro de compras, utilizado en la mayoría de los sitios de e-commerce, hace un símil con un objeto que utilizaríamos en la vida real para ir a comprar:

**Bien implementado**

Correlación entre la escritura de un número y fecha de vencimiento de una tarjeta de crédito utilizando campos de un formulario y la visualización de esa información en una tarjeta simulada:

**Bien implementado**

#### 03 - Control y libertad del usuario

Los usuarios suelen realizar acciones por error. Necesitan una "salida de emergencia" claramente marcada para salir de la acción no deseada sin tener que pasar por un proceso prolongado.

Ejemplos:

Gmail permite deshacer la acción de “enviar correo” durante los segundos posteriores a la acción realizada:

**Bien implementado**

Permitir la edición y/o eliminación de un elemento recientemente agregado por el usuario mientras no se haya sido enviado a otra instancia:

**Bien implementado**

#### 04 - Coherencia y estándares

Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Seguí las convenciones de la plataforma y la industria.

Ejemplos:

Elementos o componentes del sistema con diferentes funcionalidades no deberían compartir estilos gráficos similares ya que se dificulta su diferenciación:

**Mal implementado**

(Se utiliza la misma barra azul debajo de títulos y solapas activas)

La misma acción debe estar representada por los mismos iconos en todas las pantallas del mismo sistema:

**Mal implementado**

Si establecemos que la forma de cerrar una ventana modal o un panel emergente es mediante el botón “SALIR”, deberemos continuar con este estándar durante todo nuestro sitio sin introducir variantes:

**Bien implementado**

**Bien implementado**

**Bien implementado**

La ubicación estándar para los botones de aceptación o cancelación difiere entre las distintas plataformas (macOS, Windows, iOS, Android, etc.) Seleccionar la ubicación de los botones según el “Target” de usuarios para los que se esté diseñando:

macOS

Windows

#### 05 - Prevención de errores

Es mejor evitar que los problemas ocurran que diseñar buenos mensajes de error. Deben eliminarse las condiciones que lleven a errores y dar a los usuarios una opción de confirmación antes de ciertas acciones.

Ejemplo:

Al escribir algo en un campo del formulario, el sistema brinda opciones que concuerdan con las letras que se introdujeron, de esta forma se evita que el usuario cometer errores de tipeo que no produzcan resultados:

**Bien implementado**

#### 06 - Mostrar antes que recordar

El sistema debe minimiza la carga de memoria del usuario haciendo visibles los objetos, las acciones y las opciones. Las instrucciones para el uso del sistema deberían ser visibles o estar al alcance del usuario para cuando se requieran.

Ejemplos:

#### 06 - Mostrar antes que recordar

El sistema debe minimiza la carga de memoria del usuario haciendo visibles los objetos, las acciones y las opciones. Las instrucciones para el uso del sistema deberían ser visibles o estar al alcance del usuario para cuando se requieran.

Ejemplos:

Cuando Google nos muestra en una búsqueda a qué links ya ingresamos (links visitados), poniendo el título con otro color:

**Bien implementado**

La visualización de la forma de la fuente en los desplegables de selección:

**Bien implementado**

#### 07 - Flexibilidad y eficiencia de uso

El sistema debe contemplar tanto a usuarios inexpertos como a usuarios expertos. Debe dar opciones simples para los usuarios nuevos y permitir a los usuarios experimentados usar aceleradores y/o personalizar acciones frecuentes. Se debe permitir que los usuarios adapten el sistema para usos frecuentes.

Ejemplo:

La búsqueda de imágenes en Google presenta en primer lugar las opciones más básicas, aunque también nos permite funciones de búsqueda avanzadas para usuarios con necesidades más específicas que incluye más variables:

**Bien implementado**

#### 08 - Diseño estético y minimalista

Los diálogos no deben contener información irrelevante o raramente necesaria. Cada unidad adicional de información en un diálogo compite con las unidades de información relevantes y disminuye su visibilidad relativa.

Ejemplos:

En el flujo de compras del sitio web apple.com podemos ver que la interfaz presenta únicamente los elementos relativos a la acción que desea realizar el usuario, comprar un iPhone 12. Si un usuario requiere más información sobre un tema específico tiene a su alcance vínculos que lo ayudan a ahondar en el mismo:

**Bien implementado**

La página de inicio de este portal contiene la información básica de uso más frecuente para sus usuarios (donaciones pendientes), pero también se puede obtener un listado detallado de todas las donaciones:

**Bien implementado**

**Bien implementado**

#### 09 - Comunicar errores con facilidad

Los mensajes de error deben expresarse en un lenguaje claro, indicar exactamente el problema y sugerir una solución a este.

Ejemplos:

El sistema, ante un formato de contraseña no válido, muestra cuál es el formato adecuado:

**Bien implementado**

En todos los casos en los que se presenta un error, el sistema debe comunicar claramente el problema y sugerir alternativas válidas para el usuario:

**Mal implementado**

#### 10 - Ayuda y documentación

Aunque es mejor que el sistema se puede usar sin ayuda o documentación, puede ser necesario proporcionar estos datos al usuario. Cualquier información de este tipo debería ser fácil de buscar, centrada en la tarea del usuario, enumerar los pasos concretos que se deben llevar a cabo y no ser demasiado extenso.

Ejemplos:

En el proceso de pago de un producto o servicio donde tenemos que ingresar el código de seguridad de la tarjeta de crédito, mostrar una imagen ejemplificando dónde se encuentra este número para que puedan encontrarlo fácilmente los usuarios que lo desconocen:

**Bien implementado**

Enumeración de pasos concretos, simples y rápidos para ayudar en la instalación del Chromecast de Google (quickstart guide):

**Bien implementado**

### Otros principios heurísticos:

#### Anticipar las necesidades del usuario:

Los usuarios prefieren hacer el mínimo esfuerzo al realizar una tarea, es por esto por lo que necesitamos diseñar para anticipar sus necesidades.

Ejemplos:

Mostrar información relacionada a un evento que está por ocurrir:

*     Posibilidad de solicitar un cambio de hardware basado en la obsolescencia del equipo que tengo asignado en mi empresa.
*   Instructivos de uso recomendado basándonos en las últimas interacciones con soporte técnico (temas relacionados con los que solicitó ayuda, tickets rechazados, tickets derivados, etc.)

Verificar posibles olvidos del usuario mediante la interpretación de su intención:

**Bien implementado**

#### Verificar que no exista banner blindness:

Muchas veces los usuarios no ven la información que se les presenta ante sus ojos debido al **bloqueo que solemos hacer de todo lo que consideremos publicidad o promoción** (banner blindness).

Existen **3 razones por las que el contenido legítimo es entendido como publicidad** :

*   Cuando utilizan  **ubicaciones específicas de los anuncios** como la parte superior o la barra derecha de las páginas.
*     Cuando utiliza un **tratamiento visual similar al de la publicidad** .
*   Cuando  **está cerca de una publicidad real** .

Ejemplo:

El destacado ¿Qué querés hacer? Junto con los botones “Nuevo pago” y “Recarga de celular” podrían ser percibidos como publicidad con la consecuente causa de “ceguera” por parte del usuario:

#### Formatear los textos para permitir el escaneo visual de los mismos:

*   Utilizar  **muchos títulos** para separar el texto en secciones.
*   En caso de utilizar  **subtítulos,** verificar que estén **obviamente jerarquizados** .
*   Convertir los  **textos en listas** cuando sea posible.
*   Si los elementos listados tienen un orden, utilizar  **listas ordenadas** .
*   **Resaltar** palabras claves.

**Mal implementado**

**Bien implementado**

#### Comprobar la jerarquía de títulos y subtítulos:

Las jerarquías deben ser claramente identificables. Se aplica el precepto de usabilidad acuñado por Steve Krug “no me hagas pensar”.

**Mal implementado**

**Bien implementado**

#### Comprobar la posición de títulos o subtítulos:

El usuario debe entender claramente a qué párrafo pertenece el título o subtítulo que está leyendo.

**Mal implementado**

**Bien implementado**

#### Comprobar la distancia entre ítems de las listas:

Dejar una distancia entre cada ítem de la lista ayuda a su lectura y escaneo visual.

**Mal implementado**

**Bien implementado**

#### Comprobar los nombres de páginas:

*   **Cada página necesita un nombre.**
*   El nombre debe ser  **prominente** .
*   E l nombre debe **coincidir con la palabra que se ha cliqueado** .

**Bien implementado**

#### Mantener una diferencia entre los links visitados y los no visitados:

**Bien implementado**

#### Verificar las características generales para TODOS los elementos con interacción (botones, celdas, acordeones, tabs, etc.):

*   La presencia de interacción debe estar indicada mediante el **“ cursor : pointer ;”** (manito)
*   El área clickeable debe coincidir con la del efecto elegido para el selector “:hover”
*   El área clickeable debe extenderse a todo el elemento
*   El elemento debe capturar correctamente el foco

#### Evitar utilizar valores puros de blanco (#FFFFFF) y negro (#000000):

El uso de los tonos puros de máxima y mínima luminosidad tienen un contraste demasiado alto, que puede causar molestias visuales en su visualización prolongada a través de pantallas. Por este motivo, se sugiere reemplazar estos valores por variaciones ligeramente distintas.

Algunos de los beneficios de esta práctica son:

*   Menor esfuerzo óptico
*   Menor carga cognitiva para leer
*   Mayor fluidez en la lectura
*   Mayor facilidad en lecturas prolongadas

Ejemplo:

**Mal implementado**

**Bien implementado**

**Mal implementado**

**Bien implementado**

Diseño de componentes
---------------------

### Estados e interacciones

Todos los estados de los elementos que tengan interacción deben estar diseñados y correctamente documentados (Ejemplos según el caso: Default, Enabled, Disabled, Focus, Hover, Visited, Active, Error):

El estado “Focus” debe ser más relevante que el “Hover” ya que el estado “Focus” es el que permite la correcta navegación por teclado. No se debe asignar la relevancia solamente por color:

**Bien implementado**

El diseño de los estados no debe coincidir para permitir distinguirlos en caso de que se presenten al mismo tiempo:

**Mal implementado**

  Todo elemento de la UI con interacción debe tener asignado por CSS el “cursor: pointer” (manito):

**Bien implementado**

### Alineación:

#### Números, fechas y tipos de monedas

Deben estar alineados a la derecha. Los números son más fáciles de comparar cuando están alineados a la derecha.

#### Textos

Deben estar alineados a la izquierda para mejorar la experiencia de lectura occidental (de izquierda a derecha).

**Bien implementado**

**Bien implementado**

#### Íconos

Centrar los íconos entre ellos y alinear los textos a la izquierda:

**Bien implementado**

#### Alineación de elementos y grilla:

Definir una grilla en base al framework de maquetado que se quiera utilizar (ejemplo Bootstrap, grilla de 12 columnas con 30 pixels de separación) alineando los elementos de la UI dentro de las columnas a utiliza:

**Bien implementado**

**Bien implementado**

### Tablas

#### Encabezados de tablas:

Deben estar correctamente resaltados para tener mayor jerarquía visual.

**Mal implementado**

**Bien implementado**

#### Bordes de las filas y columnas:

Deben ser de un color suave que permita estructurar el contenido sin interrumpir la lectura y escaneo de la información.

**Mal implementado**

**Bien implementado**

#### Alto y ancho de celdas:

Deben tener tamaños que aseguren una buena legibilidad del contenido. Sugerimos utilizar las recomendaciones de [Google](https://m2.material.io/components/data-tables#specs) (Alto de cabeceras de 56pts y el resto de 52pts, espaciado entre columnas de 32pts, 16+16)

**Mal implementado**

**Bien implementado**

#### Alineación de contenidos:

Los textos deben alinearse a la izquierda y los números a la derecha.

**Mal implementado**

**Bien implementado**

#### Estados:

Se deben utilizar tags o diferenciar de algún otro modo los estados.

**Mal implementado**

**Bien implementado**

#### Fondo de filas:

Al desplazarse entre filas seleccionables, el fondo tiene que destacarse con un color diferente. Al seleccionar una fila, y mientras dure la selección, el fondo tiene que destacarse con un color diferente.

**Mal implementado**

**Bien implementado**

### Buscador

#### Usar icono de la lupa:

Utilizar un icono esquemático, la versión más sencilla de la lupa.

**Bien implementado**

#### Mostrar el campo de búsqueda de forma destacada:

Si la búsqueda es una función importante para su aplicación/sitio, debe mostrarse de manera destacada, ya que puede ser la ruta más rápida de descubrimiento para los usuarios.

Es importante mostrar el campo de texto abierto completo, porque la búsqueda oculta detrás del ícono hace que la función de búsqueda sea menos perceptible y aumenta el costo de la interacción.

**Mal implementado**

**Bien implementado**

#### Adecuar el tamaño del campo

Una regla general que ofrece buenos rendimientos es establecer el campo de texto para 27 caracteres. De esta manera se cubre el 90% de las consultas.

#### Simplificar el diseño del buscador

Será preciso asegurarse de un planteamiento sencillo. Mostrar las opciones de búsqueda avanzada de forma predeterminada añade carga cognitiva y podría confundir a los usuarios. Será por tanto aconsejable crear un desplegable o apartado para acceder a las opciones de búsqueda avanzada.

#### Proporcione un botón de búsqueda para el cuadro de búsqueda

Un botón ayuda a las personas a reconocer que hay un paso adicional para activar la acción de búsqueda.

Poco evidente

Evidente

Más evidente

Muy evidente

#### Usar el placeholder para orientar al usuario

Es muy útil aprovechar el placeholder en el campo de búsqueda para informar a los usuarios acerca de las acciones que pueden realizarse a través del buscador. Si el buscador realiza búsquedas específicas debe estar aclarado. Hay que tener en cuenta que esta orientación no deberá contener demasiadas palabras para reducir la carga cognitiva.

#### Usar un solo buscador ubicado en el mismo lugar

Aunque la información a buscar sea de diferente tipo, por ejemplo: contenido, imágenes, personas, documentos, herramientas, etc. el buscador debe ser el mismo en todo el sitio. Debemos evitar tener distintas instancias del buscador para evitar confusión.

#### Paginación de resultados

Utilizar la paginación en lugar del scroll infinito o el botón “ver más”. La paginación hace que el usuario se sienta mejor ubicado. Si no encuentra lo que está buscando en la página pasa a la siguiente, pero puedo regresar fácilmente a un punto determinado que recuerde. La paginación debe tener la posibilidad de seleccionar la cantidad de ítems que se mostrarán por página.

### Botones

Los botones sirven para guiar al usuario a una acción. Se debe poder distinguir visualmente los botones con acciones primarias (ejemplo “Enviar”) de los botones con acciones secundarias (ejemplo “cancelar”), terciarias, etc.

#### **Botones primarios**

Se utiliza la jerarquía visual para establecer la importancia, es por ello que los botones principales son sólidos y tienen un alto contraste.

#### **Botones secundarios**

Son acciones que un usuario puede realizar y que no son tan importantes como la acción principal.

#### **Botones terciarios**

Se puede usar un botón terciario cuando una acción no es de uso frecuente para la mayoría de los usuarios.

**Bien implementado**

Si se opta por indicar el estado “disabled” modificando la opacidad del elemento, se debe tener en cuenta que éste no quede con mayor relevancia que el resto. En ese caso es conveniente modificar tanto la opacidad como la saturación de color:

**Mal implementado**

**Bien implementado**

**Bien implementado**

Los botones deben tener una correcta diferenciación con otros elementos de formularios como por ejemplo los inputs:

**Mal implementado**

### Tabs

La pestaña activa debe estar correctamente diferenciada del resto y gráficamente conectada con el contenido al que hace referencia:

Mal implementado

Mal implementado

Bien implementado

### Breadcrums

Las breadcrums no son necesarias (o útiles) para sitios con jerarquías que tienen solo 1 o 2 niveles de profundidad, o sitios que tienen una estructura lineal. Para estos casos lo recomendable es indicar claramente la sección de nivel superior o la categoría en la que se encuentra la página.

En caso de utilizar breadcrums tener en cuenta:

*     El ítem inicial siempre debe ser la home.
*     Mostrar la ubicación actual como el último ítem.
*   La ubicación actual no debe tener link.
*   Si las breadcrums tienen muchos ítems considerar mostrar solamente los últimos niveles.
*   No utilizar las breadcrum cuando se parten en múltiples líneas o hacer uso del recurso #4 para que esto no pase.

### Formularios

#### Preferentemente utilizar columna simple:

Las múltiples columnas presentan un interrogante para el orden de lectura del formulario.

**Mal implementado**

**Bien implementado**

#### Preferentemente, utilizar largos de campo acordes a su contenido:

Esto ayuda a que el usuario comprenda rápidamente la cantidad de datos que debe tener el campo en cuestión.

Emplear esta técnica en campos con largos predefinidos como el código postal, números de teléfono, tarjetas de crédito, etc.

**Mal implementado**

**Bien implementado**

#### Preferentemente, posicionar las etiquetas sobre los campos:

Preservan el orden de lectura de arriba hacia abajo. En un formulario largo podría utilizarse la alineación de las etiquetas a la izquierda ya que son más fácilmente escaneables y comparables y reducen la altura total del formulario. En este caso el largo de las mismas debería ser similar.

**Mal implementado**

**Bien implementado**

#### No utilizar etiquetas dentro de los campos de texto de formularios extensos:

Cuando tenemos un formulario con muchos campos y éstos están completos perdemos la referencia de su significado ya que muchas veces los datos son difíciles de diferenciar a simple vista (fechas, números). Este tipo de prácticas trae aparejado además varios problemas de accesibilidad para el uso de formularios.

**Mal implementado**

**Bien implementado**

#### **Etiquetas animadas**

En casos excepcionales se podrían utilizar etiquetas animadas que se posicionan dentro del input hasta que un usuario ingresa un texto en el campo del formulario y esto hace que cambien su posición hacia arriba del mismo.

**Bien implementado**

#### Relacionar correctamente las etiquetas con sus campos:

De esta forma se consigue una agrupación visual que ayuda al usuario a escanear el contenido y entender más rápidamente la estructura del formulario.

**Mal implementado**

**Bien implementado**

#### No utilizar las etiquetas TODAS en MAYÚSCULAS para mejorar su escaneo:

Las palabras escritas todas en mayúsculas son más difíciles de leer y escanear (esto aplica para los formularios y para el resto de los contenidos).

**Mal implementado**

**Bien implementado**

#### No utilizar selects si las opciones son menos de seis (6):

Las opciones dentro de los selects requieren dos clics para poder seleccionarse. Además, permanecen ocultas hasta desplegar el select. Usar el select solamente cuando se tengan 6 opciones o más.

**Mal implementado**

**Bien implementado**

En el caso de tener más de 25 opciones utilizar un select con buscador (ejemplo [https://tom-select.js.org/)](https://tom-select.js.org/\))

#### Posicionar checkbox y radiobuttons uno debajo del otro:

Preservan el orden de lectura de arriba hacia abajo y son más simples de escanear.

**Mal implementado**

**Bien implementado**

#### Los CTA (call to action) deben ser descriptivos:

Es mejor utilizar un Call To Action que describe la acción que se realizará al tocarlo que uno genérico que se usa para todas las acciones.

**Mal implementado**

**Bien implementado**

#### Mostrar los errores donde suceden:

Además, el error debe estar bien descripto y en un lenguaje comprensible.

**Mal implementado**

**Bien implementado**

#### Preferentemente, no ocultar las ayudas básicas:

Una ayuda más compleja podría ubicarse al lado del campo o de su etiqueta.

**Mal implementado**

**Bien implementado**

#### Diferenciar la acción primaria de la secundaria:

Preguntarse si realmente la acción secundaria debería estar (dejarla solamente en el caso de que sea útil para el usuario).

**Mal implementado**

**Bien implementado**

#### Agrupar información relacionada:

Los usuarios piensan en bloques y los formularios largos podrían resultar bastante tediosos para ellos.

Creando agrupamientos lógicos para los campos lograremos utilizar esta ventaja, el formulario parecerá menos tedioso y el usuario logrará comprenderlo en su totalidad de una forma más simple y rápida.

**Mal implementado**

**Bien implementado**

UX
--

[Ver presentación UX](documents/ux/1-Diseno-impulsado-por-UX.pdf)

Fuentes consultadas
-------------------

### Heurísticas

[10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/)  
Nielsen Norman Group – 15/11/2020

[Banner Blindness Revisited: Users Dodge Ads on Mobile and Desktop](https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/)  
Nielsen Norman Group – 21/04/2018

[Contrast and font-weight — A modern design issue on non-retina displays](https://uxplanet.org/contrast-and-font-weight-a-modern-design-issue-on-non-retina-displays-62c6ac6319c5)  
UX Planet – 17/06/2020

[Don’t Make Me Think, Revisited](https://sensible.com/dont-make-me-think/)  
Steve Krug – 2014

[How Font-Weight Improves Text Readability](https://uxmovement.com/content/how-font-weight-improves-text-readability/)  
UX Movement – 06/01/2022

[Match Between the System and the Real World: The 2nd Usability Heuristic Explained](https://www.nngroup.com/articles/match-system-real-world/)  
Nielsen Norman Group – 01/07/2018

[Memory Recognition and Recall in User Interfaces  
](https://www.nngroup.com/articles/recognition-and-recall/)Nielsen Norman Group – 06/07/2017

[Never use pure black in typography](https://uxplanet.org/basicdesign-never-use-pure-black-in-typography-36138a3327a6)  
UX Planet – 04/04/2021

[The zero-touch customer experience](https://www.ericsson.com/en/reports-and-papers/consumerlab/reports/the-zero-touch-customer-experience)  
Ericsson – 05/2018

[Typography: Visual Hierarchy](https://buninux.com/learn/typography-sizing)  
Bunin UX – 05/08/2021

[Visibility of System Status (Usability Heuristic #1)  
](https://www.nngroup.com/articles/visibility-system-status/)Nielsen Norman Group – 03/06/2018

[Why You Should Never Use Pure Black for Text or Backgrounds](https://uxmovement.com/content/why-you-should-never-use-pure-black-for-text-or-backgrounds/)  
UX Movement – 08/05/2018

### Diseño de componentes

[Alignment in UI: The Invisible Structure Behind Designs](https://aelaschool.com/en/visualdesign/alignment-ui-invisible-structure-behind-designs/)  
Aaela School - 03/06/2022

[Breadcrumbs: 11 Design Guidelines for Desktop and Mobile](https://www.nngroup.com/articles/breadcrumbs/)  
Nielsen Norman Group – 23/12/2018

[Buenas prácticas UX - Diseñando el buscador perfecto](https://www.torresburriel.com/weblog/2020/04/08/buenas-practicas-ux-disenando-el-buscador-perfecto/)  
Torres Burriel – Blog – 08/04/2022

[Cómo diseñar un buscador UX para una experiencia de usuario óptima](https://www.iebschool.com/blog/como-hacer-el-diseno-ux-del-buscador-de-productos-para-un-mobile-ecommerce-analitica-usabilidad/)  
IEBS School Bblog– 16/05/2022

[Data Tables](https://m2.material.io/components/data-tables)  
Material Design 2

[Design Better Forms](https://medium.com/nextux/design-better-forms-96fadca0f49c)  
Medium - 05/07/2016

[Design a Perfect Search Box](https://uxplanet.org/design-a-perfect-search-box-b6baaf9599c)  
UX Planet – Blog – 28/02/2017

[Designing Button States](https://cloudfour.com/thinks/designing-button-states/)  
Cloud Four - 13/03/2018

[Intranet-Search Essentials](https://www.nngroup.com/articles/intranet-search/)  
Nielsen Norman Group – 22/05/2022

[UI Design Tips for a Better Data Table](https://uxmovement.substack.com/p/ui-design-tips-for-a-better-data)  
UX Movement Newsletter – 29/09/2022


# Página: https://isdocs.grupo.ypf.com/gdoc.html

[Saltar al contenido principal](#main)

GDOC
====

Diseño técnico documentum  
---------------------------

### **Objetivos y alcance**

\[Indicar el objetivo del documento orientándolo al proyecto. Se recomienda aclarar que este documento persigue delimitar el diseño del sistema basado en el gestor documental Documentum desde un punto de vista funcional y técnico. Se debe referenciar a la documentación de requisitos generada en la fase anterior\]

### **Arquitectura física y productos utilizados**

\[Incluir la arquitectura física del sistema documental empleada para el proyecto o referenciar al documento en el que se describe la misma.\]

#### **Diagrama de arquitectura**

\[Incluir un esquema de la arquitectura física del sistema documental.\]

#### **Interfaces / integraciones   con otras aplicaciones**

\[Integraciones con otras Aplicaciones\]

**Descripción**

**Correlación de los campos**

**Campo fuente**

**Campo destino**

**Relación**

**Frecuencia de transferencia**

**Tratamiento de errores**

  

Dónde:                

**Descripción:** descripción de la integración con otra aplicación

**Correlacion de los campos:** relación entre campos fuente y destino

**Frecuencia de la transferencia:** frecuencia de ejecución del proceso de transferencia entre sistemas

**Tratamiento de errores:** descripción del tratamiento de errores en el proceso de transferencia

### **Tipología documental**

\[Dentro de Documentum todo son objetos, por lo que de cara a clasificar cada uno de éstos se define la tipología documental. Mediante el mecanismo de herencia, cada una de los _subtipos_ de un determinado tipo documental hereda cada una de los atributos del _supertipo_ , y su comportamiento funcional. \]

#### **Esquema genera**

\[Esquema de los tipos documentales que se generarán para el proyecto. En el mismo se deben reflejar los mecanismos de herencia para cada uno de los tipos documentales\].

#### **\[Tipo documental\]**  

\[Indicar aspectos funcionales del tipo documental dentro del proyecto\].

##### Ficha documental  

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con la Tipología documental, definidos en el documento de Análisis Funcional correspondiente.\]

\[Detallar cada uno de los metadatos que contiene este tipo documental según la tabla adjunta\].

**Nombre**

**Tipo**

**Lista**

**Obligatorio**

**Multivalor**

**Descripción**

Dónde:  

**Nombre:** nombre del metadato

**Tipo:** tipo simple de dato. P.e. : texto (128), Fecha, entero(5), …

**Lista:** si admite o no lista de valores.

**Obligatorio:** si es de obligado cumplimiento.

**Multivalor:** si es múltiple o admite más de un valor

**Descripción:** detalle funcional del campo.

##### **\[Lista de valores\]**

\[Enumerar los diferentes valores que puede contener un metadato\].  

##### **\[documentos virtuales\]**  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con la Documentación Compuesta, definidos en el documento de Análisis Funcional correspondiente.\]

\[Si el Tipo Documental descrito va a tener asociados Documentos Virtuales, describir la organización de estos documentos compuestos según la tabla adjunta.\]

**Nombre genérico del elemento raíz**

**Componente**

**Padre**

**Formato**

Dónde:  

**Nombre:** nombre genérico de la raíz del documento virtual

**Componente:** nombre genérico del componente del documento virtual.

**Padre:** nombre genérico del documento padre.

**Formato:** formato del componente **.**

### Organización de la documentación  

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con el Modo de Acceso a la documentación, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar cómo se va a estructurar la documentación dentro del repositorio documental. Ésta estará compuesta por archivadores y carpetas, de forma que en función del aspecto funcional de la documentación, tendrá una ruta concreta\].  

      _<Repositorio documental>_

_<Archivador>_

_<carpeta nivel 1>_

_<<carpeta nivel 2>_

### Grupos

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver la Segregación de Funciones, definidas en el documento de Análisis No Funcional correspondiente.\]

\[Indicar los grupos funcionales que contendrá la aplicación. La pertenencia o no a estos grupos definirá entre otras cosas el nivel de acceso a la documentación. Como base, se ofrece la siguiente tabla adjunta en la que se detalla el nombre y una breve descripción del aspecto funcional. \]

**Nombre de grupo**

**Descripción funcional**

###   **ACLS**

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver la Segregación de Funciones, definidas en el documento de Análisis No Funcional correspondiente.\]  

\[Las políticas de seguridad o ACLs definen el nivel de seguridad de acceso a la documentación. Indicar las diferentes políticas de seguridad que se contemplan en el sistema.

\]

#### Descripción y uso  

\[Hacer referencia a cuándo y como se aplican dichas políticas: p.e. basada en carpetas, usuario o tipo documental, quién es el encargado de asignar dicha seguridad…\]  

\[Indicar el Objeto Documental específico (Carpeta, Tipo Documental, Usuario) al que se asocia la ACL.\]

#### Composición  

\[Descomponer la política de seguridad en base a grupos y/o usuarios, y los permisos asociados\]

**Grupo/Usuario**

**Permisos básicos**

**Permisos extendidos**

Dónde permisos básicos:  

**Permiso**

**Descripción funcional**

NONE

El usuario no puede ver ni los atributos ni el contenido de un documento.

BROWSE

El usuario puede navegar por la estructura de carpetas   y ver los atributos del documento pero no su contenido.

READ

El usuario puede leer los atributos y el contenido de un documento pero no puede actualizarlo.

RELATE

El usuario puede hacer anotaciones en el contenido del documento.

VERSION

El usuario puede hacer versiones del documento.

WRITE

El usuario puede editar, escribir y hacer nuevas versiones del documento.

DELETE

El usuario puede eliminar el documento.

Y permisos extendidos:

**Permiso**

**Descripción funcional**

Change Location

El usuario tiene permiso para mover un objeto de una carpeta a otra.

Change Ownership

El usuario puede cambiar el propietario de un objeto.

Change Permission

El usuario puede cambiar los permisos básicos asignados sobre un objeto.

Change State

El usuario puede cambiar el estado de un objeto, aplicando un ciclo de vida predefinido.

Delete Object

El usuario puede eliminar el objeto con independencia de los permisos básicos

Execute Procedure

El usuario puede ejecutar procedimientos externos asociados al objeto.

Change Folder Links

El usuario puede enlazar o desenlazar un objeto a o de una carpeta.

### **_SBO_**

\[Indicar los objetos de negocio con interfaz de servicio creados específicamente para este proyecto.\]

#### SBO  

**Nombre**

**Descripción**

_\[Lista de funcionalidades.\]_

**Parámetros**

**Funcionalidad**

 

 

 

#### _TBO_  

\[Indicar los componentes de lógica de negocio añadidos para un tipo documental determinado.\]  

#### \[tbo\]  

**Nombre**

**Descripción**

_\[Lista de funcionalidades.\]_

**Tipo documental**

_\[Tipo documental al que se asocia el comportamiento.\]_

**Método**

**Nombre**

**Parámetros**

**Funcionalidad**

#### Servicio web  

\[Indicar los objetos de negocio con interfaz de servicio SOA, y basado en DFS, creados específicamente para este proyecto.\]  

#### \[SERVICIO WEB\]  

**Nombre**

**Descripción**

_\[Lista de funcionalidades.\]_

**Método**

**Nombre**

**Parámetros**

**Funcionalidad**

#### _MÉTODO_  

\[Indicar los métodos creados específicamente para este proyecto.\]  

#### **\[Método\]**

**Nombre**

**Descripción**

_\[Descripción del objetivo.\]_

**Parámetros de definición**

**Argumentos**

**Funcionalidad**

 

 

 

####   _jobs_

\[Indicar los jobs creados específicamente para este proyecto.\]  

#### \[JOB\]  

**Nombre**

**Descripción**

_\[Descripción del objetivo.\]_

**Método asociado**

**Parámetros de definición**

**Argumentos**

**Funcionalidad**

 

 

 

###   PERSONALIZACIONES

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar la lista de personalizaciones realizadas a nivel de cliente wdk.\]  

#### _preset_  

\[La personalización basada en presets acota el conjunto de acciones que puede ejecutar un usuario en determinadas condiciones. Por ejemplo, los formatos que puede seleccionar un usuario al importar un determinado documento. Aquí se deben indicar los que se aplican y en que condiciones. \]  

#### **_\[PRESET\]_**  

**Nombre**

**Descripción**

**Escenario**

_\[Descripción del escenario en el que aplica el preset. Por ejemplo, estar en una determinada carpeta en un repositorio concreto. \]_

**Acciones**

_\[Indicar la lista de acciones a realizar. Por ejemplo, sólo puede importarse un determinado formato de documento de un determinado tipo documental. \]_

#### _WDK_  

\[WDK (Web development Kit) es la plataforma de desarrrollo web de Documentum. Está basada en una serie de componentes definidos en unos ficheros de configuración XML. Aquí se deben indicar la lista de componentes wdk añadidos/modificados para modificar los aspectos de presentación (personalizar). \]  

#### _\[COMPONENTE\]_  

**Nombre**

**Descripción**

_\[Descripción debe incluir si es nuevo o modifica uno existente.\]_

**Configuración**

_\[Indicar funcionalidad añadida/modificada en configuración.\]_

**JSP**

_\[Indicar funcionalidad añadida/modificada en JSP.\]_

. 
==

### Ciclos de vida

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con los Ciclos de Vida documentales, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar los diferentes ciclos de vida que pueden aplicarse a la documentación.\]

#### _\[CICLO DE VIDA\]_  

\[Indicar a qué tipo documental va asociado este ciclo de vida.\]

**Nombre**

**Descripción**

**Tipo documental primario**

_\[Tipo documental al que puede ser aplicado \]_

**Tipos documentales secundarios**

_\[Tipos documentales hijo a los que se puede aplicar \]_

#####   _\[ESTADO\]_  

\[Indicar los diferentes estados por los que puede pasar la documentación. Se podrá incluir algún diagrama para representar gráficamente el circuito. \]  

**Nombre**

**Descripción**

**Condiciones de entrada**  

_\[Condiciones que debe cumplir para entrar en este estado.\]_

**Acciones antes de entrar**

_\[Acciones a realizar antes de entrar en el estado.\]_

**Acciones después de entrar**

_\[Acciones a realizar cuándo ya se ha producido la transición.\]_

### **Procesos**

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con los Flujos de Trabajo documentales, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar las diferentes plantillas de procesos o flujos de trabajos que pueden existir.\]

#### _\[PLANTILLA PROCESO\]_

**Nombre**

**Descripción**

**Paquetes**

_\[Lista de tipos documentales que puede admitir como paquete. Indicar si es o no obligatorio. \]_

**Variables**

_\[Lista de variables de proceso que puede contener.\]_

#### _\[ACTIVIDAD\]_  

\[Indicar las diferentes actividades que contiene el proceso, se podrá incluir algún diagrama para representarlo gráficamente.\]  

**Nombre**

**Descripción**

_\[Debe incluir si la actividad es manual o automática.\]_

**Puntos de entrada**

_\[Lista de actividades de entrada. Cada una de ellas debe incluir si es de rechazo o no. Asimismo, especificar el mecanismo de transición (todas las actividades, una de ellas,…)\]_

**Variables**

_\[Lista de variables de proceso que puede contener incluida una pequeña descripción funcional.\]_

**Destinatarios**

_\[En el caso de ser una actividad manual, lista de destinatarios de la actividad._ _Especificar asimismo los mecanismos de adjudicación (todos, uno, …) \]_

**Método**

_\[En el caso de ser una actividad automática, especificar el método de invocación. Caso de ser uno creado específicamente para el proyecto (en_ _7.4_ _), hacer la referencia adecuada. \]_

###  **T ransformaciones de contenidos**

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con las Transformaciones de Contenidos, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar las Transformaciones entre formatos que pueden existir en la Aplicación.\]

### Modos de contribución  

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con los Modos de Contribución, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar si en la contribución asociada a la Aplicación van a existir Plantillas almacenadas en el Repositorio.\]  

#### plantillas asociadas  

\[Especificar si los Tipos Documentales existentes en la Aplicación tienen Plantillas asociadas para su contribución.\]  

**Tipo Documental**

**Formato Origen**

**Modo de Contribución**

**Plantilla**

**SI**

**NO**

Dónde:  

**Tipo Documental:** nombre del tipo documental

**Formato de origen:** formato de origen del documento

**Plantilla:** indica si va a existir en el Repositorio una plantilla asociada para dicho Tipo Documental y Formato Origen

### Búsquedas

\[Caso/s de Uso/s que resuelve: Caso de Uso X, Caso de Uso Y\]  

\[En este apartado se detallarán las soluciones técnicas adoptadas para resolver los Casos de Uso relacionados con las Búsquedas documentales, definidos en el documento de Análisis Funcional correspondiente.\]  

\[Indicar las búsquedas o consultas contra el Repositorio que se van a realizar en la Aplicación\]

#### búsquedas frecuentes  

\[Detallar cada una de las Búsquedas más frecuentes relacionadas con la Aplicación.\]  

**Nombre Descriptivo**

**Tipo Documental**

**Parámetros**

**Objetivo**

**Atributo**

**Valor**

Dónde:  

**Nombre Descriptivo:** nombre descriptivo de la búsqueda

**Tipo Documental:** nombre del tipo documental sobre el que se realiza la búsqueda

**Parámetros:** atributos y valores asociados a los metadatos   por los que se realiza la búsqueda

**Objetivo** : objetivo de la búsqueda  

#### índices asociados   a las búsquedas  

\[Detallar los Índices creados en el Repositorio para mejorar el rendimiento de las Búsquedas utilizadas en la Aplicación.\]  

**Búsqueda**

**Índice**

**Tipo Documental**

**Atributos**

**Descripción**

Dónde:

**Búsqueda:** nombre descriptivo de la búsqueda

**Índice:** nombre del índice creado

**Tipo Documental:** nombre del tipo documental sobre el que se realiza la búsqueda

**Atributos:** atributos que componen el índice creado

**Descripción** : objetivo de la creación del índice

#### recuperación de los resultados  

\[Indicar, los resultados que se desean recuperar por cada una de las Búsquedas utilizadas.\]

**Búsqueda**

**Tipo Documental**

**Resultados a Presentar**

**Atributo**

**Orden**

Dónde:

**Búsqueda:** nombre descriptivo de la búsqueda realizada para obtener estos resultados

**Tipo Documental:** tipo documental sobre el que se lleva a cabo la Búsqueda

**Atributo:** nombre de los atributos a devolver como resultados de la búsqueda

**Orden:** orden (entero) en el que se va a presentar dicho atributo dentro de los resultados de búsqueda

Nomenclatura
------------

Tipo documental Archivador (hereda de DM\_CABINET)

ypf\_xxx\_dtca\_aaaa

Tipo documental Carpeta (hereda de DM\_FOLDER)

ypf\_xxx\_dtfo\_aaaa

Tipo documental Documento (hereda de DM\_DOCUMENT)

ypf\_xxx\_dtdo\_aaaa

Tipo documental Mensaje (hereda de DM\_MESSAGE\_ARCHIVE)

ypf\_xxx\_dtmsg\_aaaa

Tipo documental DATO MAESTRO BASICO (hereda de DM\_SYSOBJECT) – Se instancia con los valores del datos maestro

ypf\_xxx\_dtmd\_aaaa1

Tipo documental DATO MAESTRO CARPETA (hereda de DM\_FOLDER) – Contiene los valores instanciados en el DM YPF\_XXX\_DTMD\_AAAA 1 donde AAAA 1 es igual en ambos casos

ypf\_xxx\_dtmdfo\_aaaa1

Listas de valores

ypf\_xxx\_lst\_aaaa

Documento virtual

ypf\_xxx\_vd\_aaaa

Grupo

ypf\_xxx\_grp\_aaaa

Listas para control de acceso (ACL)

ypf\_xxx\_acl\_aaaa

Rol

ypf\_xxx\_rol\_aaaa

Lógica de negocio – Servicio

ypf\_xxx\_sbo\_aaaa

Lógica de negocio – Tipo

ypf\_xxx\_tbo\_aaaa

Servicio Web

ypf\_xxx\_ws\_aaaa

Método

ypf\_xxx\_mth\_aaaa

Job

ypf\_xxx\_job\_aaaa

Búsquedas

ypf\_xxx\_src\_aaaa

Búsquedas – Índices

ypf\_xxx\_idx\_aaaa

Búsquedas – Resultados

ypf\_xxx\_rlt\_aaaa

Ciclo de vida

ypf\_xxx\_lc\_aaaa

Procesos

ypf\_xxx\_prc\_aaaa

Transformaciones de contenido

ypf\_xxx\_trf\_aaaa

Workflow

ypf\_xxx\_wf\_aaaa

Dónde:

            XXX es el proyecto

            AAAA es el nombre (descriptivo) del elemento que representa

**Clases**

Los paquetes se organizarán de la siguiente forma:

**com.ypf.utils** : para englobar las funcionalidades generales a todos los proyectos

**com.ypf.xxx** : para englobar los paquetes y funcionalidades del proyecto “xxx”

Las clases

**Buenas prácticas**

\-           Bajo ningún concepto se deberá acceder directamente a los objetos de la base de datos. En caso de requerir acceder a un objeto (por ejemplo: una lista) definir STORED PROCEDURES y/o VISTAS para encapsular la funcionalidad requerida

\-           La solución se debe construir e implementar en el repositorio productivo PSREPDM

\-           La solución se debe construir e implementar en el archivador (cabinet) YPF

\-           La solución se debe construir e implementar en la carpeta (folder) correspondiente al negocio, es decir: “Upstream”, “Downstream” o “Corporación”

o    Si la solución corresponda a más de un negocio o si la solución es de propósito general, se debe construir e implementar en la carpeta (folder) “General”

\-           La solución se debe construir e implementar en un nuevo folder, dentro de la estructura correspondiente, al cual se le asignará un nombre representativo para identificar ágilmente la aplicación

\-           Se deben respetar los estándares de nomenclaturas y buenas prácticas definidos (ver adjuntos)

\-           Si la aplicación requiere la gestión de datos maestros , se debe generar una carpeta (folder) llamada DATOS MAESTROS, dentro del folder correspondiente a la aplicación, respetando la nomenclatura sugerida. Por cada dato maestro, se debe generar un nuevo folder (hijo de la carpeta DATOS MAESTROS, para contener los valores que representar el dato maestro propiamente dicho (hereda de dm\_sysobject)

\-           No duplicar un documento. Si es necesario verlo/referenciarlo de varios lugares, tons generar LINKs


# Página: https://isdocs.grupo.ypf.com/ivr.html

[Saltar al contenido principal](#main)

Lineamientos de Desarrollo de IVR
=================================

**Objetivo del documento**
--------------------------

El presente documento establece los lineamientos técnicos, funcionales y de diseño que deberán observarse en el desarrollo de sistemas de Respuesta de Voz Interactiva (IVR) para la compañía.   
Su objetivo es garantizar que los IVRs desarrollados: 

*   Brinden una experiencia de usuario clara, eficiente y consistente.
*   Se alineen con las mejores prácticas del mercado.
*   Sean robustos, resilientes y fáciles de mantener.
*   Presenten una correcta separación de responsabilidades técnicas.
*   Minimicen riesgos operativos y dependencias innecesarias.
*   Los presentes lineamientos son de cumplimiento obligatorio para desarrollos internos y de carácter vinculante para proveedores externos.

**Principios generales**
------------------------

### **Enfoque en la experiencia del usuario**

El IVR constituye un canal de interacción sensible a la latencia, la complejidad y los errores. Su diseño deberá priorizar:

*   Claridad en los mensajes.
*   Simplicidad en los flujos.
*   Previsibilidad en las respuestas.
*   Reducción de la carga cognitiva del usuario.
*   Toda decisión técnica deberá considerar su impacto directo en la experiencia de quien interactúa con el sistema.

### **Simplicidad como criterio de diseño**

El diseño de IVRs deberá regirse por el principio de simplicidad funcional y técnica.  
Se deberán evitar estructuras excesivamente profundas, flujos innecesariamente complejos o lógicas difíciles de mantener.  
La complejidad técnica no deberá trasladarse al IVR como solución a deficiencias de diseño en otras capas del sistema.

### **Naturaleza del IVR**

El IVR debe concebirse como una interfaz conversacional de captura, validación básica y enrutamiento, y no como un motor de lógica de negocio.  
La lógica compleja, las reglas de negocio y la orquestación entre sistemas deberán resolverse fuera del IVR, en capas backend diseñadas específicamente para dicho fin.

**Responsabilidad del IVR**
---------------------------

EEl IVR será responsable exclusivamente de:

*   Captura de información del usuario (DTMF y/o ASR).
*   Validaciones básicas de formato y consistencia.
*   Confirmación de datos ingresados.
*   Enrutamiento simple de flujos (menús, idioma, horarios).
*   Invocaciones externas acotadas y controladas.
*   Manejo básico de errores y alternativas de salida.

**Responsabilidades fuera del IVR**
-----------------------------------

No deberán implementarse en el IVR las siguientes responsabilidades:

*   Lógica de negocio.
*   Orquestación entre múltiples servicios.
*   Transformación o normalización compleja de datos.
*   Armado de objetos o estructuras complejas.
*   Reglas de decisión dinámicas o cambiantes.
*   Manejo de estado complejo o persistente.
*   Estas responsabilidades deberán resolverse en servicios backend intermedios (por ejemplo, BFF, APIs agregadas u orquestadores), diseñados para desacoplar al IVR de la complejidad técnica.

**Diseño de menús y flujos**
----------------------------

### **Estructura de menús**

Los menús deberán ser claros, concisos y orientados a los motivos de contacto más frecuentes.  
Se deberá limitar la profundidad de los flujos (idealmente no más de 3 o 4 niveles).  
Cada menú deberá ofrecer un número acotado de opciones claramente diferenciadas.

### **Flujos documentados**

Todo IVR deberá contar con:

*   Diagramas de flujo completos.
*   Descripción de cada decisión y alternativa.
*   Documentación de errores y caminos de escape.
*   Los flujos deberán aprobarse antes de su implementación.

**Integraciones y consumo de servicios**
----------------------------------------

### **Cantidad de invocaciones**

El IVR deberá realizar la menor cantidad posible de invocaciones externas.  
Se recomienda un máximo de 1 a 2 invocaciones externas por turno conversacional.  
Se deberán evitar encadenamientos de servicios dependientes entre sí.

### **Diseño de interfaces**

El IVR deberá intercambiar datos simples (strings, identificadores, flags, códigos).  
No se deberá exigir al IVR el armado de estructuras u objetos complejos.  
Cuando se requiera información compuesta, deberá proveerse un endpoint agregado, diseñado específicamente para consumo por IVR.

**Manejo de estado y resiliencia**
----------------------------------

Ante fallas, el sistema deberá permitir:

*   Reintentos controlados.
*   Degradación a canales alternativos (operador, callback).
*   Mensajes claros y comprensibles al usuario.
*   No se deberá asumir que un flujo puede recomponerse sin impacto en la experiencia del usuario.

**Manejo de errores y contingencias**
-------------------------------------

Todo IVR deberá contemplar explícitamente:

*   Timeouts de servicios externos.
*   Caídas parciales o totales de dependencias.
*   Respuestas inválidas o incompletas.
*   Excesos de intentos del usuario.
*   El IVR no deberá quedar bloqueado ni forzar reinicios completos del flujo sin explicación.

**Rendimiento y eficiencia**
----------------------------

Las respuestas del IVR deberán ser rápidas y predecibles.  
Se deberán evitar silencios prolongados derivados de dependencias externas.  
Toda espera deberá estar acompañada por feedback de voz adecuado.

**Observabilidad, mantenimiento y gobernanza  
**
-------------------------------------------------

Las integraciones deberán permitir trazabilidad end-to-end.  
Los flujos y configuraciones deberán ser versionados.  
La lógica crítica deberá residir en componentes backend testeables y auditables.  
Todo cambio deberá incluir pruebas funcionales y de regresión.

**Seguridad y cumplimiento  
**
-------------------------------

La captura de información deberá limitarse estrictamente a los datos necesarios.  
Se deberán aplicar mecanismos de seguridad acordes a los estándares de la plataforma y normativas vigentes.  
Los datos sensibles deberán manejarse de forma segura en todas las integraciones.

**Antipatrones (prácticas no aceptables)  
**
---------------------------------------------

Se consideran prácticas no aceptables:

*   Utilizar el IVR como motor de lógica de negocio.
*   Orquestar múltiples servicios desde el IVR.
*   Introducir complejidad técnica innecesaria en los flujos.
*   Mantener estado complejo dentro del IVR.
*   Incrementar la lógica del IVR para suplir carencias de backend.

**Consideración final**
-----------------------

El IVR es un canal crítico, altamente expuesto al usuario final.  
Su diseño debe priorizar simplicidad, robustez y correcta delegación de responsabilidades, alineándose con las mejores prácticas del mercado y garantizando soluciones sostenibles en el tiempo.


# Página: https://isdocs.grupo.ypf.com/tutoriales-appscan.html

[Saltar al contenido principal](#main)

AppScan
=======

Instalación
-----------

### Centro de Software

Ingresar al Centro de Software (Portal Empresa) [https://portal.manage.microsoft.com](https://portal.manage.microsoft.com) .  
Filtrar por la categoría “ **Aplicaciones Desarrollo** ”.

Buscar e instalar el **SAST Client Utilities** .

### Cloud AppScan

Ingresar a [https://cloud.appscan.com/plugins](https://cloud.appscan.com/plugins) , descargar la herramienta **SAST Client Util / CLI**

Esto descarga un archivo SAClientUtil\_<versión>\_<os>.zip (donde <versión> es la versión actual del CLI y <os> es el sistema operativo en el que se ejecutara).

Elegir una ubicación y extraer los archivos en la misma. (ej: **_C:\\workingfolder\\software\\appscan\\_** )  
Se utilizará **<APPSCAN\_PATH>** de aquí en adelante.

**Buena práctica**  
Agregar al PATH la ruta al bin del AppScan Utility. **<APPSCAN\_PATH>** \\bin.

Documentación de referencia: [https://help.hcltechsw.com/appscan/ASoC/src\_utility\_install.html](https://help.hcltechsw.com/appscan/ASoC/src_utility_install.html)

GENERACIÓN DE API KEY
---------------------

1.  Loguearse en la aplicación [https://cloud.appscan.com/](https://cloud.appscan.com/)
2.  Ingresar al punto de menú Herramientas-> API
3.  Seleccionar Generar
4.  Estos pasos generaran un key id y secret que se usara para autenticar en la herramienta CLI, asegurarse de copiar el secret porque no se vuelve a mostrar. **Si no se copia se deberá generar otro** .

La pantalla se vera de la siente manera:

CREACIÓN DE ARCHIVO DE CONFIGURACIÓN
------------------------------------

Para la ejecución del escaneo es necesario generar previamente un archivo de configuración, si al momento de ejecutar un escaneo, no se especifica la ruta del archivo de configuración entonces lo buscara en el directorio **<APPSCAN\_PATH> \\bin** con el nombre **appscan-config.xml** un archivo de configuración básico podría ser como el siguiente: 

<Configuration sourceCodeOnly="true">

<Targets>

<Target path=" C:\\ADHelper "/>

</Targets>

</Configuration>

El path resaltado en amarillo corresponde al directorio que se quiere escanear. Para configuraciones más avanzadas se puede consultar la documentación de referencia: [https://help.hcltechsw.com/appscan/ASoC/src\_irx\_gen\_config.html](https://help.hcltechsw.com/appscan/ASoC/src_irx_gen_config.html)  

Al Path donde se almacenarán los archivos de configuración lo llamaremos **<APPSCAN\_CONFIG>** de aquí en adelante.

**Buena práctica**

Es recomendable generar una carpeta local en la PC donde el desarrollador vaya guardando los archivos de configuración que genere.

No guardarlos en el path **<APPSCAN\_PATH>** , para evitar posibles conflictos o pérdidas antes actualizaciones

AUTENTICACIÓN
-------------

Abrir la aplicación cmd.  
Posicionarse sobre el directorio **<APPSCAN\_PATH> \\bin** . (ej: **_C:> cd <APPSCAN\_PATH>_** )  
Luego ejecutar el siguiente comando reemplazado **<KEY\_SECRET>** y **<KEY\_ID>** por las claves generadas en el punto 4. (Generación de Api Key): 

**<APPSCAN\_PATH> \\bin>** appscan api\_login -P **<KEY\_SECRET>** -u **<KEY\_ID>** -persist  
Ejemplo:

Documentación de referencia: [https://help.hcltechsw.com/appscan/ASoC/src\_cli\_win\_authenticate.html](https://help.hcltechsw.com/appscan/ASoC/src_cli_win_authenticate.html)

**Nota**  
En ocasiones puede ser necesario configurar el proxy, en caso de necesitarlo ejecutar previamente el comando:  
set "APPSCAN\_OPTS=-Dhttps.proxyHost=proxy-azure.grupo.ypf.com -Dhttps.proxyPort=80"

ref: [https://help.hcltechsw.com/appscan/ASoC/src\_utility\_install.html](https://help.hcltechsw.com/appscan/ASoC/src_utility_install.html)

GENERAR ARCHIVO IRX
-------------------

Para iniciar un análisis SAST, se debe generar un archivo IRX, este archivo será enviado luego a AppScan para su análisis. Para generar el archivo IRX se debe ejecutar el comando: 

**Buena práctica**  
Se recomienta generar una carpeta con subcarpetas por aplicación donde almacenar todos los archivos IRX.  
A esta carpeta principal la llamaremos **<APPSCAN\_IRX>** de aquí en adelante.

appscan prepare -c **<APPSCAN\_CONFIG>** \\MyApp\_config.xml -d **<APPSCAN\_IRX>** \\MyApp

El path resaltado en amarillo corresponde al directorio donde se va a generar el archivo IRX, este comando escaneara el directorio configurado previamente en el archivo de configuración. Para obtener más información de las distintas configuraciones que soporta el comando consultar el siguiente documento de referencia:  [https://help.hcltechsw.com/appscan/ASoC/src\_cli\_win\_config.html#src\_cli\_win\_config\_\_prepare](https://help.hcltechsw.com/appscan/ASoC/src_cli_win_config.html#src_cli_win_config__prepare)

ENVIAR ARCHIVO IRX PARA ANÁLISIS EN LA NUBE
-------------------------------------------

Una vez ejecutado el "prepare", se habrá generado un archivo IRX en la ruta " **<APPSCAN\_IRX> \\MyApp** ".

Se debe subir el archivo generado para su análisis en la nube con el siguiente comando:

appscan queue\_analysis -a **<app\_id>** -f **<irx\_file>  -ps**

Donde **<app\_id>** es el id de la aplicación en AppScan (es posible consultar los id de las aplicaciones con el comando: **appscan list\_apps** .  
También es posible obtenerlo desde el sitio de appscan.

  
El **<irx\_file>** es el path del archivo irx.  
El mismo podrá encontrarse en la ruta especificada en el " **prepare** " ( **<APPSCAN\_IRX> \\MyApp\\ <ARCHIVO CON EXTENSIÓN IRX>** )  
Y el parámetro **\-ps** permite ejecutar un escaneo personal.

**Al ejecutar el comando se mostrará un ID de escaneo.**

Para consultar más configuraciones posibles leer el artículo de referencia: [https://help.hcltechsw.com/appscan/ASoC/src\_cli\_win\_analysis.html#src\_cli\_win\_analysis\_\_queue\_analysis](https://help.hcltechsw.com/appscan/ASoC/src_cli_win_analysis.html#src_cli_win_analysis__queue_analysis)

Para visualizar el resultado del escaneo se deberá ingresar a la aplicación [https://cloud.appscan.com/](https://cloud.appscan.com/)  
Ir al punto de menú **Escaneos y Sesiones -> Escaneos SAST**


# Página: https://isdocs.grupo.ypf.com/tutorial-application-insights.html

[Saltar al contenido principal](#main)

Application Insight
===================

¿Qué es Azure App Insights?
---------------------------

App Insights pertenece al set de Azure Monitor. Y Azure Monitor, tal y como lo explica Microsoft, es la herramienta que te ayuda a visualizar el rendimiento de tus aplicaciones creadas a través de Azure, y también las externas. Es decir, se trata de una herramienta de soporte para detectar y prevenir problemas en el futuro, nada más y nada menos.

App Insights se encarga de recoger varios tipos de datos de las aplicaciones con las que esté enlazadas, los almacena y los envía para su posterior estudio y análisis.

Y lo más importante, su conexión para acceder a los datos tiene un impacto mínimo en la carga de trabajo de las aplicaciones, por lo que el análisis no afectará al rendimiento general de la aplicación en ningún momento.

### ¿Qué datos se pueden analizar con App Insights?

Podríamos dividir los datos que nos ofrece Azure App Insights en dos apartados:

#### Métricas de la App

En este apartado incluimos todas las estadísticas sobre el “éxito” de nuestra App entre los usuarios:

*   Inicios de sesión
*   Visualizaciones
*   Peticiones externas
*   Secciones más usadas
*   Etc

Estos datos sirven para entender y analizar como nuestros usuarios emplean la aplicación y que cambios podemos hacer para mejorarla y añadir futuras funcionalidades.

### Rendimiento de la App

Este apartado recogería cómo opera nuestra aplicación en el día a día, incluimos datos como:

*   Velocidad de respuesta
*   Latencia a distintos niveles de tráfico
*   Errores
*   Excepciones
*   Etc

Esta fuente de datos es genial para tu equipo de diseño de Apps, ya que les ayuda a detectar lo antes posible los fallos en el código o con las extensiones y conexiones.

### ¿Qúe datos podré analizar con App Insights?

Podríamos dividir los datos que nos ofrece Azure App Insights en dos segmentos. 

El primer segmento lo podríamos denominar las métricas (así mismo lo llama Microsoft). En este apartado incluimos todas las estadísticas sobre el “éxito” de nuestra app entre los usuarios: inicios de sesión, visualizaciones, peticiones externas,… Estos datos sirven para entender como nuestros usuarios emplean la aplicación y que cambios necesitamos hacer. 

El segundo segmento son los datos de rendimiento de la app, como opera en el día a día. Incluimos datos como la velocidad de respuesta, latencia a distintos niveles de tráfico, errores y excepciones,… Esta fuente es fantástica para tu equipo de diseño de Apps porque les ayuda a detectar cuanto antes los fallos en el código o con las extensiones y conexiones.

Paso a paso agregar Insights
----------------------------

1.  Crear un archivo appInsights.js en la carpeta js (o copiar de algun sitio que ya exista y cambiar nomas las variables sitepath y webapp.  
    ```
    !(function (cfg){function e(){cfg.onInit&&cfg.onInit(i)}var S,u,D,t,n,i,C=window,x=documen  
    t,w=C.location,I="script",b="ingestionendpoint",E="disableExceptionTracking",A="ai.devic  
    e.";"instrumentationKey"\[S="toLowerCase"\](),u="crossOrigin",D="POST",t="appInsightsSDK",n=  
    cfg.name||"appInsights",(cfg.name||C\[t\])&&(C\[t\]=n),i=C\[n\]||function(l){var d=!1,g=!1,f={in  
    itialize:!0,queue:\[\],sv:"7",version:2,config:l};function m(e,t){var n={},i="Browser";funct  
    ion a(e){e=""+e;return 1===e.length?"0"+e:e}return n\[A+"id"\]=i\[S\](),n\[A+"type"\]=i,n\["ai.op  
    eration.name"\]=w&&w.pathname||"\_unknown\_",n\["ai.internal.sdkVersion"\]="javascript:snippet  
    \_"+(f.sv||f.version),{time:(i=new Date).getUTCFullYear()+"-"+a(1+i.getUTCMonth())+"-"+a(i.  
    getUTCDate())+"T"+a(i.getUTCHours())+":"+a(i.getUTCMinutes())+":"+a(i.getUTCSeconds())  
    +"."+(i.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z",iKey:e,name:"Microsoft.Applica  
    tionInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}},ver:  
    4,seq:"1",aiDataContract:undefined}}var h=-1,v=0,y=\["js.monitor.azure.com","js.cdn.applica  
    tioninsights.io","js.cdn.monitor.azure.com","js0.cdn.applicationinsights.io","js0.cdn.moni  
    tor.azure.com","js2.cdn.applicationinsights.io","js2.cdn.monitor.azure.com","az416426.vo.m  
    secnd.net"\],k=l.url||cfg.src;if(k){if((n=navigator)&&(~(n=(n.userAgent||"").toLowerCase  
    ()).indexOf("msie")||~n.indexOf("trident/"))&&~k.indexOf("ai.3")&&(k=k.replace(/(\\/)(ai\\.3  
    \\.)(\[^\\d\]\*)$/,function(e,t,n){return t+"ai.2"+n})),!1!==cfg.cr)for(var e=0;e<y.length;e++)  
    if(0<k.indexOf(y\[e\])){h=e;break}var i=function(e){var a,t,n,i,o,r,s,c,p,u;f.queue=\[\],g||(0  
    <=h&&v+1<y.length?(a=(h+v+1)%y.length,T(k.replace(/^(.\*\\/\\/)(\[\\w\\.\]\*)(\\/.\*)$/,function(e,  
    t,n,i){return t+y\[a\]+i})),v+=1):(d=g=!0,o=k,c=(p=function(){var e,t={},n=l.connectionStrin  
    g;if(n)for(var i=n.split(";"),a=0;a<i.length;a++){var o=i\[a\].split("=");2===o.length&&(t\[o  
    \[0\]\[S\]()\]=o\[1\])}return t\[b\]||(e=(n=t.endpointsuffix)?t.location:null,t\[b\]="https://"+(e?e  
    +".":"")+"dc."+(n||"services.visualstudio.com")),t}()).instrumentationkey||l.instrumentati  
    onKey||"",p=(p=p\[b\])?p+"/v2/track":l.endpointUrl,(u=\[\]).push((t="SDK LOAD Failure: Failed  
    to load Application Insights SDK script (See stack for details)",n=o,r=p,(s=(i=m(c,"Except  
    ion")).data).baseType="ExceptionData",s.baseData.exceptions=\[{typeName:"SDKLoadFailed",mes  
    sage:t.replace(/\\./g,"-"),hasFullStack:!1,stack:t+"\\nSnippet failed to load \["+n+"\] -- Tel  
    emetry is disabled\\nHelp Link: https://go.microsoft.com/fwlink/?linkid=2128109\\nHost: "+(w  
    &&w.pathname||"\_unknown\_")+"\\nEndpoint: "+r,parsedStack:\[\]}\],i)),u.push((s=o,t=p,(r=(n=m  
    (c,"Message")).data).baseType="MessageData",(i=r.baseData).message='AI (Internal): 99 mess  
    age:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for d  
    etails) ("+s+")").replace(/\\"/g,"")+'"',i.properties={endpoint:t},n)),o=u,c=p,JSON&&((r=C.  
    fetch)&&!cfg.useXhr?r(c,{method:D,body:JSON.stringify(o),mode:"cors"}):XMLHttpRequest&&((s  
    \=new XMLHttpRequest).open(D,c),s.setRequestHeader("Content-type","application/json"),s.sen  
    d(JSON.stringify(o))))))},a=function(e,t){g||setTimeout(function(){!t&&f.core||i()},500),d  
    \=!1},T=function(e){var n=x.createElement(I),e=(n.src=e,cfg\[u\]);return!e&&""!==e||"undefine  
    d"==n\[u\]||(n\[u\]=e),n.onload=a,n.onerror=i,n.onreadystatechange=function(e,t){"loaded"!==n.  
    readyState&&"complete"!==n.readyState||a(0,t)},cfg.ld&&cfg.ld<0?x.getElementsByTagName("he  
    ad")\[0\].appendChild(n):setTimeout(function(){x.getElementsByTagName(I)\[0\].parentNode.appen  
    Paso a paso agregar Insight 2  
    dChild(n)},cfg.ld||0),n};T(k)}try{f.cookie=x.cookie}catch(p){}function t(e){for(;e.lengt  
    h;)!function(t){f\[t\]=function(){var e=arguments;d||f.queue.push(function(){f\[t\].apply(f,  
    e)})}}(e.pop())}var r,s,n="track",o="TrackPage",c="TrackEvent",n=(t(\[n+"Event",n+"PageVie  
    w",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+  
    o,"stop"+o,"start"+c,"stop"+c,"addTelemetryInitializer","setAuthenticatedUserContext","cle  
    arAuthenticatedUserContext","flush"\]),f.SeverityLevel={Verbose:0,Information:1,Warning:2,E  
    rror:3,Critical:4},(l.extensionConfig||{}).ApplicationInsightsAnalytics||{});return!0!==l  
    \[E\]&&!0!==n\[E\]&&(t(\["\_"+(r="onerror")\]),s=C\[r\],C\[r\]=function(e,t,n,i,a){var o=s&&s(e,t,n,  
    i,a);return!0!==o&&f\["\_"+r\]({message:e,url:t,lineNumber:n,columnNumber:i,error:a,evt:C.eve  
    nt}),o},l.autoExceptionInstrumented=!0),f}(cfg.cfg),(C\[n\]=i).queue&&0===i.queue.length?(i.  
    queue.push(e),i.trackPageView({})):e();})({  
    src: "https://js.monitor.azure.com/scripts/b/ai.3.gbl.min.js",  
    // name: "appInsights",  
    // ld: 0,  
    // useXhr: 1,  
    crossOrigin: "anonymous",  
    onInit: (appInsights) => {  
    appInsights.trackPageView({  
    name: document.title,  
    uri: window.location.pathname,  
    properties: {  
    sitepath: 'SHAREPOINT\_SITEPATH', // ej Investors  
    webapp: 'webapp' // ej ypfzpapsinv002  
    }  
    });  
    },  
    // cr: 0,  
    cfg: { // Application Insights Configuration  
    connectionString: "InstrumentationKey=...", // InstrumentationKey  
    autoTrackPageVisitTime: true,  
    }});
    ```
    `      `  
    
2.  Crear archivo `insightsPageVisitTime.js` o copiar de alguno que ya exista y cambiar variables sitepath y webapp
    ```
    `const spendTimeFn = () => {`  
      
    `let end = new Date().getTime();`  
      
    `let timeSpent = end - start;`  
      
    `timeSpent = timeSpent / 1000;`  
      
    `totalSeconds += timeSpent;`  
      
    `start = null;`  
      
    `}`  
      
    `let totalSeconds = 0;`  
      
    `let start;`  
      
    `$("document").ready(function () {`  
      
    `start = new Date().getTime();`  
      
    `});`  
      
    `window.addEventListener("blur", function () {`  
      
    `spendTimeFn();`  
      
    `Paso a paso agregar Insight 3`  
      
    `});`  
      
    `window.addEventListener("focus", function () {`  
      
    `start = new Date().getTime();`  
      
    `});`  
      
    `window.addEventListener("beforeunload", function () {`  
      
    `let end = new Date().getTime();`  
      
    `let timeSpent = end - start;`  
      
    `timeSpent = timeSpent / 1000;`  
      
    `totalSeconds += timeSpent;`  
      
    `if (totalSeconds > 100000) return`  
      
    `appInsights.trackMetric({`  
      
    `name: 'timeSpentInPage',`  
      
    `average: totalSeconds,`  
      
    `properties:{`  
      
    `sitepath: 'SHAREPOINT_SITEPATH', // cambiar por path`  
      
    `webapp: 'WEBAPP' // cambiar por webapp`  
      
    `}`  
      
    `})`  
      
    `});`
    ```
    
3.  \- Agregar los scripts a todos los html trackeables  `appInsights.js` arriba de todo ni bien arranca el body  
      
    \- `insightsPageVisitTime.js` abajo con el resto de los scripts  
    

Panal ingeniería de software
----------------------------

Se opto por utilizar tableros de Grafana, aprovechando que la herramienta ya es utilizada por aplicaciones como Serviclub e incluso desde infraestructura.

Trabajando en conjunto con el grupo de Monitoreo, encargados del mantenimiento de la herramienta, se definió un tablero del estilo panal que permite visualizar a simple vista los sitios productivos con dificultades à [https://mon.ypf.com:3000/d/xUkMINd4k/](https://mon.ypf.com:3000/d/xUkMINd4k/ing-software-global-disponibilidad-url-prod?orgId=1&refresh=5m) [ing-software-global-disponibilidad-url-prod?orgId](https://mon.ypf.com:3000/d/xUkMINd4k/ing-software-global-disponibilidad-url-prod?orgId=1&refresh=5m) [\=1&refresh=5m](https://mon.ypf.com:3000/d/xUkMINd4k/ing-software-global-disponibilidad-url-prod?orgId=1&refresh=5m)  
  
  
  

En este panal desde Grafana se pinguea a cada sitio configurado para determinar si el mismo se encuentra activo y responde.

Los verdes son los sitios que respondieron ok y los rojos son los sitios que no responden después de reiterados intentos en el transcurso de 10 minutos continuos.

Desde este panel principal se puede:

*    Desplegar más información clikeando sobre la pestaña de datos adicionales  
       
      
    
    Como información adicional se podrá visualizar:
    
    \-detalle de los sitios con error
    
    \-porcentaje de disponibilidad por sitio
    
    \-respuestas del servidor
    
*   También se podrá seleccionar un sitio en particular para ver en detalle las métricas detalladas en el punto 2 de esta presentación.  
      
    

Se confeccionó una plantilla de tablero configurable por sitio y app insigth, es decir, que podemos agregar sitios sin necesidad de ningún desarrollo para el tablero.  
  

A continuación el detalle de cada métrica

### **Queries Generales**

Cantidad de usuarios que visitaron la página (presentar número total).  
 

```
pageViews  
| summarize maxUsers = dcount(user\_Id)  
| order by maxUsers desc
```

* * *

Cantidad de vistas por navegador

```
pageViews  
| summarize count() by client\_Browser  
| render piechart with (title='Cantidad de vistas por navegador')
```

* * *

Páginas más visitadas por usuarios  

```
pageViews  
| where $\_\_timeFilter(timestamp)  
| summarize count() by operation\_Name  
| top 10 by count\_ desc  
| render barchart with (title='Top 10 páginas más visitadas')
```

* * *

Cantidad de tiempo promedio que permanecen los usuarios en cada página.

```
customMetrics  
| where name == 'timeSpentInPage' and customDimensions.sitepath != '' and value < 100000  
| extend total\_duration=value\*itemCount  
| summarize avgSeconds = (sum(total\_duration)/sum(itemCount)) by tostring(operation\_Name), tostring(customDimensions.sitepath)  
Queries Generales 3  
| order by avgSeconds desc  
| render barchart with (title='Ranking de promedios de tiempo por página (segundos)')
```

* * *

Cantidad de visitas por zona geográfica (países)

```
pageViews  
| summarize count = dcount(user\_Id) by client\_CountryOrRegion  
| render piechart with (title='Cantidad de visitas por zona geográfica')
```

* * *

Cantidad de visitas por localidades, provincias y países

```
pageViews  
| summarize count = dcount(user\_Id) by client\_City, client\_StateOrProvince, client\_CountryOrRegion
```

* * *

Páginas más lentas

```
pageViews  
| where notempty(duration) and client\_Type == 'Browser'  
| extend total\_duration=duration\*itemCount  
| summarize avg\_duration=(sum(total\_duration)/sum(itemCount)) by operation\_Name  
| top 10 by avg\_duration desc
```

* * *

  
Tiempo de respuesta del servidor

```
requests  
| summarize avg(duration) by bin(timestamp, 1h)  
| render timechart
```

* * *

Usuarios activos por pagina:

```
let events = union pageViews  
| where name in ('\*')  
or '\*' in ('\*')  
or ('%' in ('\*') and itemType == 'pageView')  
| where not(url has 'y-lite')  
| extend Dim1 = tostring(name);  
events  
| summarize Users = dcount(user\_Id), Sessions = dcount(session\_Id) by Dim1  
| extend DisplayDim = strcat('🔹 ', Dim1)  
| order by Users desc  
| project Dim1, DisplayDim, Users, Sessions  
| project  
\['Páginas'\] = DisplayDim,  
\['Usuarios Activos Únicos'\] = Users,  
\['Sesiones Únicas'\] = Sessions
```

### **Queries CENIT (Negocio)**

1.  Cantidad de usuarios totales en la página y cantidad de usuarios totales en biblioteca  
      
    Este gráfico muestra la cantidad de usuarios totales que ingresaron a la página, discriminando aquellos totales que entraron a la biblioteca.  
      
      
    
2.  Sesiones totales por navegador / sistema operativo  
      
    Este gráfico muestra la cantidad de visitas totales que entraron a la página discriminadas por navegador.  
      
      
    
3.  Páginas más visitadas  
      
    Este gráfico muestra las páginas más visitadas, mostrando la visitas totales a cada página.  
      
      
    
4.  Promedios de tiempo por sitio  
      
    Tiempo promedio que pasan los usuarios por página.  
      
      
    
5.  Sesiones por ubicación  
      
    Este muestra los usuarios únicos que ingresan por país.  
      
      
    
6.  Archivos descargados (TOP 10)  
      
    Este grafíco muestra los archivos descargados por usuario único.  
      
    
7.  Páginas más lentas (TOP 10)  
      
    Este gráfico muestras un promedio de las páginas que más demoran en cargar.  
      
      
    
8.  Usuarios activos por página  
      
    Este gráfico muestra, por página, los usuarios únicos en la primera columna, y las sesiones únicas en la segunda columna. Una sesión es un momento del día en que el usuario navega, sin haber cerrado el navegador.  
      
      
    
9.  Tiempo promedio que tardan en cargar las páginas completamente  
      
      
      
    
10.  Backend  
       
     Estas últimas métricas muestran las respuestas del servidor y que tanto demoran en cargar los recursos de las páginas.


# Página: https://isdocs.grupo.ypf.com/tutorial-nvm-nodejs.html

[Saltar al contenido principal](#main)

NVM - NodeJS
============

Instalación del NVM
-------------------

### Portal Empresa

Ingresar a [https://portal.manage.microsoft.com](https://portal.manage.microsoft.com)

Ingresar e Instalar

Configuración del NVM
---------------------

### Verificar los PATH para el correcto uso del NVM

Para poder utilizar el NVM, el mismo debe estar en el PATH y no debe haber otro Node cargado en el PATH.

En una ventana de linea de comando (CMD), hacer un "c:\\> echo %PATH%" para listar el contenido de la variable de entorno.

La instlación ya carga las 2 (dos) entradas necesarias.

Validar que las mismas esten y que no haya otro NodeJS en el listado. De existir, deberá quitarlo.

Uso del NVM
-----------

### Ya podemos utilizar el NVM.

\> **nvm list**

Lista las versiones instaladas.

\> **nvm use VERSION**

Setea para que se utilice la VERSION deseada.

\> **nvm current**

Muestra la versión actual

**IMPORTANTE:**

**Tener en cuenta que la linea de comando no navega por el proxy.**

**Por esta razón no se podrá utilizar los comandos "nvm list available" o "nvm install", los cuales permiten listar las versiones que se pueden instalar y el otro poder bajarlo para poder utilizarlo.**

### Descarga y configuración de una versión de NodeJs

La descarga deberá realizarla usted mismo desde el sitio de nodejs.

URL: [https://nodejs.org/dist/](https://nodejs.org/dist/)

Deberá descargar la versión "zip".

Descomprimir el contenido en "C:\\SoftwareYPF\\nvm".

Debe quedar en una carpeta llamada "v **VERSION** " (ej: **v18.15.0** )

### Ejemplo para la version 23.6.0

Para descargar la versión "v23.6.0"

URL: [https://nodejs.org/dist/v23.6.0/](https://nodejs.org/dist/v23.6.0/)

Descargaremos el link seleccionado en la imagen

Descomprimimos el archivo "node-v23.6.0-win-x64.zip" en la carpeta del NVM.

Se creó esta carpeta "node-v23.6.0-win-x64".

Este formato no sirve para el NVM.

Renombrar a " **v23.6.0** "

Ahora tenemos todas las versiones bajadas y la última "v23.6.0"

Ahora le decimos al NVM que utilice esta nueva versión.

Primero listamos las versiones "nvm list"

Ahora seleccionamos la **23.6.0**  "nvm use **23.6.0** "

Podemos corroborar si está seteada correctamente "nvm current".

**IMPORTANTE:**

**La carpeta llamada " nodejs " no deberán modificarla; la misma es un link generado por el "nvm use VERSION" y es lo que está configurado en el PATH para utilizar una versión u otra dependiendo de lo que querramos.**


# Página: https://isdocs.grupo.ypf.com/ruta-del-backlog.html

[Saltar al contenido principal](#main)

Introducción HU-Features-Epicas
===============================


# Página: https://isdocs.grupo.ypf.com/wiki-sec.html

[Saltar al contenido principal](#main)

Título principal (H1)
=====================

Crear una Aplicación
--------------------

**Para crear una aplicación debe seguir los siguientes pasos**

1.  Ingresar a la aplicación e ir a "**Seguridad** -> **Aplicaciones**"

2.  Hacer click en "**\+ Crear**"

3.  Cargar los datos deseados

*   *   **Nombre**: Nombre descriptivo de la aplicación
    *   **Código**: Nombre por medio del cual se realizarán las consultas para obtener los valores
    *   **Usuarios**: Listado de usuarios que tendrán permisos para consultar los valores
    *   **Administradores**: Listado de usuarios con permisos para modificar las interfaces, atributos y valores

4.  Luego de guardrar hacer click en "**Buscar**" y deberá aparecer la nueva aplicación en el listado

Crear una Interfaz
------------------

**Para crear una interfaz debe seguir los siguientes pasos.**

1.  Ingresar a la aplicación e ir a "**Seguridad** -> **Interfaces**"

2.  Hacer click en "**\+ Crear**"

3.  Cargar los datos deseados

*   *   **Nombre**: Nombre descriptivo de la interfaz
    *   **Aplicaciones Disponibles**: Listado de las apliaciones disponibles del usuario
    *   **Aplicaciones Asignadas**: Listado de las apliaciones donde se asignó la interfaz. (_En general una interfaz pertenece a una sola apliación._)

4.  Luego de guardrar hacer click en "**Buscar**" y deberá aparecer la nueva interfaz en el listado

Crear un Atributo
-----------------

**Para crear un atributo debe seguir los siguientes pasos.**

1.  Ingresar a la aplicación e ir a "**Seguridad** -> **Atributos**"

2.  Hacer click en "**\+ Crear**"

3.  Cargar los datos deseados

*   *   **Interfaz**: Seleccione la interfaz a la cual pertenece el atributo
    *   **Nombre**: Nombre descriptivo del atributo
    *   **Valor**: Haciendo click en "**Editar**" se puede cargar el valor que se desea tener en el atributo. El mismo se almacena de manera encriptada.

4.  Luego de guardrar hacer click en "**Buscar**" y deberá aparecer la nueva interfaz en el listado

Realizar Consultas al servicio
------------------------------

### Información General

El servicio tiene seguridad tipo IWA (Seguridad Integrada de Windows). Para poder realizar llamadas y que el servicio responda se debe llamar con un usuario de Red. Este usuario puede ser una persona o un usuario de servicio.

### SOAP-UI

1.  Agregar el servicio al SOAP-UI. El WSDL se puede obtener de las URL del servicio
2.  Agregar el código de la aplicación en el payload de la llamada

3.  Agregar usuario, clave y dominio en las propiedades del SOAP-UI

4.  Al ejecutar tendremos el resultado

### .Net

Hemos creado un ejemplo que muestra las dos formas de llamar al servicio _SEC_ desde .Net. Configurandolo como _Service Connection_ o como _Web Reference_.

El [_net.zip_](documents/Wiki/SEC/WSSecSSO.zip) tiene como clave: **1234**

Aquí se encuentran tres ejemplos.

*   EJ1: Ejecutable de consola configurado como _Service Connection_
*   EJ2: Ejecutable de consola configurado como _Web Reference_
*   WSSecSSO: Web básica con dos llamadas en el "Default.aspx.cs". Esta web tiene las dos configuraciones, _Service Connection_ y _Web Reference_; estas llamadas del "Default" son una para cada caso.

### CMD

Cuando se tiene un JOB del tipo CMD se torna complejo el almacenamiento de las credenciales. Para esto hemos generado un CMD y un VBS de ejemplo que permite realizar la llamada al servicio _SEC_ y obtener las credenciales deseadas.

El [_CMD.ZIP_](documents/Wiki/SEC/cmd.zip) tiene como clave: **1234**


# Página: https://isdocs.grupo.ypf.com/wiki-ypfsdk.html

[Saltar al contenido principal](#main)

Título principal (H1)
=====================

YPFSDK
------

**¿Qué es el YPF SDK?**

El YPFSDK es un un conjunto de componentes del tipo NUGET cargados en el Artifact Feed  [Ingeniería de Desarrollo YPF](https://dev.azure.com/Azure-DevOps-YPF/Ingenieria%20de%20Desarrollo/_packaging?_a=feed&feed=Ingenieria_de_Desarrollo-YPF)  de la organización  [Azure-DevOps-YPF](https://dev.azure.com/Azure-DevOps-YPF) .  
En este Feed hay varios componentes compartidos para su uso.  
Los componentes  **YPFSDK.** \* tienen como dependencia al  **YPFSDK.Core** . Estos están basados en OIDC y el servicio  **YPFSDK Discovery**  publicado en el  **APIM CA** , de donde cada servicio obtiene su configuración común para poder funcionar.  
Algunos datos para que los SDK funcionen deben estar como parte de la configuración de la aplicación  _host_  que utiliza estos componentes ( _como ser: la url del discovery, configuración del OIDC, y otros según el componente_ )

**¿Qué nos brinda?**

El YPFSDK nos brinda una capa de abstracción y estandarización para el uso de los servicios comunes.  
Por ejemplo, los componentes requieren ser llamados con OIDC, el YPFSDK se encarga del manejo del Token OIDC, haciendo las llamadas en nombre del usuario; en caso de ser un JOB, también realiza el manejo del Token OIDC para aplicaciones sin usuario.

**¿Cuáles son los SDK que hay hoy?**

*   **YPFSDK.Core**  
    Componente base de todos los YPFSDK.
    
*   **YPFSDK.ADHelper**  
    Componente que facilita las llamadas al servicio  _ADHelper_ .
    
*   **YPFSDK.SendMail**  
    Componente que facilita las llamadas al servicio  _SendMail_ .
    
*   **YPFSDK.NotificationService **📱****  
    Componente para manejar las llamadas al  _Notification Services_ .
    
*   _**SAML2CORE.YPF**_  **ℹ️**  
    _Componente que facilita el uso de SAML2 en las aplicaciones que utilizan el Template de Desarrollo NetCore._
    
*   _**YPF.Security.Svc.ApsNetCore**_ ****ℹ️****  
    _Componente utilizado por las aplicaciones mobile "Xamarin" para facilitar las llamadas al servicio YPFSecurity._
    
*   **YPF.OpenServer.Client**  
    Componente desarrollado por el equipo del proyecto DATAGMA utilizado para administrar las llamadas al Prosper Server.
    

Introduccion al SDK de ADHelper
-------------------------------

El SDK de ADHelper tiene como objeto facilitar el acceso al API de ADHelper.

### Requisitos

YPFSDK.ADHelper es una liberia .NET Standard diseñada para proyectos .NET Core (2.1.0+) o de tipo .NET Standard. Para poder consumir el API será necesario tener una aplicación registrada en Azure AD de YPF, en donde además se le asigne un secreto (Client Secret) a los efectos de poder autenticar el cliente en forma no interactiva.

### Instalación

Para acceder al repositorio de nugets es necesario agregar un origen de paquetes con esta url:

```
[https://pkgs.dev.azure.com/Azure-DevOps-YPF/\_packaging/Ingenieria\_de\_Desarrollo-YPF/nuget/v3/index.json](https://pkgs.dev.azure.com/Azure-DevOps-YPF/_packaging/Ingenieria_de_Desarrollo-YPF/nuget/v3/index.json)
```

Luego el comando para agregar el paquete al proyecto;

```
dotnet add package YPFSDK.ADHelper
```

### Configuración

Con la aplicación ya registrada en Azure AD se procede a configurar el archivo appsettings.json. Se necesitan dos bloques de parametros, uno referido a la identificacion de la aplicacion cliente:

Y el segundo referido al SDK:

### Consultas a AD

En el archivo de inicializacion de la aplicacion .NET Core `Startup.cs` , dentro del metodo  `ConfigureServices()` agregar lo siguiente:

Con esto estamos en condiciones de poder inyectar dependencias en controladores o servicios para realizar envíos.

En el constructor:

Dentro de un método podríamos tener las siguientes alternativas de consulta:

*   Obtener datos de un usuario con un id de red

*   Buscar usuarios con parte del nombre, apellido o id de red
    

*   Obtener grupos a los que pertenece un usuario
    

*   Buscar grupos con parte del nombre
    

*   Obtener usuarios que pertenecen a un grupo
    

Introduccion al SDK de Sendmail
-------------------------------

El SDK de Sendmail tiene como objeto facilitar el acceso al API de Sendmail.

### Requisitos

YPFSDK.SendMail es una liberia .NET Standard diseñada para proyectos .NET Core (2.1.0+) o de tipo .NET Framework (4.6.1+). Para poder consumir el API será necesario tener una aplicación registrada en Azure AD de YPF, en donde además se le asigne un secreto (Client Secret) a los efectos de poder autenticar el cliente en forma no interactiva.

### Instalación

Para acceder al repositorio de nugets es necesario agregar un origen de paquetes con esta url:

```
[https://pkgs.dev.azure.com/Azure-DevOps-YPF/\_packaging/Ingenieria\_de\_Desarrollo-YPF/nuget/v3/index.json](https://pkgs.dev.azure.com/Azure-DevOps-YPF/_packaging/Ingenieria_de_Desarrollo-YPF/nuget/v3/index.json)
```

Luego el comando para agregar el paquete al proyecto;

```
dotnet add package YPFSDK.SendMail
```

### Configuración

Con la aplicación ya registrada en Azure AD se procede a configurar el archivo appsettings.json. Se necesitan dos bloques de parametros, uno referido a la identificacion de la aplicacion cliente:

Y el segundo referido al SDK:

### Envío de mails

En el archivo de inicializacion de la aplicacion .NET Core `Startup.cs` , dentro del metodo  `ConfigureServices()` agregar lo siguiente:

Con esto estamos en condiciones de poder inyectar dependencias en controladores o servicios para realizar envíos.

En el constructor:


# Página: https://isdocs.grupo.ypf.com/citizen_dev.html

[Saltar al contenido principal](#main)

Citizen Developer
=================

Desarrollo Gobernado
--------------------

*   Los desarrolladores ciudadanos son empleados que no pertenecen a la organización de la VP TEC y que crean o amplían capacidades tecnológicas. 
*   Utilizan herramientas de desarrollo sin código y entornos de ejecución aprobados por la VP TEC.
*   Un desarrollador ciudadano es un subsegmento de los tecnólogos empresariales.
*   Sin embargo, no se trata de un título, función o desarrollador profesional en la unidad de negocio, sino más bien un rol asumido por un empleado.

**Desde VP TEC**  

Ofrecer un framework de trabajo para el desarrollo de los Citizen Developers bajo Gobierno de VP TEC.

**Desde el Negocio**  

*   Responsabilidad de los propietarios
*   Declaración de la actividad
*   Aceptación del Riesgo

¿Qué dice Gartner?
------------------

Categorías
----------

**Básico**

**Power Platform Standard**

**Sweet Spot**

Cantidad de usuarios directos o procesos que afecten a menos de 20 personas.  
Sin conexión a Aplicaciones.

**Avanzado**

**Power Platform Premium + Copilot Studio**

**Guided**

Cantidad de usuarios directos o procesos que afecten a menos de 20 personas.  
Puede conectarse para lectura al DW Lógico, sólo con autorización y acompañamiento de VP TEC.

**No Aplica**

**Power Automate Desktop + Copilot Studio**

**Off-Limits**

Desarrollos para más de 20 usuarios directos deberán ser realizados por el equipo Ingeniería de SW de la VP TEC.   
Debido a la complejidad y el precio de las licencias, cualquier requerimiento deberá ser desarrollado a través del equipo Ingeniería de SW de la VP TEC.

Riesgos
-------

**Riesgo**

**Causa**

**Costo**

**Mitigación**

Pérdida de soporte y conocimiento de la aplicación.

Rotación personal Citizen Developers

$$

Documentación efectiva de la aplicación de acuerdo a los estándares de VP TEC. 

No todo se puede hacer con una tecnología, depende los casos de usos funcional y técnico, escalabilidad, performance, requisitos de ciberseguridad y compliance.

Desconocimiento de los límites de la tecnología.

$$$$

Presentar la necesidad a través de los canales de la VP TEC ( Sincro Técnica o directo a las GPD) para evaluar el requisito funcional, la tecnología, y el equipo con el conocimiento adecuado para resolverlo.

El ciclo de vida del producto, requiere dedicación al soporte, resolución de dudas e incidentes y evolución. 

Mantenimiento de producto por los Citizen Developers

$$$$

Cuando una aplicación comienza a tomar  escala (más allá de los 20 usuarios), debe pasar a VP TEC porque tenemos los procesos para cubrir el ciclo completo. 

Múltiples equipos crean Aplicaciones con el mismo objetivo implicando en MAYORES COSTOS en recursos gestionados por la VP TEC tales como: nube, licencias, servicios externos, enlaces, etc. 

Divergencia digital

$$$$

Mantenimiento de un catálogo de Aplicaciones, a cargo de la VP TEC; aportando asesoramiento equipos especializados en el diseño, desarrollo, implementación y evolución de los productos digitales de YPF, con foco en la reutilización tanto de Aplicaciones corporativas como de las desarrolladas por otros Citizen Developers.


# Página: https://isdocs.grupo.ypf.com/ia_conciencia.html

[Saltar al contenido principal](#main)

Conciencia IA
=============

Objetivo
--------

Concientizar sobre el uso responsable de sistemas de IA, mostrando que incluso en tareas simples pueden equivocarse.  
La IA **no reemplaza el pensamiento humano**, sino que lo complementa.

Ejemplo de prueba aplicada
--------------------------

Se pidió a distintas IA resolver esta ecuación:

5.9 = x + 5.11

**Todas las IA han fallado en algún punto.**

¿Qué demuestra esto?
--------------------

Este ejemplo, aunque simple, revela algo importante:

*   Las IA **pueden fallar en operaciones básicas**.
*   No siempre aplican correctamente las reglas (en este caso matemáticas).
*   Algunas interpretan mal el contexto o la lógica.

**No son infalibles**, aunque parezcan confiables.

La IA como herramienta, no como juez
------------------------------------

La IA es como una calculadora avanzada: **puede ayudar**, pero **no decide por sí sola**.  
Su utilidad depende de **cómo se la usa** y **quién la supervisa**

**Importante**: La IA **no tiene sentido común** ni entiende el "por qué" detrás de una operación. Solo procesa datos según patrones aprendidos.

Recomendaciones para el uso responsable
---------------------------------------

*   Verificá siempre las respuestas, especialmente en temas técnicos o críticos.
*   Usá tu criterio humano para validar lo que dice, usá la IA como apoyo, no como reemplazo.
*   Probá con distintos enfoques o reformulaciones.
*   Capacitá a tu equipo en pensamiento crítico frente a herramientas de IA.
*   Documentá los errores para mejorar el uso futuro.
*   Entendé sus limitaciones; La IA no es perfecta ni infalible; puede equivocarse incluso en lo obvio.

Conclusión
----------

La IA es una aliada poderosa, pero **no es palabra santa**, **necesita supervisión humana**. Su uso debe ir acompañado de verificación, criterio y sentido común.  
  
**Recordemos**: La responsabilidad final siempre **recae en las personas**, no en la tecnología.

Pruebas realizadas
------------------

**Prueba 1**

Resolve  
5.9 = x + 5.11

**Prueba 2**

Eres un experto en resolver problemas matemáticos de 1 variable.  
Resolve  
5.9=x+5.11

**Prueba 3**

Eres un experto en resolver problemas matemáticos de 1 variable.  
Resolve  
5.9=x+5.11  
Explica cómo llegaste al resultado (paso a paso) y valida que el resultado sea correcto.

### ChatGPT

Prueba 1

Prueba 2

Prueba 3

### Microsoft Copilot 365

Prueba 1

Prueba 2

Prueba 3

  

### Claude

Prueba 1

Prueba 2

Prueba 3

### Gemini - (2.5 Flash)

Prueba 1

Prueba 2

Prueba 3

### Gemini - (PRO)

Prueba 1

Prueba 2

Prueba 3

### Deepseek

Prueba 1

Prueba 2

Prueba 3


# Página: https://isdocs.grupo.ypf.com/ia_sdlc.html

[Saltar al contenido principal](#main)

IA en SDLC
==========

**IA en el desarrollo de software**
===================================

**El rol ideal: Un asistente potente**
--------------------------------------

Tras analizar capacidades y limitaciones de la IA a través de las distintas etapas del desarrollo de software, emerge una conclusión clara: **la IA funciona mejor como un copiloto altamente capacitado que como un piloto automático**. Su verdadero valor se encuentra en la amplificación del trabajo del equipo de desarrollo.

**Fortalezas transversales**
----------------------------

La IA demuestra capacidades significativas que atraviesan todo el ciclo de desarrollo:

*   **Automatización de lo repetitivo**: Destaca en tareas rutinarias y predecibles, liberando tiempo valioso para los equipos.
*   **Aceleración del trabajo inicial**: Genera excelentes primeras versiones que los desarrolladores pueden refinar posteriormente.
*   **Análisis de grandes volúmenes de datos**: Puede procesar información en cantidades que podrían ser abrumadoras para una persona.
*   **Asistencia técnica**: Proporciona explicaciones, sugerencias y apoyo continuo durante todo el proceso.

**Limitaciones consistentes**
-----------------------------

Sin embargo, muestra limitaciones fundamentales consistentes en todas las etapas:

*   **Falta de comprensión contextual profunda**: No comprende verdaderamente el negocio, la organización o las implicaciones para los usuarios finales.
*   **Ausencia de criterio**: No puede evaluar trade-offs complejos que combinan factores técnicos, de negocio y experiencia de usuario.
*   **Deficiencias en innovación genuina**: Genera basándose en patrones existentes, sin capacidad para la verdadera disrupción.
*   **Necesidad de supervisión**: Su trabajo siempre debe ser revisado y validado por profesionales experimentados.

**El equilibrio óptimo**
------------------------

El uso ideal de la IA en el desarrollo de software requiere un equilibrio cuidadoso:

1.  ### **Máximo aprovechamiento en tareas de bajo riesgo y alta repetición**:
    

*   Generación de código boilerplate
*   Documentación técnica rutinaria
*   Tests unitarios básicos
*   Conversión de formatos
*   Análisis preliminar de datos

3.  ### **Supervisión profesional obligatoria en áreas críticas**:
    

*   Decisiones arquitectónicas
*   Interacciones con clientes y stakeholders
*   Evaluación de seguridad
*   Decisiones de negocio
*   Operaciones en producción
*   Diseño de experiencia de usuario

**Una herramienta de potenciación**
-----------------------------------

La IA está transformando el trabajo de los desarrolladores. En lugar de ocuparse de tareas repetitivas y mecánicas, los profesionales pueden enfocarse en actividades de mayor valor:

*   Toma de decisiones estratégicas
*   Innovación creativa
*   Comunicación interpersonal
*   Comprensión profunda del contexto de negocio

**El futuro del desarrollo con IA**
-----------------------------------

El futuro más prometedor no es donde los equipos que integran efectivamente la IA como herramienta superan consistentemente a aquellos que no lo hacen. El valor del desarrollador se desplaza hacia habilidades más difícilmente automatizables: pensamiento crítico, creatividad, empatía y visión estratégica.

En última instancia, la IA en el desarrollo de software es una herramienta de democratización y potenciación. Permite que desarrolladores de todos los niveles produzcan código de mayor calidad, aprendan más rápidamente y se enfoquen en resolver problemas realmente interesantes, dejando las tareas tediosas a su asistente digital.

La clave está en **usarla conscientemente** - aprovechando sus fortalezas mientras se mitigan sus limitaciones - manteniendo siempre el criterio del equipo de desarrollo como árbitro final.

La clave está en **usarla conscientemente** - aprovechando sus fortalezas mientras se mitigan sus limitaciones - manteniendo siempre el criterio del equipo de desarrollo como árbitro final.

Tené siempre presente las normativas de ciberseguridad, solo se puede utilizar las herramientas habilitadas por YPF para utilizar información propiedad de la empresa, sea código fuente, especificación funcional, etc.  
Actualmente están habilitadas copilot 365 (libre), github copilot (requiere licencia)


# Página: https://isdocs.grupo.ypf.com/findevida.html

Fin de vida
-----------

En esta pagina se muestran fechas de fin de vida y qué versiones tienen soporte de las distintas tecnologías usadas.

**bootstrap**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

5.3.8 (LTS)

\-

Sí

Si

4.6.2 (LTS)

1 de enero de 2023

No (El soporte finalizó hace 4 años, 8 meses y 3 semanas)

No (El soporte finalizó hace 3 años, 6 meses y 3 semanas)

3.4.1 (LTS)

24 de julio de 2019

No (El soporte finalizó hace 9 años, 10 meses y 2 semanas)

No (El soporte finalizó hace 7 años, )

2.3.2

19 de agosto de 2013

No (El soporte finalizó hace 12 años, 11 meses y 5 días)

No (El soporte finalizó hace 12 años, 11 meses y 5 días)

Mostrar Menos

**dotnet**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

10.0.10 (LTS)

14 de noviembre de 2028

Sí (El soporte finaliza en 2 años, 3 meses y 3 semanas)

Si (El soporte finaliza en 2 años, 3 meses y 3 semanas)

9.0.18

10 de noviembre de 2026

Sí (El soporte finaliza en 3 meses y 2 semanas)

Si (El soporte finaliza en 3 meses y 2 semanas)

8.0.29 (LTS)

10 de noviembre de 2026

Sí (El soporte finaliza en 3 meses y 2 semanas)

Si (El soporte finaliza en 3 meses y 2 semanas)

7.0.20

14 de mayo de 2024

No (El soporte finalizó hace 2 años, 2 meses y 1 semana)

No (El soporte finalizó hace 2 años, 2 meses y 1 semana)

6.0.36 (LTS)

12 de noviembre de 2024

No (El soporte finalizó hace 1 año, 8 meses y 1 semana)

No (El soporte finalizó hace 1 año, 8 meses y 1 semana)

5.0.17

10 de mayo de 2022

No (El soporte finalizó hace 4 años, 2 meses y 2 semanas)

No (El soporte finalizó hace 4 años, 2 meses y 2 semanas)

3.1.32 (LTS)

13 de diciembre de 2022

No (El soporte finalizó hace 3 años, 7 meses y 1 semana)

No (El soporte finalizó hace 3 años, 7 meses y 1 semana)

3.0.3

3 de marzo de 2020

No (El soporte finalizó hace 6 años, 4 meses y 3 semanas)

No (El soporte finalizó hace 6 años, 4 meses y 3 semanas)

2.2.8

23 de diciembre de 2019

No (El soporte finalizó hace 6 años, 7 meses y 1 día)

No (El soporte finalizó hace 6 años, 7 meses y 1 día)

2.1.30 (LTS)

21 de agosto de 2021

No (El soporte finalizó hace 4 años, 11 meses y 3 días)

No (El soporte finalizó hace 4 años, 11 meses y 3 días)

[2.0.9](https://github.com/dotnet/core/blob/main/release-notes/2.0/2.0.9.md)

1 de octubre de 2018

No (El soporte finalizó hace 7 años, 9 meses y 3 semanas)

No (El soporte finalizó hace 7 años, 9 meses y 3 semanas)

1.1.13

27 de junio de 2019

No (El soporte finalizó hace 7 años y 3 semanas)

No (El soporte finalizó hace 7 años y 3 semanas)

1.0.16

27 de junio de 2019

No (El soporte finalizó hace 7 años y 3 semanas)

No (El soporte finalizó hace 7 años y 3 semanas)

Mostrar Menos

**nginx**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

[1.31.3](https://nginx.org/en/CHANGES)

\-

Sí

Si

1.30.4

\-

Sí

Si

[1.29.8](https://nginx.org/en/CHANGES)

13 de mayo de 2026

No (El soporte finalizó hace 2 meses y 1 semana)

No (El soporte finalizó hace 2 meses y 1 semana)

1.28.3

14 de abril de 2026

No (El soporte finalizó hace 3 meses y 1 semana)

No (El soporte finalizó hace 3 meses y 1 semana)

[1.27.5](https://nginx.org/en/CHANGES)

24 de junio de 2025

No (El soporte finalizó hace 1 año, 1 mes )

No (El soporte finalizó hace 1 año, 1 mes )

1.26.3

23 de abril de 2025

No (El soporte finalizó hace 1 año, 3 meses y 1 día)

No (El soporte finalizó hace 1 año, 3 meses y 1 día)

[1.25.5](https://nginx.org/en/CHANGES)

29 de mayo de 2024

No (El soporte finalizó hace 2 años, 1 mes y 3 semanas)

No (El soporte finalizó hace 2 años, 1 mes y 3 semanas)

1.24.0

23 de abril de 2024

No (El soporte finalizó hace 2 años, 3 meses y 1 día)

No (El soporte finalizó hace 2 años, 3 meses y 1 día)

[1.23.4](https://nginx.org/en/CHANGES)

23 de mayo de 2023

No (El soporte finalizó hace 3 años, 2 meses y 1 día)

No (El soporte finalizó hace 3 años, 2 meses y 1 día)

1.22.1

11 de abril de 2023

No (El soporte finalizó hace 3 años, 3 meses y 1 semana)

No (El soporte finalizó hace 3 años, 3 meses y 1 semana)

[1.21.6](https://nginx.org/en/CHANGES)

21 de junio de 2022

No (El soporte finalizó hace 4 años, 1 mes y 3 días)

No (El soporte finalizó hace 4 años, 1 mes y 3 días)

1.20.2

24 de mayo de 2022

No (El soporte finalizó hace 4 años, 2 meses )

No (El soporte finalizó hace 4 años, 2 meses )

[1.19.10](https://nginx.org/en/CHANGES)

25 de mayo de 2021

No (El soporte finalizó hace 5 años, 1 mes y 4 semanas)

No (El soporte finalizó hace 5 años, 1 mes y 4 semanas)

1.18.0

20 de abril de 2021

No (El soporte finalizó hace 5 años, 3 meses y 4 días)

No (El soporte finalizó hace 5 años, 3 meses y 4 días)

1.16.1

20 de abril de 2020

No (El soporte finalizó hace 6 años, 3 meses y 4 días)

No (El soporte finalizó hace 6 años, 3 meses y 4 días)

1.14.2

23 de abril de 2019

No (El soporte finalizó hace 7 años, 3 meses y 1 día)

No (El soporte finalizó hace 7 años, 3 meses y 1 día)

1.12.2

17 de abril de 2018

No (El soporte finalizó hace 8 años, 3 meses y 1 semana)

No (El soporte finalizó hace 8 años, 3 meses y 1 semana)

1.10.3

12 de abril de 2017

No (El soporte finalizó hace 9 años, 3 meses y 1 semana)

No (El soporte finalizó hace 9 años, 3 meses y 1 semana)

1.8.1

26 de abril de 2016

No (El soporte finalizó hace 10 años, 2 meses y 4 semanas)

No (El soporte finalizó hace 10 años, 2 meses y 4 semanas)

1.6.3

21 de abril de 2015

No (El soporte finalizó hace 11 años, 3 meses y 3 días)

No (El soporte finalizó hace 11 años, 3 meses y 3 días)

1.4.7

24 de abril de 2014

No (El soporte finalizó hace 12 años, 3 meses )

No (El soporte finalizó hace 12 años, 3 meses )

1.2.9

24 de abril de 2013

No (El soporte finalizó hace 13 años, 3 meses )

No (El soporte finalizó hace 13 años, 3 meses )

1.0.15

23 de abril de 2012

No (El soporte finalizó hace 14 años, 3 meses y 1 día)

No (El soporte finalizó hace 14 años, 3 meses y 1 día)

Mostrar Menos

**nodejs**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

26.5.0 (LTS)

30 de abril de 2029

Sí (El soporte finaliza en 1 año, 3 meses y 3 días)

Si (El soporte finaliza en 2 años, 9 meses y 6 días)

25.9.0

1 de junio de 2026

No (El soporte finalizó hace 3 meses y 3 semanas)

No (El soporte finalizó hace 1 mes y 3 semanas)

24.18.0 (LTS)

30 de abril de 2028

Sí (El soporte finaliza en 2 meses y 3 semanas)

Si (El soporte finaliza en 1 año, 9 meses y 6 días)

23.11.1

1 de junio de 2025

No (El soporte finalizó hace 1 año, 3 meses y 3 semanas)

No (El soporte finalizó hace 1 año, 1 mes y 3 semanas)

22.23.1 (LTS)

30 de abril de 2027

No (El soporte finalizó hace 9 meses y 3 días)

Si (El soporte finaliza en 9 meses y 6 días)

21.7.3

1 de junio de 2024

No (El soporte finalizó hace 2 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 2 años, 1 mes y 3 semanas)

20.20.2 (LTS)

30 de abril de 2026

No (El soporte finalizó hace 1 año, 9 meses y 2 días)

No (El soporte finalizó hace 2 meses y 3 semanas)

19.9.0

1 de junio de 2023

No (El soporte finalizó hace 3 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 3 años, 1 mes y 3 semanas)

18.20.8 (LTS)

30 de abril de 2025

No (El soporte finalizó hace 2 años, 9 meses y 6 días)

No (El soporte finalizó hace 1 año, 2 meses y 3 semanas)

17.9.1

1 de junio de 2022

No (El soporte finalizó hace 4 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 4 años, 1 mes y 3 semanas)

16.20.2 (LTS)

11 de septiembre de 2023

No (El soporte finalizó hace 3 años, 9 meses y 6 días)

No (El soporte finalizó hace 2 años, 10 meses y 1 semana)

15.14.0

1 de junio de 2021

No (El soporte finalizó hace 5 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 5 años, 1 mes y 3 semanas)

14.21.3 (LTS)

30 de abril de 2023

No (El soporte finalizó hace 4 años, 9 meses y 5 días)

No (El soporte finalizó hace 3 años, 2 meses y 3 semanas)

13.14.0

1 de junio de 2020

No (El soporte finalizó hace 6 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 6 años, 1 mes y 3 semanas)

12.22.12 (LTS)

30 de abril de 2022

No (El soporte finalizó hace 5 años, 9 meses y 4 días)

No (El soporte finalizó hace 4 años, 2 meses y 3 semanas)

11.15.0

30 de junio de 2019

No (El soporte finalizó hace 7 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 7 años y 3 semanas)

10.24.1 (LTS)

30 de abril de 2021

No (El soporte finalizó hace 6 años, 2 meses y 5 días)

No (El soporte finalizó hace 5 años, 2 meses y 3 semanas)

9.11.2

30 de junio de 2018

No (El soporte finalizó hace 8 años y 3 semanas)

No (El soporte finalizó hace 8 años y 3 semanas)

8.17.0 (LTS)

31 de diciembre de 2019

No (El soporte finalizó hace 7 años, 6 meses y 3 semanas)

No (El soporte finalizó hace 6 años, 6 meses y 3 semanas)

7.10.1

30 de junio de 2017

No (El soporte finalizó hace 9 años y 3 semanas)

No (El soporte finalizó hace 9 años y 3 semanas)

6.17.1 (LTS)

30 de abril de 2019

No (El soporte finalizó hace 8 años, 2 meses y 3 semanas)

No (El soporte finalizó hace 7 años, 2 meses y 3 semanas)

5.12.0

30 de junio de 2016

No (El soporte finalizó hace 10 años y 3 semanas)

No (El soporte finalizó hace 10 años y 3 semanas)

4.9.1 (LTS)

30 de abril de 2018

No (El soporte finalizó hace 9 años, 3 meses y 3 semanas)

No (El soporte finalizó hace 8 años, 2 meses y 3 semanas)

[3.3.1](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_IOJS.md#__LATEST__)

Sin Soporte

No

No

[2.5.0](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_IOJS.md#__LATEST__)

Sin Soporte

No

No

[1.8.4](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_IOJS.md#__LATEST__)

Sin Soporte

No

No

Mostrar Menos

**react**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

19.2.8

\-

Sí

Si

18.3.1

\-

No (El soporte finalizó hace 1 año, 7 meses y 2 semanas)

Si

17.0.2

\-

No (El soporte finalizó hace 4 años, 3 meses y 3 semanas)

Si

16.14.0

\-

No (El soporte finalizó hace 5 años, 9 meses y 4 días)

Si

15.7.0

\-

No (El soporte finalizó hace 5 años, 9 meses y 1 semana)

Si

**vue**

Release

Fecha Fin de soporte

Soporte Activo

Soporte de seguridad

3.5.40

\-

Sí

Si

3.4.38

3 de septiembre de 2024

No (El soporte finalizó hace 1 año, 10 meses y 3 semanas)

No (El soporte finalizó hace 1 año, 10 meses y 3 semanas)

3.3.13

29 de diciembre de 2023

No (El soporte finalizó hace 2 años, 6 meses y 3 semanas)

No (El soporte finalizó hace 2 años, 6 meses y 3 semanas)

[2.7.16](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

31 de diciembre de 2023

No (El soporte finalizó hace 2 años, 6 meses y 3 semanas)

No (El soporte finalizó hace 2 años, 6 meses y 3 semanas)

3.2.47

11 de mayo de 2023

No (El soporte finalizó hace 3 años, 2 meses y 1 semana)

No (El soporte finalizó hace 3 años, 2 meses y 1 semana)

3.1.5

9 de agosto de 2021

No (El soporte finalizó hace 4 años, 11 meses y 2 semanas)

No (El soporte finalizó hace 4 años, 11 meses y 2 semanas)

3.0.11

7 de junio de 2021

No (El soporte finalizó hace 5 años, 1 mes y 2 semanas)

No (El soporte finalizó hace 5 años, 1 mes y 2 semanas)

[2.6.14](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

1 de julio de 2022

No (El soporte finalizó hace 4 años y 3 semanas)

No (El soporte finalizó hace 4 años y 3 semanas)

[2.5.22](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

4 de febrero de 2019

No (El soporte finalizó hace 7 años, 5 meses y 2 semanas)

No (El soporte finalizó hace 7 años, 5 meses y 2 semanas)

[2.4.4](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

13 de octubre de 2017

No (El soporte finalizó hace 8 años, 9 meses y 1 semana)

No (El soporte finalizó hace 8 años, 9 meses y 1 semana)

[2.3.4](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

13 de julio de 2017

No (El soporte finalizó hace 9 años y 1 semana)

No (El soporte finalizó hace 9 años y 1 semana)

[2.2.6](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

27 de abril de 2017

No (El soporte finalizó hace 9 años, 2 meses y 3 semanas)

No (El soporte finalizó hace 9 años, 2 meses y 3 semanas)

[2.1.10](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

26 de febrero de 2017

No (El soporte finalizó hace 9 años, 4 meses y 3 semanas)

No (El soporte finalizó hace 9 años, 4 meses y 3 semanas)

[2.0.8](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

22 de noviembre de 2016

No (El soporte finalizó hace 9 años, 8 meses y 2 días)

No (El soporte finalizó hace 9 años, 8 meses y 2 días)

[1.0.28](https://github.com/vuejs/vue/releases/tag/v__LATEST__)

Sin Soporte

No

No

Mostrar Menos
