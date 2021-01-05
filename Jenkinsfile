
pipeline {
    agent {
        docker {
            image 'node:14-alpine' 
            args '-p 3000:3000' 
        }
    }
     environment {
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm --version'
                echo 'Installing npm packages'
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
                echo 'Running tests'
                sh 'npm test'
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Not deploying'
            }
        }
    }
}
