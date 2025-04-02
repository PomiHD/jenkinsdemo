pipeline {
  agent any
  tools {
    nodejs "NodeJS-22"
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'develop', 
        url: 'https://github.com/PomiHD/jenkinsdemo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
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
        // 关键修正：改用 Secret text 类型凭据
        GITHUB_TOKEN = credentials('github-token') 
      }
      steps {
        script {
          // 统一认证配置
          withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
            sh '''
              git config --global user.email "wsgddjy@live.com"
              git config --global user.name "PomiHD"
              
              # 清理旧分支
              git push origin --delete gh-pages || true
              
              # 使用安全方式部署
              npx gh-pages --dist dist --repo "https://${GH_TOKEN}@github.com/PomiHD/jenkinsdemo.git"
            '''
          }
        }
      }
    }
  }
}