-- 1. Crear los enums
CREATE TYPE "Rol" AS ENUM ('cliente', 'admin');
CREATE TYPE "Estado" AS ENUM ('pendiente', 'confirmada', 'cancelada');

-- 2. Arreglar tabla usuarios
ALTER TABLE usuarios ALTER COLUMN rol DROP DEFAULT;
ALTER TABLE usuarios ALTER COLUMN rol TYPE "Rol" USING rol::"Rol";
ALTER TABLE usuarios ALTER COLUMN rol SET DEFAULT 'cliente';

-- 3. Arreglar tabla reservaciones
ALTER TABLE reservaciones ALTER COLUMN estado DROP DEFAULT;
ALTER TABLE reservaciones ALTER COLUMN estado TYPE "Estado" USING estado::"Estado";
ALTER TABLE reservaciones ALTER COLUMN estado SET DEFAULT 'pendiente';

select * from usuarios