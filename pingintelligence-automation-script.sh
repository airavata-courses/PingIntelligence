cd .. &&
sudo apt-get update &&
pip3 install python-openstackclient &&
#curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add - &&
#sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main" &&
#sudo apt-get update && sudo apt-get install terraform &&
wget https://releases.hashicorp.com/terraform/0.14.4/terraform_0.14.4_linux_amd64.zip &&
unzip terraform_0.14.4_linux_amd64.zip &&
sudo chmod +x terraform &&
sudo mv terraform /usr/bin &&
rm -rf terraform_0.14.4_linux_386.zip &&
cd PingIntelligence/ &&
export CLUSTER=kubejetstream &&
mv ./cluster.tfvars jetstream_kubespray/inventory/kubejetstream/ &&
mv ./k8s-cluster.yml jetstream_kubespray/inventory/kubejetstream/group_vars/k8s-cluster &&
cd jetstream_kubespray/inventory/kubejetstream &&
bash terraform_init.sh &&
bash terraform_apply.sh &&
#export IP=149.165.156.145 &&
export IP=129.114.16.139 &&
cd ../../ &&
sudo apt update &&
sudo apt install python3-pip &&
pip3 --version &&
pip3 install -r requirements.txt &&
eval $(ssh-agent -s) &&
ssh-add ~/.ssh/id_rsa &&
cp inventory/kubejetstream/hosts inventory/ &&
sleep 60 &&
ansible -i inventory/kubejetstream/hosts -m ping all &&
sleep 300 &&
bash k8s_install.sh &&
ssh -o StrictHostKeyChecking=no ubuntu@$IP
