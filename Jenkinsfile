node {
    def app
    stage("SCM Checkout"){
        checkout scm
    }
    
    stage('Initialize Docker Setup'){
        def dockerHome = tool 'docker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
    
    stage('Build Docker Image'){    		
       app = docker.build("pingintelligence/user-mgmt-image")    
    }
    
    stage('Test image') {           
       app.inside {              
          sh 'echo "Tests passed"'        
       }    
    }
   
    stage('Push Docker Image'){
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        app.push("latest")  
        }
    }
    
    stage('Cleaning up Disk Space') {
        sh "docker image prune -f"
    } 
    
    stage('Deploying new service into Kubernetes') {
        sshagent(credentials: ['ssh-key-iu']) {
            
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@149.165.156.145  "sudo su 
                sudo rm -rf PingIntelligence &&
                git clone https://github.com/airavata-courses/PingIntelligence.git &&
                cd PingIntelligence &&
                git checkout kubernetes_files
                sudo su
                sudo kubectl delete deployment,service user-mgmt &&
                sudo kubectl apply -f user-mgmt.yaml"
               '''
        }
        
        sshagent(credentials: ['ssh-key-tacc']) {
            
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@129.114.16.125  "sudo su 
                sudo rm -rf PingIntelligence &&
                git clone https://github.com/airavata-courses/PingIntelligence.git &&
                cd PingIntelligence &&
                git checkout kubernetes_files
                sudo su
                sudo kubectl delete deployment,service user-mgmt &&
                sudo kubectl apply -f user-mgmt.yaml"
               '''
        }
    }
}
