pipeline {
    agent any

    environment {
        APP_NAME    = 'devops-misid'
        APP_VERSION = "v${BUILD_NUMBER}"
        DOCKER_IMAGE = "${APP_NAME}:${APP_VERSION}"
    }

    stages {

        stage('1. Checkout') {
            steps {
                echo '=== Récupération du code source ==='
                checkout scm
            }
        }

        stage('2. Docker Build') {
            steps {
                echo '=== Construction de l image Docker ==='
                sh "docker build -t ${DOCKER_IMAGE} ."
                sh "docker tag ${DOCKER_IMAGE} ${APP_NAME}:latest"
            }
        }

        stage('3. Deploy to Kubernetes') {
            steps {
                echo '=== Déploiement sur Minikube ==='
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl rollout restart deployment/devops-misid'
                sh 'kubectl rollout status deployment/devops-misid --timeout=120s'
            }
        }

        stage('4. Verify') {
            steps {
                echo '=== Vérification du déploiement ==='
                sh 'kubectl get pods -l app=devops-misid'
                sh 'kubectl get svc devops-misid-service'
            }
        }
    }

    post {
        success { echo 'Pipeline exécuté avec succès !' }
        failure { echo 'Le pipeline a échoué.' }
    }
}
