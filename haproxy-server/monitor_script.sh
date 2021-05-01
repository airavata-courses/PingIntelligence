#!/bin/sh

export blue="IU"
export green="TACC"

while true;do
        if [[ $blue == "IU" ]]; then
                echo "IU -> TACC deployment"
                chmod 400 ./id_rsa_iu
                echo '1'
                ssh -i ./id_rsa_iu ubuntu@149.165.156.145 "sudo su --command 'bash iu_to_haproxy.sh;
                echo '2'
                if [ -e ./istio_status.txt ] && [[ $( cat istio_status.txt |  wc -w ) > 0 ]]; then
                        cd ../;
                        bash db_push_iu.sh;
                        fi'"

        else
                echo "TACC -> IU deployment"
                chmod 400 ./id_rsa_tacc
                ssh -i ./id_rsa_tacc ubuntu@129.114.16.125 "sudo su --command 'bash tacc_to_haproxy.sh;
                if [ -e ./istio_status.txt ] && [[ $( cat istio_status.txt |  wc -w ) > 0 ]]; then
                        cd ../;
                        bash db_push_tacc.sh;
                        fi'"
        fi
        echo 'Outside main if';

        #Flipping IU & TACC (Blue - Green)
        if [ -e ./istio_status.txt ] && [[ $( cat istio_status.txt |  wc -w ) > 0 ]]; then
                if [[ $blue == "IU" ]]; then
                        export blue="TACC"
                        export green="IU"
                        sed -i 's/iu 149.165.156.145:80/tacc 129.114.16.125:80/' /etc/haproxy/haproxy.cfg
                else
                        export blue="IU"
                        export green="TACC"
                        sed -i 's/tacc 129.114.16.125:80/iu 149.165.156.145:80/' /etc/haproxy/haproxy.cfg
                fi
                sudo systemctl restart haproxy.service
                rm -rf istio_status.txt
        fi

        #Run script at specified intervals (seconds)
        sleep 3;
done
