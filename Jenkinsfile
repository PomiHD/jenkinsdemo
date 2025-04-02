pipeline {
  agent any
  tools {
    nodejs "NodeJS-22" // 确保与Global Tools配置名称完全一致
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
        sh 'npm ci' // 更安全的依赖安装方式
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
        // 必须使用usernamePassword类型凭据
        GIT_CREDENTIALS = credentials('github-cred')
      }
      steps {
        // 统一认证配置
        sh '''
          git config --global user.email "wsgddjy@live.com"
          git config --global user.name "PomiHD"
          
          # 使用gh-pages插件部署（需在package.json配置）
          npm run deploy
          
          # 清理残留分支
          git push origin --delete gh-pages || true
        '''
      }
    }
  }
}