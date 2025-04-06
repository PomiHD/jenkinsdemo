pipeline {
    agent any
    tools {
        nodejs "NodeJS-22"
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'develop', url: 'https://github.com/PomiHD/jenkinsdemo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'

                // 显式安装gh-pages（避免开发依赖未安装的情况）
                sh 'npm install gh-pages --save-dev --prefer-offline'
            }
        }

        stage('Lint & Auto Fix') {
            steps {
                sh 'npm run lint -- --fix'
                sh '''
                  git add . || true
                  if ! git diff --cached --exit-code; then
                    git commit -m "Jenkins: Auto-fix lint errors"
                  fi
                '''
            }
        }

        stage('Build Project') {
            steps {
                sh 'rm -rf dist/ && npm run build'
                sh 'touch dist/.nojekyll'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
                        sh '''
                          git config --global user.email "wsgddjy@live.com"
                          git config --global user.name "PomiHD"
                          npx gh-pages --dist dist --repo "https://${GH_TOKEN}@github.com/PomiHD/jenkinsdemo.git" --clean
                        '''
                    }
                }
            }
        }
    }
    post {
        failure {
            emailext body: "构建失败：${env.JOB_NAME} - ${env.BUILD_NUMBER}\n详情：${env.BUILD_URL}",
                    subject: "Jenkins构建失败告警 - ${env.JOB_NAME}",
                    to: 'wsgddjy@live.com'
        }
    }
}