#!/bin/bash
echo "Mise à jour des certs Jenkins..."
kubectl config view --flatten --minify > /tmp/kube_flat
sudo cp /tmp/kube_flat /var/lib/jenkins/.kube/config
sudo chown jenkins:jenkins /var/lib/jenkins/.kube/config
sudo cp /home/boulette/.minikube/certs/*.pem /var/lib/jenkins/.minikube/certs/
sudo chown -R jenkins:jenkins /var/lib/jenkins/.minikube
echo "Certs refreshed ✅"
