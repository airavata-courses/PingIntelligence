node{
    stage("SCM Checkout"){
        git branch: 'dockerized_ui', credentialsId: 'git-creds', url: 'https://github.com/airavata-courses/PingIntelligence/'
    }
    stage('Build Docker Image'){    		
        sh  '''
                apt-get update -y
                apt-get install docker-engine -y
                systemctl start docker
                systemctl enable docker 
           
                docker build -f Dockerfile -t pingintelligence/ui-image .
            '''    
    }
   
    stage('Push Docker Image'){
       sh '''
            docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD &&
            apt-get upgrade -y &&
            docker push pingintelligence/ui-image
        '''
    }   
}
