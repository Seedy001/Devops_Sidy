pipeline {
    agent any

    environment {
        APP_NAME = 'mon-application'
        APP_VERSION = "v${BUILD_NUMBER}"
        DOCKER_IMAGE = "${APP_NAME}:${APP_VERSION}"
    }

    stages {
        stage('1. Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Seedy001/Devops_Sidy.git'
            }
        }

        stage('2. Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
                sh "docker tag ${DOCKER_IMAGE} ${APP_NAME}:latest"
            }
        }

        stage('3. Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl rollout restart deployment/mon-application'
            }
        }

        stage('4. Verify') {
            steps {
                sh 'kubectl get pods -l app=mon-application'
                sh 'kubectl get svc mon-application-service'
            }
        }
    }
}
