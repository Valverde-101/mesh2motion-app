export type Mesh2MotionLanguage = 'en' | 'es'

const spanish_translations: Record<string, string> = {
  'Explore': 'Explorar',
  'Use Your Model': 'Usar tu modelo',
  'Use Your Rigged Model': 'Usar tu modelo con esqueleto',
  'Learn': 'Aprender',
  'Contributors': 'Colaboradores',
  'Rotate': 'Girar',
  'Pan': 'Desplazar',
  'Zoom': 'Zoom',
  'Rotate Model to face front': 'Girar el modelo hacia el frente',
  '(blue origin line)': '(línea de origen azul)',
  'Skeleton template:': 'Plantilla del esqueleto:',
  'Skeleton template': 'Plantilla del esqueleto',
  'Bind pose': 'Posición de reposo',
  'Back': 'Atrás',
  '‹ Back': '‹ Atrás',
  'Change': 'Cambiar',
  'Library': 'Biblioteca',
  'Selected': 'Seleccionadas',
  'Select All': 'Seleccionar todo',
  'Deselect All': 'Deseleccionar todo',
  'Loading animation data': 'Cargando datos de animación',
  'Loading model…': 'Cargando modelo…',
  'Loading model...': 'Cargando modelo…',
  'Props': 'Accesorios',
  'Choose Model': 'Elegir modelo',
  'Cancel': 'Cancelar',
  'Replace Model': 'Reemplazar modelo',
  'Upload': 'Subir',
  'or': 'o',
  'Reference model': 'Modelo de referencia',
  'Load': 'Cargar',
  'Debug': 'Depurar',
  'Position model': 'Colocar modelo',
  'Analyze Import': 'Analizar importación',
  'Reset position': 'Restablecer posición',
  'Auto-align to floor': 'Alinear automáticamente al suelo',
  'Hand Options': 'Opciones de manos',
  'All Fingers': 'Todos los dedos',
  'Thumb + Main Finger': 'Pulgar y dedo principal',
  'All Fingers - Simplified': 'Todos los dedos (simplificado)',
  'Single Hand Bone': 'Un hueso por mano',
  'Scale skeleton': 'Escalar esqueleto',
  'Positioning': 'Posicionamiento',
  'Mesh volume': 'Volumen de la malla',
  'Transform Widget': 'Control de transformación',
  'Transform': 'Transformar',
  'Space': 'Espacio',
  'Move Bone Children': 'Mover huesos hijos',
  'Yes': 'Sí',
  'No': 'No',
  'Preview Display': 'Vista previa',
  'Weights': 'Pesos',
  'Textured': 'Texturizado',
  'Mirror Left/Right Joints': 'Reflejar articulaciones izquierda/derecha',
  'Use Head Weight Correction': 'Corregir pesos de la cabeza',
  'Height:': 'Altura:',
  'Use Arm Plane Correction': 'Corregir el plano de los brazos',
  'Distance:': 'Distancia:',
  'Edit Skeleton  ›': 'Editar esqueleto  ›',
  'Selected Bone': 'Hueso seleccionado',
  'Bring your own rigged model': 'Trae tu propio modelo con esqueleto',
  'Experimental': 'Experimental',
  'View M2M rigs from GitHub.': 'Ver esqueletos de M2M en GitHub.',
  'Import your rig and map the bones to continue.': 'Importa tu modelo con esqueleto y asigna sus huesos para continuar.',
  'Mesh2Motion Skeleton': 'Esqueleto de Mesh2Motion',
  'bones': 'huesos',
  'No source skeleton loaded': 'No hay un esqueleto de origen cargado',
  'Your 3D Rig Model': 'Tu modelo 3D con esqueleto',
  'Analyze': 'Analizar',
  'Upload Rig': 'Subir esqueleto',
  'Auto-Map': 'Asignar automáticamente',
  'Clear Mappings': 'Borrar asignaciones',
  'No target skeleton loaded': 'No hay un esqueleto de destino cargado',
  'No matching source bones': 'No hay huesos de origen coincidentes',
  'No matching target bones': 'No hay huesos de destino coincidentes',
  'No bone mapping needed. The uploaded model is using a Mesh2Motion rig. The bone names of this match the source skeleton exactly.': 'No hace falta asignar huesos. El modelo usa un esqueleto de Mesh2Motion con los mismos nombres de huesos que el esqueleto de origen.',
  'Continue': 'Continuar',
  'Source bones filter': 'Filtrar huesos de origen',
  'Target bones filter': 'Filtrar huesos de destino',
  'Continue requirements help': 'Ayuda sobre los requisitos para continuar',
  'Settings': 'Ajustes',
  'Open settings': 'Abrir ajustes',
  'Language': 'Idioma',
  'English': 'Inglés',
  'Light intensity': 'Intensidad de luz',
  'Turntable': 'Giro de cámara',
  'Show floor grid': 'Mostrar cuadrícula del suelo',
  'Solid background': 'Fondo sólido',
  'Speed': 'Velocidad',
  'Animation speed': 'Velocidad de animación',
  'Previous frame': 'Fotograma anterior',
  'Next frame': 'Fotograma siguiente',
  'Light': 'Claro',
  'Dark': 'Oscuro',
  'Theme: Light': 'Tema: claro',
  'Theme: Dark': 'Tema: oscuro',
  'No animation selected': 'No hay una animación seleccionada',
  'Show skeleton': 'Mostrar esqueleto',
  'Toggle wireframe': 'Alternar vista de malla',
  'Expand / Contract Arms': 'Expandir / contraer brazos',
  'Fine-tune arm spread across all animations for heavier or skinnier characters.': 'Ajusta la separación de los brazos en todas las animaciones para personajes más robustos o delgados.',
  'Reset arm extension': 'Restablecer extensión de brazos',
  'Reset': 'Restablecer',
  'Download': 'Descargar',
  'Download options': 'Opciones de descarga',
  'Open download options': 'Abrir opciones de descarga',
  'Download settings': 'Ajustes de descarga',
  'Download Options': 'Opciones de descarga',
  'Bone Naming Pattern': 'Formato de nombres de huesos',
  'Bone naming structure': 'Estructura de nombres de huesos',
  'File Format': 'Formato de archivo',
  'Export format': 'Formato de exportación',
  'FBX Preset': 'Preajuste de FBX',
  'FBX export preset': 'Preajuste de exportación FBX',
  'Contents': 'Contenido',
  'Export contents': 'Contenido de exportación',
  'Exporting will combine all selected animations into a single downloadable file.': 'La exportación combinará las animaciones seleccionadas en un solo archivo descargable.',
  'Close': 'Cerrar',
  'No animations found.': 'No se encontraron animaciones.',
  'Request an animation': 'Solicitar una animación',
  'Not finding what you want?': '¿No encuentras lo que buscas?',
  'Custom animation': 'Animación personalizada',
  'Play': 'Reproducir',
  'Pause': 'Pausar',
  'Export Mirrored Animation: No': 'Exportar animación reflejada: No',
  'Export Mirrored Animation: Yes': 'Exportar animación reflejada: Sí',
  'Export Mirrored Animation: Original and Mirrored': 'Exportar animación reflejada: original y reflejada',
  'You are back online': 'Se restableció la conexión',
  'You are offline': 'No hay conexión a internet',
  'Move': 'Mover',
  'Rotate bones': 'Girar huesos',
  'Move bones': 'Mover huesos',
  'Select': 'Seleccionar',
  'Reset view': 'Restablecer vista',
  'Arm extension': 'Extensión de brazos',
  'Show grid': 'Mostrar cuadrícula',
  'Request failed': 'La solicitud falló',
  'An error occurred': 'Se produjo un error',
  'Unknown error': 'Error desconocido',
  'Unknown error occurred': 'Se produjo un error desconocido',
  'Retarget export failed': 'Falló la exportación del retarget',
  'Retarget export failed:': 'Falló la exportación del retarget:',
  'No animations found in file': 'No se encontraron animaciones en el archivo',
  'Map at least one source bone to a target bone before continuing by dragging a bone from the source bones list to the target bones list.': 'Asigna al menos un hueso de origen a uno de destino arrastrándolo entre las listas para continuar.',
  'View bone hierarchy for for debugging purposes': 'Ver la jerarquía de huesos para depuración',
  'Mirror animations': 'Reflejar animaciones',
  'Upload model': 'Subir modelo',
  'Load model': 'Cargar modelo',
  'Model selection': 'Selección de modelo',
  'Animation view mode': 'Modo de vista de animaciones',
  'No animations selected': 'No hay animaciones seleccionadas',
  'Export options': 'Opciones de exportación',
  'Import animations': 'Importar animaciones',
  'Delete': 'Eliminar',
  'Apply': 'Aplicar',
  'Done': 'Listo',
  'Open': 'Abrir',
  'Search': 'Buscar',
  'Filter': 'Filtrar',
  'Rotate Model': 'Girar modelo',
  'Move Model': 'Mover modelo',
  'Reset Model': 'Restablecer modelo',
  'Create': 'Crear',
  'Save': 'Guardar',
  'Male': 'Masculino',
  'Female': 'Femenino',
  'Human': 'Humano',
  'Human (A-Pose)': 'Humano (pose A)',
  'Fox': 'Zorro',
  'Bird': 'Ave',
  'Dragon': 'Dragón',
  'Spider': 'Araña',
  'Snake': 'Serpiente',
  'Fish': 'Pez',
  'Horse': 'Caballo',
  'Help': 'Ayuda',
  'dropdown': 'desplegar',
  'Load Model': 'Cargar modelo',
  'Reset Arm Extension': 'Restablecer extensión de brazos',
  'Animations': 'Animaciones',
  'Explore - Mesh2Motion': 'Explorar - Mesh2Motion',
  'Create - Mesh2Motion': 'Crear - Mesh2Motion',
  'Retarget - Mesh2Motion': 'Transferir animaciones - Mesh2Motion',
  'Request an Animation': 'Solicitar una animación',
  'Rig type': 'Tipo de esqueleto',
  'Other / new rig type': 'Otro / nuevo tipo de esqueleto',
  'What animation(s) would you like?': '¿Qué animación o animaciones te gustaría solicitar?',
  'Something went wrong submitting your request. Please try again.': 'Ocurrió un error al enviar la solicitud. Inténtalo de nuevo.',
  'Submit': 'Enviar',
  'Enjoy the free animations': 'Disfruta de las animaciones gratuitas',
  'Support the Project': 'Apoya el proyecto',
  'Learn More': 'Saber más',
  'How was your experience?': '¿Qué te pareció la experiencia?',
  'Join Our Community': 'Únete a nuestra comunidad',
  'Did you know there is an offline version available? Visit': '¿Sabías que hay una versión sin conexión? Visita',
  'the releases page': 'la página de versiones',
  'The animations have been saved to your Downloads folder': 'Las animaciones se guardaron en la carpeta Descargas',
  'Multiple Root Bones Detected in Skeleton': 'Se detectaron varios huesos raíz en el esqueleto',
  'Cancel Import': 'Cancelar importación',
  'Target Skeleton Hierarchy': 'Jerarquía del esqueleto de destino',
  'No target skeleton loaded.': 'No hay un esqueleto de destino cargado.',
  'No model has been imported yet.': 'Todavía no se ha importado ningún modelo.',
  'Nothing unusual found. The model imported cleanly.': 'No se encontraron problemas. El modelo se importó correctamente.',
  'Things to check': 'Aspectos por revisar',
  'Summary': 'Resumen',
  'In the file': 'En el archivo',
  'After import': 'Después de importar',
  'Material: none': 'Material: ninguno',
  'Project Maintainer': 'Responsable del proyecto',
  'Base human model, rig, and animations.': 'Modelo humano base, esqueleto y animaciones.',
  'Provided algorithm to help retarget human rigs for animations.': 'Aportó el algoritmo para adaptar animaciones a esqueletos humanos.',
  'Adding custom animation importer.': 'Añadió la importación de animaciones personalizadas.',
  'Added improved move functionality when importing model.': 'Mejoró el movimiento del modelo durante la importación.',
  'For the amazing Three.js library.': 'Por la excelente biblioteca Three.js.',
  'Check out the': 'Consulta la',
  "project's guide": 'guía del proyecto',
  'for instructions on contributing.': 'para obtener instrucciones sobre cómo contribuir.',
  'Visit YouTube Channel': 'Visita el canal de YouTube',
  'Tutorials and demos of the app.': 'Tutoriales y demostraciones de la aplicación.',
  'Visit Discord Server': 'Visita el servidor de Discord',
  'Ask questions or provide feedback': 'Haz preguntas o comparte tus comentarios'
}

