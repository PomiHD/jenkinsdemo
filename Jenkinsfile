pipeline {
  agent any
  tools { nodejs "NodeJS-22" }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'develop', url: 'https://github.com/PomiHD/jenkinsdemo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'mkdir -p $HOME/.npm && ln -s $HOME/.npm ./node_modules/.cache'
      }
    }

    stage('Lint Code') {
      steps {
        sh 'npm run lint -- --fix'
        sh 'git commit -am "Auto-fix lint errors" || true'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to GitHub Pages') {
      environment {
        DEPLOY_TOKEN = credentials('github-token')
      }
      steps {
        sh 'git config --global user.email "wsgddjy@live.com"'
        sh 'git config --global user.name "PomiHD"'
        sh '''
          cd dist
          git init
          git add .
          git commit -m "Auto-Deploy"
          git -c http.sslVerify=true push --force "https://${DEPLOY_TOKEN}@github.com/PomiHD/jenkinsdemo.git" main:gh-pages
        '''
      }
    }
  }

  post {
    always {
      sh 'rm -rf $WORKSPACE/dist/.git'
      sh 'find . -name "*.log" -type f -delete'
    }
  }
}