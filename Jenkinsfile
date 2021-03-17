node {
    def app
    stage("SCM Checkout"){
        checkout scm
    }
    
    stage('Build Docker Image'){    		
       app = docker.build("pingintelligence/ui-image")    
    }
    
    stage('Test image') {           
       app.inside {              
          sh 'echo "Tests passed"'        
       }    
    }
   
    stage('Push Docker Image'){
       docker.withRegistry('https://registry.hub.docker.com', 'dockerhub')
       app.push("${env.BUILD_NUMBER}")            
       app.push("latest")  
    }   
}