const translatable_attributes = ['aria-label', 'alt', 'placeholder', 'title', 'data-tippy-content'] as const

export class LocalizationManager {
  private static instance: LocalizationManager | null = null
  private static readonly storage_key = 'mesh2motion-language'

  private language: Mesh2MotionLanguage = 'en'
  private readonly original_text = new WeakMap<Text, string>()
  private readonly translated_text = new WeakMap<Text, string>()
  private readonly original_attributes = new WeakMap<Element, Map<string, string>>()
  private readonly translated_attributes = new WeakMap<Element, Map<string, string>>()
  private readonly observer: MutationObserver

  private constructor () {
    this.language = this.load_language()
    this.apply_language()

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData' && mutation.target instanceof Text) {
          this.translate_text_node(mutation.target)
        } else if (mutation.type === 'attributes' && mutation.target instanceof Element && mutation.attributeName !== null) {
          this.translate_attribute(mutation.target, mutation.attributeName)
        } else {
          mutation.addedNodes.forEach(node => this.translate_node(node))
        }
      })
    })
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [...translatable_attributes],
      characterData: true,
      childList: true,
      subtree: true
    })
  }

  public static get_instance (): LocalizationManager {
    LocalizationManager.instance ??= new LocalizationManager()
    return LocalizationManager.instance
  }

  public get_language (): Mesh2MotionLanguage {
    return this.language
  }

  public set_language (language: Mesh2MotionLanguage): void {
    if (language !== 'en' && language !== 'es') {
      return
    }
    this.language = language
    try {
      window.localStorage.setItem(LocalizationManager.storage_key, language)
    } catch {
      // The selected language still applies until this page is closed.
    }
    this.apply_language()
  }

  private load_language (): Mesh2MotionLanguage {
    try {
      return window.localStorage.getItem(LocalizationManager.storage_key) === 'es' ? 'es' : 'en'
    } catch {
      return 'en'
    }
  }

  private apply_language (): void {
    document.documentElement.lang = this.language
    this.translate_node(document.documentElement)
  }

  private translate_node (node: Node): void {
    if (node instanceof Text) {
      this.translate_text_node(node)
      return
    }

    if (!(node instanceof Element)) {
      return
    }

    if (node.matches('script, style, code, pre')) {
      return
    }

    this.translate_attributes(node)
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT)
    let child = walker.nextNode()
    while (child !== null) {
      if (child instanceof Text) {
        this.translate_text_node(child)
      } else if (child instanceof Element) {
        this.translate_attributes(child)
      }
      child = walker.nextNode()
    }
  }

  private translate_attributes (element: Element): void {
    if (element.matches('script, style, code, pre')) {
      return
    }
    translatable_attributes.forEach(attribute => this.translate_attribute(element, attribute))
  }

  private translate_text_node (node: Text): void {
    if (node.parentElement !== null && node.parentElement.closest('script, style, code, pre, textarea, input') !== null) {
      return
    }

    const current_value = node.data
    let original_value = this.original_text.get(node)
    if (original_value === undefined) {
      original_value = current_value
      this.original_text.set(node, original_value)
    } else {
      const last_output = this.translated_text.get(node)
      if (current_value !== last_output && current_value !== original_value) {
        original_value = current_value
        this.original_text.set(node, original_value)
      }
    }

    const translated_value = this.localize_value(original_value)
    this.translated_text.set(node, translated_value)
    if (current_value !== translated_value) {
      node.data = translated_value
    }
  }

  private translate_attribute (element: Element, attribute: string): void {
    const current_value = element.getAttribute(attribute)
    if (current_value === null) {
      return
    }

    let attributes = this.original_attributes.get(element)
    if (attributes === undefined) {
      attributes = new Map()
      this.original_attributes.set(element, attributes)
    }
    let translated_attributes = this.translated_attributes.get(element)
    if (translated_attributes === undefined) {
      translated_attributes = new Map()
      this.translated_attributes.set(element, translated_attributes)
    }

    let original_value = attributes.get(attribute)
    if (original_value === undefined) {
      original_value = current_value
      attributes.set(attribute, original_value)
    } else if (current_value !== translated_attributes.get(attribute) && current_value !== original_value) {
      original_value = current_value
      attributes.set(attribute, original_value)
    }

    const translated_value = this.localize_value(original_value)
    translated_attributes.set(attribute, translated_value)
    if (current_value !== translated_value) {
      element.setAttribute(attribute, translated_value)
    }
  }

  private localize_value (value: string): string {
    if (this.language !== 'es') {
      return value
    }

    const whitespace_match = value.match(/^(\s*)([\s\S]*?)(\s*)$/)
    if (whitespace_match === null) {
      return value
    }

    const [, leading, content, trailing] = whitespace_match
    const normalized_content = content.replace(/\s+/g, ' ').trim()
    let translated = spanish_translations[normalized_content]

    if (translated === undefined) {
      const animation_count = normalized_content.match(/^(\d+) animations?$/i)
      const bone_count = normalized_content.match(/^(\d+) bones?$/i)
      const play_label = normalized_content.match(/^Play (.+)$/)
      const animation_request_placeholder = normalized_content.match(/^Describe the animation\(s\) you want\. \((\d+) character max\)$/i)
      const feedback_placeholder = normalized_content.match(/^Optional feedback \(max\.? (\d+) characters?\)$/i)
      if (animation_count !== null) translated = `${animation_count[1]} animaciones`
      else if (bone_count !== null) translated = `${bone_count[1]} huesos`
      else if (play_label !== null) translated = `Reproducir ${play_label[1]}`
      else if (animation_request_placeholder !== null) translated = `Describe la animación o animaciones que quieres (máx. ${animation_request_placeholder[1]} caracteres)`
      else if (feedback_placeholder !== null) translated = `Comentarios opcionales (máx. ${feedback_placeholder[1]} caracteres)`
    }

    return translated === undefined ? value : `${leading}${translated}${trailing}`
  }
}
