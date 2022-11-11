pipeline {
    agent any

    stages {
        stage('Install') {
            steps{
                dir("./fe-quick-learner/") {
                    sh 'curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -'
                    sh 'sudo apt-get install -y nodejs'
                    sh 'sudo npm install -g yarn@1.22.17'
                }
            }
        }
        
        stage('yarn') {
            steps{
                dir("./fe-quick-learner/") {
                    sh 'yarn'

                }
            }
        }
        stage('yarn build') {
            steps{
                dir("./fe-quick-learner/") {
                    sh 'yarn prettier'
                    sh 'yarn build'
                    

                }
            }
        }

        stage('artifact to s3') {
            steps{
            s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'fe-quick-learner-jenkins', excludedFile: '', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: false, noUploadOnFailure: false, selectedRegion: 'ap-southeast-2', showDirectlyInBrowser: false, sourceFile: 'build/**', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false]], pluginFailureResultConstraint: 'FAILURE', profileName: 'fe-quick-learner-jenkins', userMetadata: []
            }
        }
        
    }
    
}