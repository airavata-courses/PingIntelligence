node{
    def app
    stage("SCM Checkout"){
        checkout scm
    }
    stage('Build Docker Image'){    		
        sh  '''
                app = docker.build("pingintelligence/ui-image")
            '''    
    }
   
    stage('Push Docker Image'){
       sh '''
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {            
        '''
    }   
}
