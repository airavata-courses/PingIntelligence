node {
    def app
    stage("SCM Checkout"){
        checkout scm
    }
    
    stage('Initialize Docker Setup'){
        def dockerHome = tool 'docker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
    
    /*
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
    */
    
    stage('Cleaning up Disk Space') {
        sh "docker system prune -af --volumes"
    } 
}
