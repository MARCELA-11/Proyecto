-- insetar alojamiento vinculado (ej 1)
INSERT INTO owners(
    owner_id, first_name, last_name, company_name, 
    email, phone, tax_id, address_line1, 
    address_line2, city, state, country, postal_code
)
VALUES(
    '01526558_20', 'Giillermo', 'Esmeralda Pérez', 'Instituto Nacional de Olocuilta', 
    'Mara@gmail.com', '7276-3825', '10034564', 'Olocuilta', 
    'casa # 16', 'Olocuilta', 'La Paz', 'El Salvador', '503'
);

SELECT * FROM owners

--Insertar ID en la tabla de tipos de alojamiento para que exista
INSERT INTO accommodation_types (accommodation_type_id, type_name)
VALUES ('0445090390', 'Deaprtamento');


--Crear alojamiento vinculado  (ejer. 2)
INSERT INTO accommodations(
    accommodation_id, owner_id, accommodation_type_id, location_id,
    name, description, max_guests, bedroom_count, bathroom_count,
    base_price_per_night, currency_code, check_in_time, is_active
)
VALUES(
    '15', '11', '044509900', '44',
    'Casa roja', 'Lugar cerca de la playa',
    12, 15, 12, 120.00, 'USD', '01:00:00', TRUE
);

Select * from accommodations


-- Insertar registro de huésped y reserva ejercicio 3
INSERT INTO guests (
    guest_id, first_name, last_name, email, phone, date_of_birth, 
    nationality, passport_number, emergency_contact_name, emergency_contact_phone  
) 
VALUES (
    9000, 'Marcela', 'Rodriguez', 'marcela.rodriguez@email.com', '61624357', '1991-05-26', 'El Salvador',                        
    'INO12345', ' Perez', '75865486'                    
)

Select * from guests


-- insertar registro de pago (ejer 4)
INSERT INTO payments (
    booking_id, amount, payment_method, payment_status, 
    payment_date
)
VALUES (
    2, 120.00,  'Tarjeta',  'Completed', NOW()           
);

SELECT * FROM payments


-- Seleccionar alojamientos activos (ejercicio 5)
SELECT accommodation_id, name, description, base_price_per_night, location_id, is_active
FROM accommodations
WHERE is_active = TRUE;


-- Filtrar huesped por pais(ejercicio 6)
SELECT * FROM guests

SELECT
    guest_id,
    first_name,
    last_name,
    email,
    nationality
FROM guests
WHERE nationality = 'El Salvador';

-- Reservar por fecha con uso de between ejercicio 7
SELECT 
    guest_id, 
    check_in_date, 
    check_out_date, 
    total_amount
FROM 
    bookings
WHERE 
    check_in_date BETWEEN '2026-06-01' AND '2026-06-30';
	
	
-- Modificando precio del cliente ejercicio 8
UPDATE bookings
SET total_amount = 450.00      
WHERE guest_id = 30;

Select guest_id, total_amount from bookings 


-- Actualizar estado de recerva ejercicio 9
UPDATE bookings
SET booking_status_id = 2  
WHERE guest_id = 105;

SELECT booking_status_id, special_requests FROM bookings


-- Eliminar reseña ejer 10
DELETE FROM reviews
WHERE accommodation_id = 2;

SELECT accommodation_id FROM reviews


-- Combinar datos de las reservas y huesped ejer 11
SELECT 
    b.booking_id AS booking_id,
    b.check_in_date AS check_in_date,
    b.check_out_date AS check_out_date,
    b.total_amount AS total_amount,   
    g.first_name AS first_name,       
    g.last_name AS last_name,         
    g.email AS email                  
FROM 
    bookings b
INNER JOIN 
    guests g ON b.guest_id = b.booking_id;
	
-- Combinar alojamiento completo con un INNER JOIN multiple ej. 12
SELECT 
    a.accommodation_id AS accommodation_id,
    a.name AS name,
    a.base_price_per_night AS base_price_per_night,
    t.type_name AS type_name,
    l.city AS city,
    l.country AS country,
    o.first_name AS first_name,
    o.last_name AS last_name,
    o.email AS email,
    am.description AS description
