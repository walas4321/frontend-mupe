-- Script de inserción de menús para el sistema 09
-- Basado en la estructura del mock service y rutas existentes
-- Los slugs serán generados automáticamente por el backend usando generarSlug(descripcionIndice, descripcionSubindice)
-- El backend agrupa por descripcion_indice para crear las categorías

-- Grupo: Documentos Internos (Indice 1)
INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 1, 'registro documentos internos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 2, 'expedientes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 3, 'asignacion desasignacion documentos internos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 4, 'acumulacion folios', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 5, 'actualizacion orden servicio', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 6, 'gestion tipos envio', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 1, 'Documentos Internos', 7, 'derivacion correspondencia', '', 'H');

-- Grupo: Expedientes (Indice 5)
INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado, url, menu_padre_id, orden)
VALUES ('09', 5, 'Expedientes', 1, 'eliminacion expedientes agn', '', 'H', 'expedientes/eliminacion-expedientes-agn', NULL, 1);

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado, url, menu_padre_id, orden)
VALUES ('09', 5, 'Expedientes', 2, 'gestion resoluciones notificaciones', '', 'H', 'expedientes/gestion-resoluciones-notificaciones', NULL, 2);

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado, url, menu_padre_id, orden)
VALUES ('09', 5, 'Expedientes', 3, 'modificacion resoluciones', '', 'H', 'expedientes/modificacion-resoluciones', NULL, 3);

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado, url, menu_padre_id, orden)
VALUES ('09', 5, 'Expedientes', 4, 'modificacion notificaciones', '', 'H', 'expedientes/modificacion-notificaciones', NULL, 4);

-- Grupo: Procesos Recepción de Documentos (Indice 2)
INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 1, 'recepcion documentos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 2, 'generacion citas', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 3, 'derivacion documentos externos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 4, 'recepcion documentos internos externos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 5, 'prestamos solicitud ingreso', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 6, 'salida expedientes prestamo', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado, url, menu_padre_id, orden)
VALUES ('09', 2, 'Procesos Recepción de Documentos', 7, 'gestion tipos envio', '', 'H', 'gestion-tipos-envio', NULL, 7);

-- Grupo: Reportes (Indice 3)
INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 1, 'de resoluciones pendientes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 2, 'de resoluciones area', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 3, 'solicitud ingreso unidad organica', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 4, 'solicitudes ingreso gerencias', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 5, 'prestamos expedientes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 6, 'solicitud ingreso tupa derivaciones', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 7, 'expedientes entregados', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 8, 'consolidado solicitudes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 9, 'correspondencia oficios no enviados', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 3, 'Reportes', 10, 'citas', '', 'H');

-- Grupo: Mantenimiento (Indice 4)
INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 1, 'mantenimiento de adjuntos coordinadores', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 2, 'mantenimiento de usuarios alertas', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 3, 'mantenimiento actividades poi', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 4, 'mantenimiento de transferencia documentos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 5, 'mantenimiento de estantes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 6, 'mantenimiento de divisiones', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 7, 'mantenimiento de feriados', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 8, 'mantenimiento de brigadas', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 9, 'mantenimiento de procedimientos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 10, 'mantenimiento de pronunciamientos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 11, 'mantenimiento de actos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 12, 'mantenimiento de fondos documentales', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 13, 'mantenimiento de seccion documental', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 14, 'mantenimiento de serie documental', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 15, 'mantenimiento de derivacion expedientes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 16, 'mantenimiento de control expedientes', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 17, 'registro correspondencia', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 18, 'relacion oficios emitidos', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 19, 'mantenimiento de tramites', '', 'H');

INSERT INTO sbndb.pj.tbl_menu (codigo_sistema, indice, descripcion_indice, subindice, descripcion_subindice, tag_opcion, estado)
VALUES ('09', 4, 'Mantenimiento', 20, 'mantenimiento de periodicos', '', 'H');