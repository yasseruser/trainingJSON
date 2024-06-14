# Utiliser une image de base Keycloak
# FROM quay.io/keycloak/keycloak:24.0.4
# Étape de construction
FROM quay.io/keycloak/keycloak:latest as builder

# Activer la prise en charge de la santé et des métriques
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configurer un fournisseur de base de données
ENV KC_DB=postgres

WORKDIR /opt/keycloak

# Pour des raisons de démonstration uniquement, assurez-vous d'utiliser des certificats appropriés en production
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

# Étape finale
FROM quay.io/keycloak/keycloak:latest

# Copier les fichiers de la phase de construction
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Changer ces valeurs pour pointer vers une instance postgres en cours d'exécution
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://localhost:5432/authenticationmanagment
ENV KC_DB_USERNAME=postgres
ENV KC_DB_PASSWORD=admin
ENV KC_HOSTNAME=localhost

# Définir le point d'entrée
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

# Exposer le port
EXPOSE 8087

# Commande de démarrage
CMD ["start-dev", "--http-port=8087"]