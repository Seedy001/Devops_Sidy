pipeline {
    agent any
    environment {
        APP_NAME = 'mon-application'
        APP_VERSION = "v${BUILD_NUMBER}"
        DOCKER_IMAGE = "${APP_NAME}:${APP_VERSION}"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }
    stages {
        stage('1. Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Seedy001/Devops_Sidy.git'
            }
        }
        stage('2. Docker Build') {
            steps {
                sh """
                    eval \$(minikube docker-env)
                    docker build -t ${DOCKER_IMAGE} .
                    docker tag ${DOCKER_IMAGE} ${APP_NAME}:latest
                """
            }
        }
        stage('3. Deploy to Kubernetes') {
            steps {
                sh "sed -i 's|image: mon-application:.*|image: ${DOCKER_IMAGE}|g' k8s/deployment.yaml"
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
