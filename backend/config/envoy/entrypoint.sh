#!/bin/sh
sed -e "s/\${SERVICE_NAME}/${SERVICE_NAME}/" -e "s/\${SERVICE_PORT}/${SERVICE_PORT}/" -e "s/\${SERVICE_WS_PORT}/${SERVICE_WS_PORT}/" -e "s/\${SERVICE_LISTEN_PORT}/${SERVICE_LISTEN_PORT}/" -e "s/\${SERVICE_LISTEN_WS_PORT}/${SERVICE_LISTEN_WS_PORT}/" -e "s/\${ADMIN_LISTEN_PORT}/${ADMIN_LISTEN_PORT}/" /etc/envoy/envoy.yaml > /etc/envoy.yaml

printf "\n\n***** Dumping source config file /etc/envoy/envoy.yaml *****\n\n"
cat /etc/envoy/envoy.yaml

printf "\n\n***** Dumping final config file /etc/envoy.yaml *****\n\n"
cat /etc/envoy.yaml

/usr/local/bin/envoy -c /etc/envoy.yaml -l ${DEBUG_LEVEL}
