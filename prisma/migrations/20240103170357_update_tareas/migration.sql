-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tareas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Sin asignar',
    "usuarioId" INTEGER,
    CONSTRAINT "Tareas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tareas" ("descripcion", "estado", "id", "texto", "usuarioId") SELECT "descripcion", "estado", "id", "texto", "usuarioId" FROM "Tareas";
DROP TABLE "Tareas";
ALTER TABLE "new_Tareas" RENAME TO "Tareas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
