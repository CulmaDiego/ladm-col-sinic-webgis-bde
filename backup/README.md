# Backup de la base de datos

Guarda aqui los archivos de respaldo generados localmente. Los archivos
`*.backup` estan ignorados por Git para evitar subir datos pesados o sensibles.

La forma recomendada es usar los botones de **Backup y restore** en la pagina de
Inicio del frontend:

- **Descargar backup:** genera un archivo `.backup`.
- **Restaurar backup:** carga un `.backup` generado por la aplicacion.

Generar backup manual:

```bash
pg_dump -U sinic_app -h localhost -p 5432 -d bde_ladm_sinic -F c --data-only --schema ladm_sinic --schema catalogos --schema auditoria -f backup/bde_ladm_sinic.backup
```

Restaurar backup manual:

```bash
pg_restore -U sinic_app -h localhost -p 5432 -d bde_ladm_sinic --data-only --no-owner --no-privileges --single-transaction backup/bde_ladm_sinic.backup
```

Si se restaura sobre una base existente, verifica antes que la base destino no
contenga datos que deban conservarse.
