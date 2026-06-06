-- Datos de prueba para validar los CRUD.

INSERT INTO ladm_sinic.interesado (
    id_interesado,
    tipo_interesado,
    tipo_documento,
    numero_documento,
    nombre_razon_social,
    correo,
    telefono,
    direccion
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Persona natural',
    'CC',
    '1000000001',
    'Maria Fernanda Rojas',
    'maria.rojas@example.com',
    '3001112233',
    'Carrera 10 # 15-20'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Persona juridica',
    'NIT',
    '900123456-7',
    'Agroservicios Andinos SAS',
    'contacto@agroandinos.example',
    '6015551010',
    'Calle 45 # 18-30'
) ON CONFLICT (id_interesado) DO NOTHING;

INSERT INTO ladm_sinic.unidad_administrativa (
    id_unidad_administrativa,
    codigo_predial,
    matricula_inmobiliaria,
    departamento,
    municipio,
    direccion,
    tipo_predio,
    destinacion_economica,
    area_terreno,
    area_construida,
    avaluo_catastral,
    fecha_inicio_vigencia,
    estado
) VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '110010100000000010001000000000',
    '50C-123456',
    'Bogota D.C.',
    'Bogota D.C.',
    'Carrera 10 # 15-20',
    'Urbano',
    'Habitacional',
    120.50,
    88.00,
    210000000,
    '2025-01-01',
    'Vigente'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '252690000000000020002000000000',
    '176-778899',
    'Cundinamarca',
    'Facatativa',
    'Vereda Mancilla',
    'Rural',
    'Agropecuario',
    4800.00,
    230.00,
    365000000,
    '2025-01-01',
    'Vigente'
) ON CONFLICT (id_unidad_administrativa) DO NOTHING;

INSERT INTO ladm_sinic.derecho_interesado (
    id_derecho,
    id_interesado,
    id_unidad_administrativa,
    tipo_derecho,
    porcentaje_participacion,
    observacion,
    fecha_inicio_vigencia,
    estado
) VALUES
(
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Dominio',
    100.00,
    'Registro de prueba para predio urbano.',
    '2025-01-01',
    'Vigente'
),
(
    '44444444-4444-4444-4444-444444444444',
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Dominio',
    100.00,
    'Registro de prueba para predio rural.',
    '2025-01-01',
    'Vigente'
) ON CONFLICT (id_derecho) DO NOTHING;

INSERT INTO ladm_sinic.unidad_espacial (
    id_unidad_espacial,
    id_unidad_administrativa,
    tipo_unidad_espacial,
    etiqueta,
    area_calculada,
    geometria,
    fecha_inicio_vigencia,
    estado
) VALUES
(
    '55555555-5555-5555-5555-555555555555',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Terreno',
    'UE-URB-001',
    120.50,
    ST_GeomFromText('POLYGON((5000000 2000000, 5000010 2000000, 5000010 2000012, 5000000 2000012, 5000000 2000000))', 9377),
    '2025-01-01',
    'Vigente'
),
(
    '66666666-6666-6666-6666-666666666666',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Terreno',
    'UE-RUR-001',
    4800.00,
    ST_GeomFromText('POLYGON((5000100 2000100, 5000180 2000100, 5000180 2000160, 5000100 2000160, 5000100 2000100))', 9377),
    '2025-01-01',
    'Vigente'
) ON CONFLICT (id_unidad_espacial) DO NOTHING;

INSERT INTO ladm_sinic.topografia_representacion (
    id_topografia,
    id_unidad_espacial,
    tipo_elemento,
    metodo_captura,
    precision_posicional,
    fuente_datos,
    observacion,
    geometria,
    fecha_levantamiento
) VALUES
(
    '77777777-7777-7777-7777-777777777777',
    '55555555-5555-5555-5555-555555555555',
    'Punto',
    'GNSS',
    0.250,
    'Levantamiento de campo',
    'Punto de control de prueba.',
    ST_GeomFromText('POINT(5000005 2000005)', 9377),
    '2025-03-12'
),
(
    '88888888-8888-8888-8888-888888888888',
    '66666666-6666-6666-6666-666666666666',
    'Linea',
    'Digitalizacion',
    1.500,
    'Ortofoto municipal',
    'Lindero digitalizado para validacion.',
    ST_GeomFromText('LINESTRING(5000100 2000100, 5000180 2000160)', 9377),
    '2025-03-18'
) ON CONFLICT (id_topografia) DO NOTHING;

INSERT INTO ladm_sinic.cartografia_catastral (
    id_cartografia,
    tipo_elemento,
    codigo,
    nombre,
    fuente,
    escala,
    geometria
) VALUES
(
    '99999999-9999-9999-9999-999999999999',
    'Manzana',
    'MZ-001',
    'Manzana catastral de prueba',
    'Cartografia municipal',
    '1:1000',
    ST_GeomFromText('POLYGON((4999990 1999990, 5000020 1999990, 5000020 2000020, 4999990 2000020, 4999990 1999990))', 9377)
),
(
    '12121212-1212-1212-1212-121212121212',
    'Via',
    'VIA-001',
    'Via local de prueba',
    'Cartografia base',
    '1:2000',
    ST_GeomFromText('LINESTRING(5000000 1999980, 5000040 2000020)', 9377)
) ON CONFLICT (id_cartografia) DO NOTHING;
