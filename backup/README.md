# Backup de la base de datos

Guarda aqui los archivos de respaldo generados localmente. Los archivos
`*.backup` estan ignorados por Git para evitar subir datos pesados o sensibles.

Generar backup:

```bash
pg_dump -U postgres -h localhost -p 5432 -d bde_ladm_sinic -F c -b -v -f backup/bde_ladm_sinic.backup
```

Restaurar backup:

```bash
pg_restore -U postgres -h localhost -p 5432 -d bde_ladm_sinic -v backup/bde_ladm_sinic.backup
```

Si se restaura sobre una base existente, verifica antes que la base destino no
contenga datos que deban conservarse.
