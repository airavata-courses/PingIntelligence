node{
    stage("SCM Checkout"){
        git branch: 'dockerized_ui', credentialsId: 'git-creds', url: 'git@github.com:airavata-courses/PingIntelligence.git'
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
            sudo docker login --username=$docker_hub_user --password=$docker_hub_pwd &&
            sudo apt-get upgrade -y &&
            sudo docker push pingintelligence/ui-image
        '''
}

	/*
stage('SSH to Kubernetes master') {
            sh '''
                chmod 400 brogrammers.pem
                ssh -o StrictHostKeyChecking=no -i brogrammers.pem ubuntu@149.165.170.140  uptime
                ssh -i brogrammers.pem ubuntu@149.165.170.140  " rm -rf Brogrammers &&
                git clone https://github.com/airavata-courses/Brogrammers.git &&
                cd Brogrammers &&
                git pull &&
                git checkout Kubernetes &&
                cd front_End &&
                kubectl delete service frontend &&
                kubectl delete deployment frontend &&
                sudo kubectl apply -f config.yaml"
            '''    
        }
	*/
   
}
