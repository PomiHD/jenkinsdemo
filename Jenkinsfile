pipeline {
  agent any

  tools {
    nodejs "NodeJS-22" // 与Jenkins中配置的名称一致
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'develop', url: 'https://github.com/PomiHD/jenkinsdemo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint Code') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to GitHub Pages') {
      environment {
        GITHUB_TOKEN = credentials('github-cred') // 凭据ID
      }
      steps {
        sh 'git config --global user.email "wsgddjy@live.com"'
        sh 'git config --global user.name "PomiHD"'
        sh 'npm run deploy'
        
        // 强制使用HTTPS+Token认证推送
            sh '''
              npm run build
              cd dist
              git init
              git add .
              git commit -m "Auto-Deploy"
              git push --force "https://${GITHUB_TOKEN}@github.com/PomiHD/jenkinsdemo.git" main:gh-pages
            '''
      }
    }
  }
}