pipeline {
    agent any
    tools {
        nodejs "NodeJS-22" // 确保Jenkins中已配置对应版本的NodeJS
    }
    stages {
        stage('Checkout Code') {
            steps {
                git {
                    branch 'develop'
                    url 'https://github.com/PomiHD/jenkinsdemo.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // 先清理旧依赖确保纯净
                sh 'rm -rf node_modules/ || true'
                
                // 使用 npm ci 保持与package-lock.json严格一致
                sh 'npm ci' 
                
                // 显式安装gh-pages（避免开发依赖未安装的情况）
                sh 'npm install gh-pages --save-dev --prefer-offline'
            }
        }

        stage('Lint & Auto Fix') {
            steps {
                sh 'npm run lint -- --fix'
                
                // 仅当有变更时才提交（避免空提交失败）
                sh '''
                  if git diff --exit-code; then
                    echo "No lint fixes applied"
                  else
                    git commit -am "Jenkins: Auto-fix lint errors"
                  fi
                '''
            }
        }

        stage('Build Project') {
            steps {
                // 清理旧构建产物
                sh 'rm -rf dist/ || true'
                
                sh 'npm run build'
                
                // 确保生成.nojekyll文件（解决GitHub Pages下划线文件问题）
                sh 'touch dist/.nojekyll'
            }
        }

        stage('Deploy to GitHub Pages') {
            environment {
                // 使用Jenkins凭据管理器中的github-token
                GITHUB_TOKEN = credentials('github-token')
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
                        sh '''#!/bin/bash
                        # 配置Git身份（必须与GitHub账户匹配）
                        git config --global user.email "wsgddjy@live.com"
                        git config --global user.name "PomiHD"
                        
                        # 强制推送部署（处理首次部署无gh-pages分支的情况）
                        npx gh-pages \
                            --dist dist \
                            --repo "https://${GH_TOKEN}@github.com/PomiHD/jenkinsdemo.git" \
                            --clean \
                            --dotfiles \
                            --silent \
                            --message "Jenkins Auto Deploy $(date +'%Y-%m-%d %H:%M:%S')"
                        
                        # 可选：清理本地临时分支
                        git branch -D gh-pages-temp || true
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            // 清理工作空间（可选）
            cleanWs()
        }
        
        failure {
            // 构建失败时发送通知
            emailext body: "构建失败：${env.JOB_NAME} - ${env.BUILD_NUMBER}\n查看详情：${env.BUILD_URL}",
                    subject: "Jenkins构建失败告警 - ${env.JOB_NAME}",
                    to: 'wsgddjy@live.com'
        }
    }
}