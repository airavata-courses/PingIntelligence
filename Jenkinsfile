node{
    stage("SCM Checkout"){
        git branch: 'dockerized_ui', credentialsId: 'git-creds', url: 'https://github.com/airavata-courses/PingIntelligence/'
    }
    stage('Build Docker Image'){    		
        sh  '''
                sudo apt --assume-yes install docker.io
                sudo systemctl start docker
                sudo systemctl enable docker 
           
                sudo docker build -f Dockerfile -t pingintelligence/ui-image .
            '''    
    }
   
    stage('Push Docker Image'){
       sh '''
            sudo docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD &&
            sudo apt-get upgrade -y &&
            sudo docker push pingintelligence/ui-image
        '''
    }   
}