FROM 
    accommodations a
INNER JOIN accommodation_types t ON a.accommodation_type_id = t.accommodation_type_id
INNER JOIN locations l ON a.location_id = l.location_id
INNER JOIN owners o ON a.owner_id = o.owner_id
INNER JOIN accommodation_amenities aa ON a.accommodation_id = aa.accommodation_id
INNER JOIN amenities am ON aa.amenity_id = am.amenity_id;

-- Pagos + reservas(JOIN combinado)ejer 13
SELECT 
    b.booking_id AS reserva_id,
    b.check_in_date AS fecha_ingreso,
    b.check_out_date AS fecha_salida,
    b.total_amount AS precio_total,
    s.booking_status_id AS estado_reserva,         
    g.first_name AS nombre_huesped,  
    g.last_name AS apellido_huesped,   
    p.payment_id AS pago_id,           
    p.amount AS monto_pagado,         
    p.payment_date AS fecha_pago       
FROM 
    bookings b
LEFT JOIN booking_statuses s ON b.booking_status_id = s.booking_status_id
LEFT JOIN guests g ON b.guest_id = g.guest_id
LEFT JOIN payments p ON b.booking_id = p.booking_id;

--Sin reseñas incluye nulls ejerc 14
SELECT 
    a.accommodation_id,
    a.name AS nombre_alojamiento,
    a.base_price_per_night AS precio_base
FROM 
    accommodations a
LEFT JOIN reviews r ON a.accommodation_id = r.accommodation_id
WHERE 
    r.review_id IS NULL;  
	
-- Filtro de nulls sin reservas ejer 15
SELECT 
    g.guest_id,
    g.first_name AS nombre,
    g.last_name AS apellido,
    g.email
FROM 
    guests g
LEFT JOIN bookings b ON g.guest_id = b.guest_id
WHERE 
    b.booking_id IS NULL;  
	
-- Total de ingreso(ejer 16)
SELECT 
    SUM(amount) AS ingreso_total_global
FROM 
    payments;
	
-- AGG promedio rating AVG (ejer 17)
SELECT 
    o.owner_id,
    o.first_name AS nombre,
    o.last_name AS apellido,
    ROUND(AVG(r.rating), 1) AS rating_promedio_anfitrion
FROM 
    owners o
INNER JOIN accommodations a ON o.owner_id = a.owner_id
INNER JOIN reviews r ON a.accommodation_id = r.accommodation_id
GROUP BY 
    o.owner_id, 
    o.first_name, 
    o.last_name
ORDER BY 
    rating_promedio_anfitrion DESC;


-- Top alojamientos rating (ejer18)
SELECT 
    a.accommodation_id AS alojamiento_id,
    a.name AS nombre_alojamiento,
    COUNT(b.booking_id) AS total_reservas
FROM 
    accommodations a
INNER JOIN bookings b ON a.accommodation_id = b.accommodation_id
GROUP BY 
    a.accommodation_id, 
    a.description
ORDER BY 
    total_reservas DESC
LIMIT 10;

-- Mas de 3 reservas (ejer 19)
SELECT 
    a.accommodation_id AS alojamiento_id,
    a.name AS nombre_alojamiento,
    COUNT(b.booking_id) AS total_reservas
FROM 
    accommodations a
INNER JOIN bookings b ON a.accommodation_id = b.accommodation_id
GROUP BY 
    a.accommodation_id, 
    a.name
HAVING 
    COUNT(b.booking_id) > 3
ORDER BY 
    total_reservas DESC;


	-- Sub consulta de alojamiento mas caro(ejer 20)
SELECT 
    a.accommodation_id,
    a.name AS nombre_alojamiento,
    t. type_name AS tipo_alojamiento,
    l.city AS ciudad,
    l.country AS pais,
    a.base_price_per_night AS precio_por_noche
FROM 
    accommodations a
INNER JOIN accommodation_types t ON a.accommodation_type_id = t.accommodation_type_id
INNER JOIN locations l ON a.location_id = l.location_id
WHERE 
    a.base_price_per_night = (
        SELECT MAX(base_price_per_night) 
        FROM accommodations
    );

	