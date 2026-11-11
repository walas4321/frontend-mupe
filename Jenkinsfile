pipeline {
    agent any

    environment {
        // Proyecto
        PROJECT_NAME = "front-mupe"

        // Harbor
        HARBOR_URL = "192.168.5.98:8099"
        HARBOR_PROJECT = "sbn"
        IMAGE_NAME = "ui-denuncias-mupe-prueba"

        // Tag generado automáticamente
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

        // Sonar
        SONARQUBE_ENV = "SonarQube-Server"
    }

    stages {

      /*
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh '''
                        mvn sonar:sonar
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        */

        stage('Docker Build') {
            steps {
                sh """
                    docker build \
                    -t ${HARBOR_URL}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'harbor-credentials',
                        usernameVariable: 'HARBOR_USER',
                        passwordVariable: 'HARBOR_PASS'
                    )
                ]) {
                    sh '''
                        echo "$HARBOR_PASS" | docker login $HARBOR_URL \
                        -u "$HARBOR_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to Harbor') {
            steps {
                sh """
                    docker push ${HARBOR_URL}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG} 
                """
            }
        }

    }

    post {
        success {
            echo "=============================================="
            echo "Imagen publicada correctamente"
            echo "${HARBOR_URL}/${HARBOR_PROJECT}/${IMAGE_NAME}:${IMAGE_TAG}"
            echo "=============================================="
        }

        failure {
            echo "Pipeline falló."
        }

        always {
            sh 'docker logout ${HARBOR_URL} || true'
        }
    }
}
