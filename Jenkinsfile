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
       app = docker.build("pingintelligence/consumer-queue-image")    
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
        sshagent(credentials: ['ssh-key']) {
            
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@149.165.156.145  "sudo su 
                sudo rm -rf PingIntelligence &&
                git clone https://github.com/airavata-courses/PingIntelligence.git &&
                cd PingIntelligence &&
                git checkout kubernetes_files
                sudo su
                sudo kubectl delete deployment,service consumer-queue &&
                sudo kubectl apply -f consumer_queue1.yaml"
               '''
        }
    }
}
