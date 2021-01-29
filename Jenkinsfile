#! groovy

pipeline {
    agent {
        kubernetes {
            defaultContainer 'kaniko-crane'
            yamlFile 'jnlp.yaml'
        }
    }

    environment {
        GITHASH = GIT_COMMIT.take(7)
    }

    stages {
        stage('Build Docker Image') {
            steps {
                container('kaniko-crane') {
                    sh 'auto/kaniko-build.sh'
                }
            }
        }

//        stage('Scan Docker Image') {
//            steps {
//                container('trivy') {
//                    sh "auto/trivy.sh"
//                }
//            }
//        }

        stage('Push Docker Image') {
            steps {
                container('kaniko-crane') {
                    sh 'auto/kaniko-push.sh'
                }
            }
        }

        stage('Update Image Tag in Github') {
            steps {
                container('argocd-auto-sync') {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'github-app-weijilab', usernameVariable: 'GH_APPID', passwordVariable: 'GH_TOKEN']]) {
                        sh "auto/argocd-auto-sync ${GH_TOKEN}"
                    }
                }
            }
        }
    }
}
